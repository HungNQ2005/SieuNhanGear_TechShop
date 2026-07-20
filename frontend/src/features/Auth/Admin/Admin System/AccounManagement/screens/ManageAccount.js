import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { styles } from "../screens/ManageAccount.styles";
import AccountFormModal from "../components/AccountFormModal";
import Sidebar from "../../Slidebar";
import { useNavigate } from "react-router-dom";
import {
  IconMail,
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
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../../../../../../services/api";
import {
  TEXT_ACCOUNT_EMAIL,
  TEXT_ACCOUNT_MANAGEMENT_TITLE,
  TEXT_ACCOUNT_MANAGEMENT_SUBTITLE,
  TEXT_ACCOUNT_MANAGEMENT_CREATE,
  TEXT_ACCOUNT_MANAGEMENT_LOAD_ERROR,
  TEXT_ACCOUNT_MANAGEMENT_SEARCH,
  TEXT_ACCOUNT_MANAGEMENT_ALL_ROLE,
  TEXT_ACCOUNT_MANAGEMENT_ALL_STATUS,
  TEXT_ACCOUNT_MANAGEMENT_DIRECTORY,
  TEXT_ACCOUNT_MANAGEMENT_LIVE,
  TEXT_ACCOUNT_MANAGEMENT_EMPTY,
  TEXT_ACCOUNT_MANAGEMENT_NOT_FOUND,
  TEXT_ACCOUNT_MANAGEMENT_COL_NAME,
  TEXT_ACCOUNT_MANAGEMENT_COL_EMAIL,
  TEXT_ACCOUNT_MANAGEMENT_COL_ROLE,
  TEXT_ACCOUNT_MANAGEMENT_COL_ACTION,
  TEXT_ACCOUNT_MANAGEMENT_SHOWING,
  TEXT_ACCOUNT_MANAGEMENT_DETAIL_TITLE,
  TEXT_ACCOUNT_MANAGEMENT_CLOSE,
  TEXT_ACCOUNT_MANAGEMENT_EDIT,
  TEXT_ACCOUNT_MANAGEMENT_DELETE_TITLE,
  TEXT_ACCOUNT_MANAGEMENT_DELETE_CONFIRM,
  TEXT_ACCOUNT_MANAGEMENT_DELETE,
  TEXT_ACCOUNT_MANAGEMENT_DELETING,
  TEXT_ACCOUNT_MANAGEMENT_CANCEL,
  TEXT_ACCOUNT_MANAGEMENT_CREATE_SUCCESS,
  TEXT_ACCOUNT_MANAGEMENT_UPDATE_SUCCESS,
  TEXT_ACCOUNT_MANAGEMENT_DELETE_SUCCESS,
  TEXT_ACCOUNT_MANAGEMENT_DELETE_FAILED,
  TEXT_ACCOUNT_MANAGEMENT_UNKNOWN_ERROR,
  TEXT_ACCOUNT_MANAGEMENT_ROLE_CUSTOMER,
  TEXT_ACCOUNT_MANAGEMENT_ROLE_PRODUCT_MANAGER,
  TEXT_ACCOUNT_MANAGEMENT_ROLE_SALES_STAFF,
  TEXT_ACCOUNT_MANAGEMENT_ROLE_SYSTEM_ADMIN,
} from "../../../../../../constants/i18nKeys";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";

const ACCOUNT_ROLE_OPTIONS = [
  {
    value: "product_manager",
    label: "Product Manager",
    color: "#2563EB",
  },
  {
    value: "sales_staff",
    label: "Sales Staff",
    color: "#16A34A",
  },
  {
    value: "system_admin",
    label: "System Admin",
    color: "#DC2626",
  },
];
const ACCOUNT_ROLE_MAP = {
  customer: {
    label: TEXT_ACCOUNT_MANAGEMENT_ROLE_CUSTOMER,
    color: "#64748B",
    bg: "#F1F5F9",
  },
  user: {
    label: TEXT_ACCOUNT_MANAGEMENT_ROLE_CUSTOMER,
    color: "#64748B",
    bg: "#F1F5F9",
  },
  product_manager: {
    label: TEXT_ACCOUNT_MANAGEMENT_ROLE_PRODUCT_MANAGER,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  sales_staff: {
    label: TEXT_ACCOUNT_MANAGEMENT_ROLE_SALES_STAFF,
    color: "#16A34A",
    bg: "#DCFCE7",
  },
  system_admin: {
    label: TEXT_ACCOUNT_MANAGEMENT_ROLE_SYSTEM_ADMIN,
    color: "#DC2626",
    bg: "#FEE2E2",
  },
};

function initialsFor(name) {
  if (!name || !String(name).trim()) return "?";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function avatarColorFor(str) {
  if (!str) return "#2563EB";
  const colors = ["#2563EB", "#7C3AED", "#DB2777", "#EA580C", "#16A34A", "#0891B2"];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const FALLBACK_ACCOUNTS = [
  {
    id: 1,
    name: "System Administrator",
    email: "admin@sieunhangear.vn",
    phone: "0901234567",
    role: "system_admin",
  },
  {
    id: 2,
    name: "Product Manager",
    email: "manager@sieunhangear.vn",
    phone: "0912345678",
    role: "product_manager",
  },
  {
    id: 3,
    name: "Sales Staff",
    email: "sales@sieunhangear.vn",
    phone: "0923456789",
    role: "sales_staff",
  },
  {
    id: 4,
    name: "Nguyen Van A",
    email: "customer@gmail.com",
    phone: "0934567890",
    role: "user",
  },
];

export default function ManageAccount() {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
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

  const [detailItem, setDetailItem] = useState(null);
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
      const res = await getAccounts();

      const data = Array.isArray(res.data) && res.data.length > 0 ? res.data : FALLBACK_ACCOUNTS;

      setAccounts(data);
    } catch (err) {
      console.log("Failed to load accounts, using fallback demo data", err);
      setAccounts(FALLBACK_ACCOUNTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "system_admin") {
      navigate("/");
      return;
    }
    loadData();
  }, [navigate]);

  // ─── Filtering ────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return accounts.filter((a) => {
      if (statusFilter !== "all" && a.role !== statusFilter) return false;

      const hay = `${a.name || ""} ${a.email || ""}`.toLowerCase();

      return hay.includes(q);
    });
  }, [accounts, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const rangeStart =
    filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Danh sách nút trang kiểu "1 2 3 ... 12" để đỡ dài khi có nhiều trang
  const pageButtons = useMemo(() => {
    const items = [];
    const add = (v) => items.push(v);
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) add(i);
      return items;
    }
    add(1);
    if (currentPage > 3) add("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i += 1) add(i);
    if (currentPage < totalPages - 2) add("...");
    add(totalPages);
    return items;
  }, [totalPages, currentPage]);

  // ─── CRUD handlers ────────────────────────────────────────
  const openCreateForm = () => {
    setFormMode("create");
    setEditingItem(null);
    setFormVisible(true);
  };

  const openEditForm = (item) => {
    setFormMode("edit");
    setEditingItem(item);
    setFormVisible(true);
  };

  const handleSubmitForm = async (payload) => {
    setSubmitting(true);

    try {
      if (formMode === "edit") {
        await updateAccount(editingItem.id, payload);

        setAccounts((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, ...payload } : item,
          ),
        );

        showToast("success", t(TEXT_ACCOUNT_MANAGEMENT_UPDATE_SUCCESS));
      } else {
        const res = await createAccount(payload);

        setAccounts((prev) => [res.data, ...prev]);

        showToast("success", t(TEXT_ACCOUNT_MANAGEMENT_CREATE_SUCCESS));
      }

      setFormVisible(false);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      showToast("error", t(TEXT_ACCOUNT_MANAGEMENT_UNKNOWN_ERROR));
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (item) => setDeleteTarget(item);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteAccount(deleteTarget.id);

      setAccounts((prev) => prev.filter((item) => item.id !== deleteTarget.id));

      showToast("success", t(TEXT_ACCOUNT_MANAGEMENT_DELETE_SUCCESS));

      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      showToast("error", t(TEXT_ACCOUNT_MANAGEMENT_DELETE_FAILED));
    } finally {
      setDeleting(false);
    }
  };

  const renderRolePill = (role) => {
    const st = ACCOUNT_ROLE_MAP[role] || ACCOUNT_ROLE_MAP.customer;

    return (
      <View
        style={[
          styles.statusPill,
          {
            backgroundColor: st.bg,
          },
        ]}
      >
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: st.color,
            },
          ]}
        />
        <Text
          style={[
            styles.statusPillText,
            {
              color: st.color,
            },
          ]}
        >
          {t(st.label)}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 2 }}>
        <Sidebar />
      </View>
      <View style={{ flex: 8 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{t(TEXT_ACCOUNT_MANAGEMENT_TITLE)}</Text>
            <Text style={styles.subtitle}>
              {t(TEXT_ACCOUNT_MANAGEMENT_SUBTITLE)}
            </Text>
          </View>
          <Pressable style={styles.addButton} onPress={openCreateForm}>
            <IconPlus />
            <Text style={styles.addButtonText}>
              {t(TEXT_ACCOUNT_MANAGEMENT_CREATE)}
            </Text>
          </Pressable>
        </View>

        {errorMsg ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Toolbar */}
        <View style={styles.toolbar}>
          <View style={styles.searchBox}>
            <IconSearchSmall />
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(TEXT_ACCOUNT_MANAGEMENT_SEARCH)}
              placeholderTextColor="#94A3B8"
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13,
                color: "#0F172A",
                fontFamily: "inherit",
              }}
            />
          </View>

          <View style={{ position: "relative" }}>
            <Pressable
              style={styles.selectBox}
              onPress={() => setStatusMenuOpen((v) => !v)}
            >
              <Text style={styles.selectText}>
                {statusFilter === "all"
                  ? t(TEXT_ACCOUNT_MANAGEMENT_ALL_ROLE)
                  : ACCOUNT_ROLE_MAP[statusFilter]?.label}
              </Text>
            </Pressable>
            {statusMenuOpen && (
              <View style={dropdownStyle}>
                <Pressable
                  style={dropdownItemStyle}
                  onPress={() => {
                    setStatusFilter("all");
                    setStatusMenuOpen(false);
                  }}
                >
                  <Text style={styles.selectText}>
                    {t(TEXT_ACCOUNT_MANAGEMENT_ALL_STATUS)}
                  </Text>
                </Pressable>
                {ACCOUNT_ROLE_OPTIONS.map((opt) => (
                  <Pressable
                    key={opt.value}
                    style={dropdownItemStyle}
                    onPress={() => {
                      setStatusFilter(opt.value);
                      setStatusMenuOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        {
                          color: opt.color,
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Directory card */}
        <View style={styles.directoryCard}>
          <View style={styles.directoryHeader}>
            <View style={styles.directoryHeaderLeft}>
              <Text style={styles.directoryTitle}>
                {t(TEXT_ACCOUNT_MANAGEMENT_DIRECTORY)}
              </Text>
              <View style={styles.liveBadge}>
                <IconLiveDot />
                <Text style={styles.liveBadgeText}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_LIVE)}
                </Text>
              </View>
            </View>
          </View>

          {loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          ) : pageItems.length === 0 ? (
            <View style={styles.emptyWrap}>
              <IconStoreEmpty />
              <Text style={styles.emptyText}>
                {accounts.length === 0
                  ? t(TEXT_ACCOUNT_MANAGEMENT_EMPTY)
                  : t(TEXT_ACCOUNT_MANAGEMENT_NOT_FOUND)}
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.tableHeadRow}>
                <Text style={[styles.tableHeadCell, styles.colName]}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_COL_NAME)}
                </Text>
                <Text style={[styles.tableHeadCell, styles.colEmail]}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_COL_EMAIL)}
                </Text>
                <Text style={[styles.tableHeadCell, styles.colStatus]}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_COL_ROLE)}
                </Text>
                <Text style={[styles.tableHeadCell, styles.colActions]}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_COL_ACTION)}
                </Text>
              </View>

              {pageItems.map((item) => (
                <Pressable
                  key={item.id}
                  style={[styles.tableRow, styles.tableRowPressable]}
                  onPress={() => setDetailItem(item)}
                >
                  <View style={styles.cellName}>
                    <Text style={styles.customerName} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>

                  <View style={styles.cellEmail}>
                    <IconMail />
                    <Text style={styles.emailText} numberOfLines={1}>
                      {item.email}
                    </Text>
                  </View>

                  <View style={styles.cellStatus}>
                    {renderRolePill(item.role)}
                  </View>

                  <View style={styles.cellActions}>
                    <Pressable
                      style={styles.rowIconButton}
                      onPress={(e) => {
                        e.stopPropagation?.();
                        openEditForm(item);
                      }}
                    >
                      <IconEdit />
                    </Pressable>
                    <Pressable
                      style={styles.rowIconButton}
                      onPress={(e) => {
                        e.stopPropagation?.();
                        confirmDelete(item);
                      }}
                    >
                      <IconTrash />
                    </Pressable>
                  </View>
                </Pressable>
              ))}

              <View style={styles.paginationRow}>
                <Text style={styles.paginationInfo}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_SHOWING, {
                    start: rangeStart,
                    end: rangeEnd,
                    total: filtered.length,
                  })}
                </Text>
                <View style={styles.paginationControls}>
                  <Pressable
                    style={styles.pageBtn}
                    disabled={currentPage === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <IconChevronLeft />
                  </Pressable>
                  {pageButtons.map((p, idx) =>
                    p === "..." ? (
                      <Text key={`e-${idx}`} style={styles.pageEllipsis}>
                        ...
                      </Text>
                    ) : (
                      <Pressable
                        key={p}
                        style={[
                          styles.pageBtn,
                          p === currentPage && styles.pageBtnActive,
                        ]}
                        onPress={() => setPage(p)}
                      >
                        <Text
                          style={[
                            styles.pageBtnText,
                            p === currentPage && styles.pageBtnTextActive,
                          ]}
                        >
                          {p}
                        </Text>
                      </Pressable>
                    ),
                  )}
                  <Pressable
                    style={styles.pageBtn}
                    disabled={currentPage === totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <IconChevronRight />
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Add / Edit modal */}
        <AccountFormModal
          visible={formVisible}
          mode={formMode}
          animationType="fade"
          initialValue={editingItem}
          submitting={submitting}
          onClose={() => {
            if (!submitting) {
              setFormVisible(false);
              setEditingItem(null);
            }
          }}
          onSubmit={handleSubmitForm}
        />

        {/* Detail modal */}
        <Modal
          visible={!!detailItem}
          transparent
          animationType="fade"
          onRequestClose={() => setDetailItem(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_DETAIL_TITLE)}
                </Text>
                <Pressable onPress={() => setDetailItem(null)} hitSlop={8}>
                  <IconClose />
                </Pressable>
              </View>
              {detailItem && (
                <View style={styles.modalBody}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <View
                      style={[
                        styles.avatar,
                        {
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          backgroundColor: avatarColorFor(
                            detailItem.email || detailItem.name,
                          ),
                        },
                      ]}
                    >
                      <Text style={[styles.avatarText, { fontSize: 15 }]}>
                        {initialsFor(detailItem.name)}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.detailValue, { fontSize: 15.5 }]}>
                        {detailItem.name}
                      </Text>
                      {renderRolePill(detailItem.role)}
                    </View>
                  </View>
                  <View style={styles.detailGrid}>
                    <View style={[styles.detailGridItem, { width: "100%" }]}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_ACCOUNT_EMAIL)}
                      </Text>
                      <Text style={styles.detailValue}>{detailItem.email}</Text>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.modalFooter}>
                <Pressable
                  style={styles.btnSecondary}
                  onPress={() => setDetailItem(null)}
                >
                  <Text style={styles.btnSecondaryText}>
                    {t(TEXT_ACCOUNT_MANAGEMENT_CLOSE)}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.btnPrimary}
                  onPress={() => {
                    const item = detailItem;
                    setDetailItem(null);
                    openEditForm(item);
                  }}
                >
                  <Text style={styles.btnPrimaryText}>
                    {t(TEXT_ACCOUNT_MANAGEMENT_EDIT)}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete confirm modal */}
        <Modal
          visible={!!deleteTarget}
          transparent
          animationType="fade"
          onRequestClose={() => setDeleteTarget(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalCard, { maxWidth: 420 }]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_DELETE_TITLE)}
                </Text>
                <Pressable onPress={() => setDeleteTarget(null)} hitSlop={8}>
                  <IconClose />
                </Pressable>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.confirmText}>
                  {t(TEXT_ACCOUNT_MANAGEMENT_DELETE_CONFIRM, {
                    name: deleteTarget?.name,
                  })}
                </Text>
              </View>

              <View style={styles.modalFooter}>
                <Pressable
                  style={styles.btnSecondary}
                  onPress={() => setDeleteTarget(null)}
                  disabled={deleting}
                >
                  <Text style={styles.btnSecondaryText}>
                    {t(TEXT_ACCOUNT_MANAGEMENT_CANCEL)}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.btnDanger}
                  onPress={handleDelete}
                  disabled={deleting}
                >
                  <Text style={styles.btnDangerText}>
                    {deleting
                      ? t(TEXT_ACCOUNT_MANAGEMENT_DELETING)
                      : t(TEXT_ACCOUNT_MANAGEMENT_DELETE)}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Toast */}
        {toast && (
          <View
            style={[
              styles.toast,
              toast.type === "success"
                ? styles.toastSuccess
                : styles.toastError,
            ]}
          >
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const dropdownStyle = {
  position: "absolute",
  top: 42,
  left: 0,
  minWidth: 170,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#E2E8F0",
  paddingVertical: 4,
  zIndex: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 8,
};

const dropdownItemStyle = {
  paddingHorizontal: 12,
  paddingVertical: 8,
};
