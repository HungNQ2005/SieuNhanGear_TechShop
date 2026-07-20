import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Sidebar";
import AdminTopBar from "../../AdminTopBar";
import AttributeGroupCard from "./components/AttributeGroupCard";
import GlobalAttributeExplorer from "./components/GlobalAttributeExplorer";
import AddAttributeGroupModal from "./components/AddAttributeGroupModal";

import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  getAttributeGroups,
  getAttributes,
  createAttributeGroup,
} from "../../../../../services/api";
import {
  TEXT_SPEC_PAGE_TITLE,
  TEXT_SPEC_PAGE_SUBTITLE,
  TEXT_SPEC_ADD_GROUP_BUTTON,
  TEXT_SPEC_TOPBAR_SEARCH,
  TEXT_SPEC_LOADING,
} from "../../../../../constants/i18nKeys";
import { IconPlusCircle } from "../../../../../constants/icons";
import styles from "./Specifications.styles";

const PAGE_SIZE = 4;

// Fallback demo data — used only if the backend (json-server) has no seeded
// `attributeGroups` / `attributes` resources yet, so the page still renders
// a working preview out of the box.
const FALLBACK_GROUPS = [
  {
    id: 1,
    name: "Peripheral Specs",
    description: "Mice, Keyboards, Controllers",
    icon: "mouse",
    productsCount: 124,
  },
  {
    id: 2,
    name: "Display Specs",
    description: "Monitors, Laptops, Panels",
    icon: "monitor",
    productsCount: 82,
  },
  {
    id: 3,
    name: "Audio Specs",
    description: "Headphones, DACs, Speakers",
    icon: "headphone",
    productsCount: 56,
  },
];

const FALLBACK_ATTRIBUTES = [
  { id: 1, name: "Connectivity", groupId: 1, dataType: "SELECT", usageCount: 1240, status: "active" },
  { id: 2, name: "Sensor Type", groupId: 1, dataType: "SELECT", usageCount: 980, status: "active" },
  { id: 3, name: "DPI Range", groupId: 1, dataType: "NUMBER", usageCount: 760, status: "active" },
  { id: 4, name: "Polling Rate", groupId: 1, dataType: "NUMBER", usageCount: 540, status: "active" },
  { id: 5, name: "Switch Type", groupId: 1, dataType: "SELECT", usageCount: 410, status: "active" },
  { id: 6, name: "Resolution", groupId: 2, dataType: "SELECT", usageCount: 900, status: "active" },
  { id: 7, name: "Refresh Rate", groupId: 2, dataType: "NUMBER", usageCount: 842, status: "active" },
  { id: 8, name: "Panel Type", groupId: 2, dataType: "SELECT", usageCount: 700, status: "active" },
  { id: 9, name: "HDR Support", groupId: 2, dataType: "BOOLEAN", usageCount: 248, status: "pending" },
  { id: 10, name: "Frequency Response", groupId: 3, dataType: "TEXT", usageCount: 512, status: "active" },
  { id: 11, name: "Driver Size", groupId: 3, dataType: "NUMBER", usageCount: 430, status: "active" },
  { id: 12, name: "Impedance", groupId: 3, dataType: "NUMBER", usageCount: 300, status: "active" },
];

export default function SpecificationsScreen() {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [groupsRes, attributesRes] = await Promise.all([
        getAttributeGroups(),
        getAttributes(),
      ]);
      const loadedGroups =
        groupsRes.data && groupsRes.data.length ? groupsRes.data : FALLBACK_GROUPS;
      const loadedAttributes =
        attributesRes.data && attributesRes.data.length
          ? attributesRes.data
          : FALLBACK_ATTRIBUTES;
      setGroups(loadedGroups);
      setAttributes(loadedAttributes);
    } catch (err) {
      console.log("Failed to load specification templates, using demo data", err);
      setGroups(FALLBACK_GROUPS);
      setAttributes(FALLBACK_ATTRIBUTES);
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

  // ─── Join attributes with their group + preview chips per group ──────────
  const groupMap = useMemo(() => new Map(groups.map((g) => [g.id, g])), [groups]);

  const joinedAttributes = useMemo(
    () =>
      attributes.map((a) => ({
        ...a,
        groupName: groupMap.get(a.groupId)?.name,
      })),
    [attributes, groupMap]
  );

  const groupsWithPreview = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        attributes: attributes
          .filter((a) => a.groupId === g.id)
          .map((a) => a.name),
      })),
    [groups, attributes]
  );

  // ─── Filters + pagination for the Global Attribute Explorer ──────────────
  const filteredAttributes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return joinedAttributes.filter((a) => {
      if (q && !a.name.toLowerCase().includes(q)) return false;
      if (groupFilter !== "all" && a.groupId !== groupFilter) return false;
      return true;
    });
  }, [joinedAttributes, search, groupFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, groupFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAttributes.length / PAGE_SIZE));
  const pagedAttributes = filteredAttributes.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleCreateGroup = async (payload) => {
    setSaving(true);
    try {
      const res = await createAttributeGroup({ ...payload, productsCount: 0 });
      const newGroup = res.data?.id
        ? res.data
        : { id: Date.now(), ...payload, productsCount: 0 };
      setGroups((prev) => [...prev, newGroup]);
      setModalVisible(false);
    } catch (err) {
      console.log("Failed to create attribute group", err);
      // Still reflect the new group locally so the demo stays usable offline.
      setGroups((prev) => [
        ...prev,
        { id: Date.now(), ...payload, productsCount: 0 },
      ]);
      setModalVisible(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.root}>
      <Sidebar selected="products" />

      <View style={styles.main}>
        <AdminTopBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={t(TEXT_SPEC_TOPBAR_SEARCH)}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.pageTitle}>{t(TEXT_SPEC_PAGE_TITLE)}</Text>
              <Text style={styles.pageSubtitle}>{t(TEXT_SPEC_PAGE_SUBTITLE)}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <IconPlusCircle />
              <Text style={styles.addButtonText}>{t(TEXT_SPEC_ADD_GROUP_BUTTON)}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={{ color: "#9CA3AF", padding: 24 }}>
              {t(TEXT_SPEC_LOADING)}
            </Text>
          ) : (
            <>
              <View style={styles.cardsRow}>
                {groupsWithPreview.map((group) => (
                  <AttributeGroupCard key={group.id} group={group} />
                ))}
              </View>

              <GlobalAttributeExplorer
                attributes={pagedAttributes}
                totalCount={filteredAttributes.length}
                groups={groups}
                groupFilter={groupFilter}
                onGroupFilterChange={setGroupFilter}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                from={(page - 1) * PAGE_SIZE + 1}
                to={Math.min(page * PAGE_SIZE, filteredAttributes.length)}
              />
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <AddAttributeGroupModal
        visible={modalVisible}
        saving={saving}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateGroup}
      />
    </View>
  );
}
