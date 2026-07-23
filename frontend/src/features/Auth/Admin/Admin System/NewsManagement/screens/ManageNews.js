import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { styles } from "../screens/ManageNews.styles";
import NewsFormModal from "../components/NewsFormModal";
import Sidebar from "../../../Sidebar";
import { useNavigate } from "react-router-dom";
import {
  IconLiveDot,
  IconPlus,
  IconEdit,
  IconTrash,
  IconClose,
  IconSearchSmall,
  IconChevronLeft,
  IconChevronRight,
  IconStoreEmpty,
} from "../../../../../../constants/icons";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../../../../../../services/api";
import {
  TEXT_NEWS_MANAGEMENT_TITLE,
  TEXT_NEWS_MANAGEMENT_SUBTITLE,
  TEXT_NEWS_MANAGEMENT_CREATE,
  TEXT_NEWS_MANAGEMENT_LOAD_ERROR,
  TEXT_NEWS_MANAGEMENT_SEARCH,
  TEXT_NEWS_MANAGEMENT_ALL_STATUS,
  TEXT_NEWS_MANAGEMENT_PUBLISHED,
  TEXT_NEWS_MANAGEMENT_DRAFT,
  TEXT_NEWS_MANAGEMENT_HIDDEN,
  TEXT_NEWS_MANAGEMENT_EMPTY,
  TEXT_NEWS_MANAGEMENT_COL_TITLE,
  TEXT_NEWS_MANAGEMENT_COL_AUTHOR,
  TEXT_NEWS_MANAGEMENT_COL_STATUS,
  TEXT_NEWS_MANAGEMENT_COL_ACTION,
  TEXT_NEWS_MANAGEMENT_SHOWING,
  TEXT_NEWS_MANAGEMENT_DELETE_TITLE,
  TEXT_NEWS_MANAGEMENT_DELETE_CONFIRM,
  TEXT_NEWS_MANAGEMENT_DELETE,
  TEXT_NEWS_MANAGEMENT_DELETING,
  TEXT_NEWS_MANAGEMENT_CANCEL,
  TEXT_NEWS_CREATE_SUCCESS,
  TEXT_NEWS_UPDATE_SUCCESS,
  TEXT_NEWS_MANAGEMENT_DELETE_SUCCESS,
  TEXT_NEWS_MANAGEMENT_DELETE_FAILED,
  TEXT_NEWS_MANAGEMENT_UNKNOWN_ERROR,
} from "../../../../../../constants/i18nKeys";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";

const STATUS_MAP = {
  published: {
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  draft: {
    color: "#64748B",
    bg: "#F1F5F9",
  },
  hidden: {
    color: "#DC2626",
    bg: "#FEE2E2",
  },
};

export default function ManageNews() {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const [page, setPage] = useState(1);

  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2800);
  };
  const PAGE_SIZE = 6;

  // ─── Load data ───────────────────────────────────────────
  const loadData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await getNews();
      setNews(res.data?.data || res.data || []);
    } catch (err) {
      setErrorMsg(t(TEXT_NEWS_MANAGEMENT_LOAD_ERROR));
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ─── Filter & Paginate ───────────────────────────────────
  const filteredList = news.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q || String(item.title || "").toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  if (page > totalPages) setPage(totalPages);
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageData = filteredList.slice(startIndex, startIndex + PAGE_SIZE);

  // ─── Handlers ───────────────────────────────────────────
  const handleOpenCreate = () => {
    setFormMode("create");
    setEditingItem(null);
    setFormVisible(true);
  };

  const handleOpenEdit = (item) => {
    setFormMode("edit");
    setEditingItem(item);
    setFormVisible(true);
  };

  const handleSubmitForm = async (payload) => {
    setSubmitting(true);
    try {
      if (formMode === "create") {
        await createNews(payload);
        showToast("success", t(TEXT_NEWS_CREATE_SUCCESS));
      } else {
        await updateNews(editingItem._id, payload);
        showToast("success", t(TEXT_NEWS_UPDATE_SUCCESS));
      }
      setFormVisible(false);
      loadData();
    } catch (err) {
      const msg = err.response?.data?.message || t(TEXT_NEWS_MANAGEMENT_UNKNOWN_ERROR);
      showToast("error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteNews(deleteTarget._id);
      showToast("success", t(TEXT_NEWS_MANAGEMENT_DELETE_SUCCESS));
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      showToast("error", t(TEXT_NEWS_MANAGEMENT_DELETE_FAILED));
    } finally {
      setDeleting(false);
    }
  };

  const renderStatusLabel = (status) => {
    switch (status) {
      case "published": return t(TEXT_NEWS_MANAGEMENT_PUBLISHED);
      case "draft": return t(TEXT_NEWS_MANAGEMENT_DRAFT);
      case "hidden": return t(TEXT_NEWS_MANAGEMENT_HIDDEN);
      default: return status;
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{t(TEXT_NEWS_MANAGEMENT_TITLE)}</Text>
          <Text style={styles.subtitle}>{t(TEXT_NEWS_MANAGEMENT_SUBTITLE)}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={handleOpenCreate}>
          <IconPlus color="#fff" size={18} />
          <Text style={styles.addButtonText}>
            {t(TEXT_NEWS_MANAGEMENT_CREATE)}
          </Text>
        </Pressable>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <IconSearchSmall color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder={t(TEXT_NEWS_MANAGEMENT_SEARCH)}
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
        </View>
        <View style={{ position: "relative", zIndex: 9999 }}>
          <Pressable
            style={styles.selectBox}
            onPress={() => setStatusMenuOpen(!statusMenuOpen)}
          >
            <Text style={styles.selectText}>
              {statusFilter === "all"
                ? t(TEXT_NEWS_MANAGEMENT_ALL_STATUS)
                : renderStatusLabel(statusFilter)}
            </Text>
            <IconChevronDown color="#9CA3AF" />
          </Pressable>
          {statusMenuOpen && (
            <View style={[styles.dropdownMenu, { width: 180, right: 0 }]}>
              {["all", "published", "draft", "hidden"].map((r) => (
                <Pressable
                  key={r}
                  style={[
                    styles.dropdownItem,
                    statusFilter === r && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setStatusFilter(r);
                    setStatusMenuOpen(false);
                    setPage(1);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      statusFilter === r && {
                        color: "#2563EB",
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {r === "all"
                      ? t(TEXT_NEWS_MANAGEMENT_ALL_STATUS)
                      : renderStatusLabel(r)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={[styles.directoryCard, { zIndex: 1 }]}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, { flex: 2 }]}>
            {t(TEXT_NEWS_MANAGEMENT_COL_TITLE)}
          </Text>
          <Text style={[styles.th, { flex: 1 }]}>
            {t(TEXT_NEWS_MANAGEMENT_COL_AUTHOR)}
          </Text>
          <Text style={[styles.th, { flex: 1, textAlign: "center" }]}>
            {t(TEXT_NEWS_MANAGEMENT_COL_STATUS)}
          </Text>
          <Text style={[styles.th, { width: 100, textAlign: "right" }]}>
            {t(TEXT_NEWS_MANAGEMENT_COL_ACTION)}
          </Text>
        </View>

        {loading ? (
          <View style={styles.emptyState}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : errorMsg ? (
          <View style={styles.emptyState}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : pageData.length === 0 ? (
          <View style={styles.emptyState}>
            <IconStoreEmpty color="#D1D5DB" size={48} />
            <Text style={styles.emptyText}>
              {t(TEXT_NEWS_MANAGEMENT_EMPTY)}
            </Text>
          </View>
        ) : (
          <View style={styles.tableBody}>
            {pageData.map((item, index) => {
              const styleConf = STATUS_MAP[item.status] || STATUS_MAP.published;
              const isLast = index === pageData.length - 1;

              return (
                <View
                  key={item._id || item.id || index.toString()}
                  style={[styles.tr, isLast && { borderBottomWidth: 0 }]}
                >
                  {/* Title */}
                  <View style={[styles.td, { flex: 2, flexDirection: "row", alignItems: "center" }]}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{(item.title || "?").charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={styles.nameBlock}>
                      <Text style={styles.nameText} numberOfLines={1}>{item.title}</Text>
                    </View>
                  </View>

                  {/* Author */}
                  <View style={[styles.td, { flex: 1, justifyContent: "center" }]}>
                    <Text style={styles.secondaryText}>{item.author?.name || "System"}</Text>
                  </View>

                  {/* Status */}
                  <View style={[styles.td, { flex: 1, alignItems: "center", justifyContent: "center" }]}>
                    <View style={[styles.roleBadge, { backgroundColor: styleConf.bg }]}>
                      <IconLiveDot color={styleConf.color} size={6} />
                      <Text style={[styles.roleText, { color: styleConf.color }]}>
                        {renderStatusLabel(item.status || "published")}
                      </Text>
                    </View>
                  </View>

                  {/* Actions */}
                  <View style={[styles.td, { width: 100, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }]}>
                    <Pressable
                      style={styles.actionBtn}
                      onPress={() => handleOpenEdit(item)}
                    >
                      <IconEdit color="#4B5563" />
                    </Pressable>
                    <Pressable
                      style={[styles.actionBtn, styles.actionBtnDanger]}
                      onPress={() => setDeleteTarget(item)}
                    >
                      <IconTrash color="#DC2626" />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Pagination */}
      {!loading && !errorMsg && totalItems > 0 && (
        <View style={styles.pagination}>
          <Text style={styles.pageInfo}>
            {t(TEXT_NEWS_MANAGEMENT_SHOWING)}{" "}
            <Text style={{ fontWeight: "600", color: "#111827" }}>
              {startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, totalItems)}
            </Text>{" "}
            / {totalItems}
          </Text>
          <View style={styles.pageControls}>
            <Pressable
              style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}
              onPress={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <IconChevronLeft color={page === 1 ? "#9CA3AF" : "#4B5563"} />
            </Pressable>
            <Pressable
              style={[
                styles.pageBtn,
                page === totalPages && styles.pageBtnDisabled,
              ]}
              onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <IconChevronRight
                color={page === totalPages ? "#9CA3AF" : "#4B5563"}
              />
            </Pressable>
          </View>
        </View>
      )}

      {/* Modals */}
      <NewsFormModal
        visible={formVisible}
        mode={formMode}
        initialValue={editingItem}
        submitting={submitting}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSubmitForm}
      />

      {/* Delete Confirmation */}
      <Modal
        visible={!!deleteTarget}
        transparent
        animationType="fade"
        onRequestClose={() => !deleting && setDeleteTarget(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteCard}>
            <View style={styles.deleteIconWrap}>
              <IconTrash color="#DC2626" size={24} />
            </View>
            <Text style={styles.deleteTitle}>
              {t(TEXT_NEWS_MANAGEMENT_DELETE_TITLE)}
            </Text>
            <Text style={styles.deleteDesc}>
              {t(TEXT_NEWS_MANAGEMENT_DELETE_CONFIRM)}
            </Text>
            <View style={styles.deleteActions}>
              <Pressable
                style={styles.deleteCancel}
                onPress={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                <Text style={styles.deleteCancelText}>
                  {t(TEXT_NEWS_MANAGEMENT_CANCEL)}
                </Text>
              </Pressable>
              <Pressable
                style={styles.deleteConfirm}
                onPress={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.deleteConfirmText}>
                    {t(TEXT_NEWS_MANAGEMENT_DELETE)}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast */}
      {toast && (
        <View style={styles.toastContainer}>
          <View
            style={[
              styles.toast,
              toast.type === "error" && styles.toastError,
            ]}
          >
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const IconChevronDown = ({ color = "#6B7280" }) => (
  <View>
    <Text style={{ color }}>▼</Text>
  </View>
);
