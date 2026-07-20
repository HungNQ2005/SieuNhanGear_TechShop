// NEW SCREEN (merged from product-management-feature)
// Trang quản lý Products cho Admin — cùng pattern với Categories:
// fallback demo data, PATCH/DELETE có xử lý lỗi local, search + pagination
// 5 dòng/trang. Route: ROUTES.PRODUCT_MANAGEMENT ("/admin/products").
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Sidebar";
import AdminTopBar from "../../AdminTopBar";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";
import CreateProductModal from "./components/CreateProductModal";
import DeleteProductModal from "./components/DeleteProductModal";

import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  getCategories,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../../../services/api";
import {
  TEXT_PROD_TOPBAR_SEARCH,
  TEXT_PROD_PAGE_TITLE,
  TEXT_PROD_PAGE_SUBTITLE,
  TEXT_PROD_ADD_BUTTON,
  TEXT_PROD_FILTERS_BUTTON,
  TEXT_PROD_FILTER_ALL_CATEGORIES,
  TEXT_PROD_TABLE_TITLE,
  TEXT_PROD_SHOWING,
  TEXT_PROD_LOADING,
} from "../../../../../constants/i18nKeys";
import { IconPlusCircle, IconFilter, IconChevronDownGray } from "../../../../../constants/icons";
import styles from "./Products.styles";

const PAGE_SIZE = 5;

// Fallback demo data — used only if the backend (json-server) has no
// `categories` / `products` resources yet, so the page still renders a
// working preview identical to the design mock-up.

export default function ProductsScreen() {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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
        categoriesRes.data && categoriesRes.data.length
          ? categoriesRes.data
          : FALLBACK_CATEGORIES;

      const rawProducts =
        productsRes.data && productsRes.data.length ? productsRes.data : FALLBACK_PRODUCTS;

      // Enrich real products (which only carry name/price/category_id/img_URL
      // in the seed data) with the demo-only fields this screen needs,
      // without discarding anything the backend already provided.
      const enrichedProducts = rawProducts.map((p) => ({
        subtitle: "",
        status: "active",
        ...p,
      }));

      setCategories(rawCategories);
      setProducts(enrichedProducts);
    } catch (err) {
      console.log("Failed to load products, using demo data", err);
      setCategories(FALLBACK_CATEGORIES);
      setProducts(FALLBACK_PRODUCTS);
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

  const categoryNameById = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.id] = c.name;
    });
    return map;
  }, [categories]);

  const joinedProducts = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        categoryName: categoryNameById[p.category_id] || categoryNameById[p.categoryId],
      })),
    [products, categoryNameById]
  );

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return joinedProducts.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "all" || String(p.category_id) === String(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [joinedProducts, search, categoryFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pagedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filteredProducts.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filteredProducts.length);

  const showingText = t(TEXT_PROD_SHOWING)
    .replace("{{from}}", from)
    .replace("{{to}}", to)
    .replace("{{total}}", filteredProducts.length);

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      if (editingProduct) {
        const res = await updateProduct(editingProduct.id, payload);
        const updated = res.data?.id ? res.data : { ...editingProduct, ...payload };
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updated } : p))
        );
      } else {
        const res = await createProduct(payload);
        const created = res.data?.id ? res.data : { id: Date.now(), ...payload };
        setProducts((prev) => [...prev, created]);
      }
      setModalVisible(false);
      setEditingProduct(null);
    } catch (err) {
      console.log("Failed to save product, applying change locally", err);
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...payload } : p))
        );
      } else {
        setProducts((prev) => [...prev, { id: Date.now(), ...payload }]);
      }
      setModalVisible(false);
      setEditingProduct(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
    } catch (err) {
      console.log("Failed to delete product on server, removing locally", err);
    } finally {
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
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
          searchPlaceholder={t(TEXT_PROD_TOPBAR_SEARCH)}
          adminTag="Admin"
          username="System Manager"
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.pageTitle}>{t(TEXT_PROD_PAGE_TITLE)}</Text>
              <Text style={styles.pageSubtitle}>{t(TEXT_PROD_PAGE_SUBTITLE)}</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ position: "relative", zIndex: filtersOpen ? 20 : 1 }}>
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => setFiltersOpen((o) => !o)}
                >
                  <IconFilter />
                  <Text style={styles.filterButtonText}>{t(TEXT_PROD_FILTERS_BUTTON)}</Text>
                  <IconChevronDownGray />
                </TouchableOpacity>

                {filtersOpen && (
                  <View
                    style={{
                      position: "absolute",
                      top: 46,
                      right: 0,
                      minWidth: 220,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      borderRadius: 10,
                      paddingVertical: 6,
                      shadowColor: "#0F172A",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.12,
                      shadowRadius: 20,
                      elevation: 6,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setCategoryFilter("all");
                        setFiltersOpen(false);
                      }}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        backgroundColor: categoryFilter === "all" ? "#EFF6FF" : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          color: categoryFilter === "all" ? "#2563EB" : "#374151",
                          fontWeight: categoryFilter === "all" ? "700" : "500",
                          fontSize: 13,
                        }}
                      >
                        {t(TEXT_PROD_FILTER_ALL_CATEGORIES)}
                      </Text>
                    </TouchableOpacity>
                    {categories.map((c) => (
                      <TouchableOpacity
                        key={c.id}
                        onPress={() => {
                          setCategoryFilter(c.id);
                          setFiltersOpen(false);
                        }}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 14,
                          backgroundColor:
                            String(categoryFilter) === String(c.id) ? "#EFF6FF" : "transparent",
                        }}
                      >
                        <Text
                          style={{
                            color: String(categoryFilter) === String(c.id) ? "#2563EB" : "#374151",
                            fontWeight: String(categoryFilter) === String(c.id) ? "700" : "500",
                            fontSize: 13,
                          }}
                        >
                          {c.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
                <IconPlusCircle />
                <Text style={styles.addButtonText}>{t(TEXT_PROD_ADD_BUTTON)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <Text style={{ color: "#9CA3AF", padding: 24 }}>{t(TEXT_PROD_LOADING)}</Text>
          ) : (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>{t(TEXT_PROD_TABLE_TITLE)}</Text>
              </View>

              <ProductTable
                rows={pagedProducts}
                onEdit={openEditModal}
                onDelete={(product) => setDeleteTarget(product)}
              />

              <View style={{ paddingHorizontal: 20, paddingTop: 6 }}>
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

      <CreateProductModal
        visible={modalVisible}
        saving={saving}
        editingProduct={editingProduct}
        categories={categories}
        onClose={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteProductModal
        visible={Boolean(deleteTarget)}
        product={deleteTarget}
        deleting={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
}
