import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Sidebar";
import AdminTopBar from "../../AdminTopBar";
import AttributeGroupCard from "./components/AttributeGroupCard";
import GlobalAttributeExplorer from "./components/GlobalAttributeExplorer";
import AddAttributeGroupModal from "./components/AddAttributeGroupModal";
import AddAttributeModal from "./components/AddAttributeModal";

import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  getAttributeGroups,
  getAttributes,
  createAttributeGroup,
  updateAttributeGroup,
  deleteAttributeGroup,
  createAttribute,
  updateAttribute,
  deleteAttribute,
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

  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  const [attrModalVisible, setAttrModalVisible] = useState(false);
  const [editingAttr, setEditingAttr] = useState(null);

  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [groupsRes, attributesRes] = await Promise.all([
        getAttributeGroups(),
        getAttributes(),
      ]);
      const gData = Array.isArray(groupsRes.data) ? groupsRes.data : [];
      const aData = Array.isArray(attributesRes.data) ? attributesRes.data : [];

      if (gData.length > 0 || aData.length > 0) {
        setGroups(gData);
        setAttributes(aData);
      } else {
        setGroups(FALLBACK_GROUPS);
        setAttributes(FALLBACK_ATTRIBUTES);
      }
    } catch (err) {
      console.log("Failed to load specification templates, using fallback", err);
      setGroups(FALLBACK_GROUPS);
      setAttributes(FALLBACK_ATTRIBUTES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "product_manager" && user.role !== "system_admin" && user.role !== "admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [loadData, navigate]);

  const groupMap = useMemo(() => new Map(groups.map((g) => [Number(g.id), g])), [groups]);

  const joinedAttributes = useMemo(
    () =>
      attributes.map((a) => ({
        ...a,
        groupName: groupMap.get(Number(a.groupId))?.name || "Chưa phân nhóm",
      })),
    [attributes, groupMap]
  );

  const groupsWithPreview = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        attributes: attributes
          .filter((a) => Number(a.groupId) === Number(g.id))
          .map((a) => a.name),
      })),
    [groups, attributes]
  );

  const filteredAttributes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return joinedAttributes.filter((a) => {
      if (q && !a.name.toLowerCase().includes(q)) return false;
      if (groupFilter !== "all" && String(a.groupId) !== String(groupFilter)) return false;
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

  // CRUD cho Nhóm thuộc tính
  const handleCreateGroup = async (payload) => {
    setSaving(true);
    try {
      const res = await createAttributeGroup({ ...payload, productsCount: 0 });
      const newGroup = res.data?.id ? res.data : res.data;
      if (newGroup) {
        setGroups((prev) => [...prev, newGroup]);
      } else {
        await loadData();
      }
      setGroupModalVisible(false);
      setEditingGroup(null);
    } catch (err) {
      console.error("Failed to create attribute group", err);
      alert("Không thể lưu nhóm thuộc tính vào cơ sở dữ liệu. Vui lòng kiểm tra kết nối backend.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateGroup = async (id, payload) => {
    setSaving(true);
    try {
      const res = await updateAttributeGroup(id, payload);
      const updated = res.data?.id ? res.data : { id, ...payload };
      setGroups((prev) => prev.map((g) => (Number(g.id) === Number(id) ? { ...g, ...updated } : g)));
      setGroupModalVisible(false);
      setEditingGroup(null);
    } catch (err) {
      console.error("Failed to update attribute group", err);
      alert("Không thể cập nhật nhóm thuộc tính. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGroup = async (group) => {
    try {
      await deleteAttributeGroup(group.id);
      setGroups((prev) => prev.filter((g) => Number(g.id) !== Number(group.id)));
      setAttributes((prev) => prev.filter((a) => Number(a.groupId) !== Number(group.id)));
    } catch (err) {
      console.error("Failed to delete attribute group on server", err);
      alert("Không thể xóa nhóm thuộc tính. Vui lòng thử lại.");
    }
  };

  // CRUD cho Thuộc tính
  const handleSaveAttribute = async (payload) => {
    setSaving(true);
    const normalizedPayload = {
      ...payload,
      dataType: payload.dataType?.toLowerCase() || "text",
    };
    try {
      if (editingAttr) {
        const res = await updateAttribute(editingAttr.id, normalizedPayload);
        const updated = res.data?.id ? res.data : { ...editingAttr, ...normalizedPayload };
        setAttributes((prev) =>
          prev.map((a) => (Number(a.id) === Number(editingAttr.id) ? { ...a, ...updated } : a))
        );
      } else {
        const res = await createAttribute(normalizedPayload);
        const created = res.data?.id ? res.data : res.data;
        if (created) {
          setAttributes((prev) => [...prev, created]);
        } else {
          await loadData();
        }
      }
      setAttrModalVisible(false);
      setEditingAttr(null);
    } catch (err) {
      console.error("Failed to save attribute", err);
      alert("Không thể lưu thuộc tính vào cơ sở dữ liệu. Vui lòng kiểm tra kết nối backend.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAttribute = async (attr) => {
    try {
      await deleteAttribute(attr.id);
      setAttributes((prev) => prev.filter((a) => Number(a.id) !== Number(attr.id)));
      setAttrModalVisible(false);
      setEditingAttr(null);
    } catch (err) {
      console.error("Failed to delete attribute on server", err);
      alert("Không thể xóa thuộc tính. Vui lòng thử lại.");
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

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: "#0F172A" }]}
                onPress={() => {
                  setEditingAttr(null);
                  setAttrModalVisible(true);
                }}
              >
                <IconPlusCircle />
                <Text style={styles.addButtonText}>Thêm thuộc tính</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setEditingGroup(null);
                  setGroupModalVisible(true);
                }}
              >
                <IconPlusCircle />
                <Text style={styles.addButtonText}>{t(TEXT_SPEC_ADD_GROUP_BUTTON)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <Text style={{ color: "#9CA3AF", padding: 24 }}>
              {t(TEXT_SPEC_LOADING)}
            </Text>
          ) : (
            <>
              <View style={styles.cardsRow}>
                {groupsWithPreview.map((group) => (
                  <AttributeGroupCard
                    key={group.id}
                    group={group}
                    onEditTemplate={(g) => {
                      setEditingGroup(g);
                      setGroupModalVisible(true);
                    }}
                    onDelete={handleDeleteGroup}
                  />
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
                onEditAttribute={(attr) => {
                  setEditingAttr(attr);
                  setAttrModalVisible(true);
                }}
              />
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <AddAttributeGroupModal
        visible={groupModalVisible}
        editingGroup={editingGroup}
        saving={saving}
        onClose={() => {
          setGroupModalVisible(false);
          setEditingGroup(null);
        }}
        onCreate={handleCreateGroup}
        onUpdate={handleUpdateGroup}
      />

      <AddAttributeModal
        visible={attrModalVisible}
        editingAttribute={editingAttr}
        groups={groups}
        saving={saving}
        onClose={() => {
          setAttrModalVisible(false);
          setEditingAttr(null);
        }}
        onSubmit={handleSaveAttribute}
        onDelete={handleDeleteAttribute}
      />
    </View>
  );
}
