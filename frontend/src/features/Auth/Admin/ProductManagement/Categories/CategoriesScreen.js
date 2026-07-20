import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Sidebar";
import AdminTopBar from "../../AdminTopBar";
import CategoryTable from "./components/CategoryTable";
import Pagination from "./components/Pagination";
import CreateCategoryModal from "./components/CreateCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";

import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  getCategories,
  getProducts,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../../../services/api";
import {
  TEXT_CAT_TOPBAR_SEARCH,
  TEXT_CAT_PAGE_TITLE,
  TEXT_CAT_PAGE_SUBTITLE,
  TEXT_CAT_ADD_BUTTON,
  TEXT_CAT_TABLE_TITLE,
  TEXT_CAT_SHOWING,
  TEXT_CAT_LOADING,
} from "../../../../../constants/i18nKeys";
import { IconPlusCircle } from "../../../../../constants/icons";
import styles from "./Categories.styles";

const PAGE_SIZE = 5;

const CATEGORY_ICON_CYCLE = ["keyboard", "mouse", "monitor", "headphone", "computer"];

// Fallback demo data — used only if the backend (json-server) has no
// `categories` resource yet, so the page still renders a working preview.
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Keyboards", icon: "keyboard", subCategoriesCount: 12, status: "active" },
  { id: 2, name: "Mice", icon: "mouse", subCategoriesCount: 8, status: "active" },
  { id: 3, name: "Displays", icon: "monitor", subCategoriesCount: 5, status: "hidden" },
  { id: 4, name: "Audio", icon: "headphone", subCategoriesCount: 15, status: "active" },
  { id: 5, name: "Computers", icon: "computer", subCategoriesCount: 4, status: "active" },
];

export default function CategoriesScreen() {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      const rawCategories =
        categoriesRes.data && categoriesRes.data.length ? categoriesRes.data : FALLBACK_CATEGORIES;

      // Enrich real categories (which only carry id/name in the seed data)
      // with the demo-only fields this screen needs, without discarding
      // anything the backend already provided.
      const enrichedCategories = rawCategories.map((cat, idx) => ({
        icon: CATEGORY_ICON_CYCLE[idx % CATEGORY_ICON_CYCLE.length],
        subCategoriesCount: 0,
        status: "active",
        ...cat,
      }));

      const counts = {};
      (productsRes.data || []).forEach((p) => {
        const catId = p.category_id ?? p.categoryId;
        if (catId == null) return;
        counts[catId] = (counts[catId] || 0) + 1;
      });

      setCategories(enrichedCategories);
      setProductCounts(counts);
    } catch (err) {
      console.log("Failed to load categories, using demo data", err);
      setCategories(FALLBACK_CATEGORIES);
      setProductCounts({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "product_manager" && user.role !== "system_admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [loadData, navigate]);

  const joinedCategories = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        productsCount: productCounts[c.id] || 0,
      })),
    [categories, productCounts]
  );

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return joinedCategories;
    return joinedCategories.filter((c) => c.name.toLowerCase().includes(q));
  }, [joinedCategories, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / PAGE_SIZE));
  const pagedCategories = filteredCategories.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const from = filteredCategories.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filteredCategories.length);

  const showingText = t(TEXT_CAT_SHOWING)
    .replace("{{from}}", from)
    .replace("{{to}}", to)
    .replace("{{total}}", filteredCategories.length);

  const openCreateModal = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      if (editingCategory) {
        const res = await updateCategory(editingCategory.id, payload);
        const updated = res.data?.id ? res.data : { ...editingCategory, ...payload };
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? { ...c, ...updated } : c))
        );
      } else {
        const res = await createCategory(payload);
        const created = res.data?.id ? res.data : { id: Date.now(), ...payload };
        setCategories((prev) => [...prev, created]);
      }
      setModalVisible(false);
      setEditingCategory(null);
    } catch (err) {
      console.log("Failed to save category, applying change locally", err);
      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? { ...c, ...payload } : c))
        );
      } else {
        setCategories((prev) => [...prev, { id: Date.now(), ...payload }]);
      }
      setModalVisible(false);
      setEditingCategory(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCategory(deleteTarget.id);
    } catch (err) {
      console.log("Failed to delete category on server, removing locally", err);
    } finally {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <View style={styles.root}>
      <Sidebar selected="products" />

      <View style={styles.main}>
        <AdminTopBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={t(TEXT_CAT_TOPBAR_SEARCH)}
          adminTag="Admin"
          username="System Manager"
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.pageTitle}>{t(TEXT_CAT_PAGE_TITLE)}</Text>
              <Text style={styles.pageSubtitle}>{t(TEXT_CAT_PAGE_SUBTITLE)}</Text>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
              <IconPlusCircle />
              <Text style={styles.addButtonText}>{t(TEXT_CAT_ADD_BUTTON)}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={{ color: "#9CA3AF", padding: 24 }}>
              {t(TEXT_CAT_LOADING)}
            </Text>
          ) : (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>{t(TEXT_CAT_TABLE_TITLE)}</Text>
              </View>

              <CategoryTable
                rows={pagedCategories}
                onEdit={openEditModal}
                onDelete={(category) => setDeleteTarget(category)}
              />

              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 6,
                }}
              >
                <Text style={{ fontSize: 11.5, color: "#9CA3AF", fontWeight: "600" }}>
                  {showingText}
                </Text>
              </View>

              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <CreateCategoryModal
        visible={modalVisible}
        saving={saving}
        editingCategory={editingCategory}
        onClose={() => {
          setModalVisible(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryModal
        visible={Boolean(deleteTarget)}
        category={deleteTarget}
        deleting={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
}
