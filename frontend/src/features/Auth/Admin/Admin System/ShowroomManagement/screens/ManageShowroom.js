import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { styles } from "./ManageShowroom.styles";
import ShowroomFormModal from "../components/ShowroomFormModal";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import { useNavigate } from "react-router-dom";

import {
  getShowrooms,
  createShowroom,
  updateShowroom,
  deleteShowroom,
} from "../../../../../../services/api";

import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconClose,
  IconSearchSmall,
  IconChevronLeft,
  IconChevronRight,
  IconMapPinSmall,
  IconStoreEmpty,
} from "../../../../../../constants/icons";
import Sidebar from "../../../Sidebar";
import {
  TEXT_SHOWROOM_MANAGEMENT_TITLE,
  TEXT_SHOWROOM_MANAGEMENT_SUBTITLE,
  TEXT_SHOWROOM_MANAGEMENT_CREATE,
  TEXT_SHOWROOM_MANAGEMENT_LOAD_ERROR,
  TEXT_SHOWROOM_MANAGEMENT_SEARCH,
  TEXT_SHOWROOM_MANAGEMENT_COUNT,
  TEXT_SHOWROOM_MANAGEMENT_EMPTY,
  TEXT_SHOWROOM_MANAGEMENT_PHONE,
  TEXT_SHOWROOM_MANAGEMENT_WEBSITE,
  TEXT_SHOWROOM_MANAGEMENT_LATITUDE,
  TEXT_SHOWROOM_MANAGEMENT_LONGITUDE,
  TEXT_SHOWROOM_MANAGEMENT_DETAIL,
  TEXT_SHOWROOM_MANAGEMENT_SHOWING,
  TEXT_SHOWROOM_MANAGEMENT_RESULTS,
  TEXT_SHOWROOM_MANAGEMENT_DETAIL_TITLE,
  TEXT_SHOWROOM_MANAGEMENT_CLOSE,
  TEXT_SHOWROOM_MANAGEMENT_EDIT,
  TEXT_SHOWROOM_MANAGEMENT_DELETE_TITLE,
  TEXT_SHOWROOM_MANAGEMENT_DELETE_CONFIRM,
  TEXT_SHOWROOM_MANAGEMENT_DELETE,
  TEXT_SHOWROOM_MANAGEMENT_DELETING,
  TEXT_SHOWROOM_MANAGEMENT_CANCEL,
  TEXT_SHOWROOM_MANAGEMENT_CREATE_SUCCESS,
  TEXT_SHOWROOM_MANAGEMENT_UPDATE_SUCCESS,
  TEXT_SHOWROOM_MANAGEMENT_DELETE_SUCCESS,
  TEXT_SHOWROOM_MANAGEMENT_DELETE_FAILED,
  TEXT_SHOWROOM_MANAGEMENT_SAVE_FAILED,
  TEXT_SHOWROOM_NAME,
  TEXT_SHOWROOM_ADDRESS,
} from "../../../../../../constants/i18nKeys";

const PAGE_SIZE = 6;

export default function ManageShowroom() {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const [showrooms, setShowrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [detailItem, setDetailItem] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState(null);

  // ==========================
  // Toast
  // ==========================

  const showToast = (type, message) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // ==========================
  // Load Showrooms
  // ==========================

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await getShowrooms();

      setShowrooms(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);

      setErrorMsg(t(TEXT_SHOWROOM_MANAGEMENT_LOAD_ERROR));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "system_admin" && user.role !== "admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [navigate]);

  // ==========================
  // Search
  // ==========================

  const filteredShowrooms = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return showrooms;

    return showrooms.filter((item) => {
      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.address?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [search, showrooms]);

  // ==========================
  // Pagination
  // ==========================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredShowrooms.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const pageItems = filteredShowrooms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  // ==========================
  // Create
  // ==========================

  const openCreateForm = () => {
    setFormMode("create");
    setEditingItem(null);
    setFormVisible(true);
  };

  // ==========================
  // Edit
  // ==========================

  const openEditForm = (item) => {
    setFormMode("edit");
    setEditingItem(item);
    setFormVisible(true);
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmitForm = async (payload) => {
    try {
      setSubmitting(true);

      if (formMode === "create") {
        const res = await createShowroom(payload);

        setShowrooms((prev) => [res.data, ...prev]);

        showToast("success", t(TEXT_SHOWROOM_MANAGEMENT_CREATE_SUCCESS));
      } else {
        const res = await updateShowroom(editingItem.id, payload);

        setShowrooms((prev) =>
          prev.map((item) => (item.id === editingItem.id ? res.data : item)),
        );

        showToast("success", t(TEXT_SHOWROOM_MANAGEMENT_UPDATE_SUCCESS));
      }

      setFormVisible(false);
      setEditingItem(null);
    } catch (error) {
      console.log(error);

      showToast("error", t(TEXT_SHOWROOM_MANAGEMENT_SAVE_FAILED));
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================
  // Delete
  // ==========================

  const confirmDelete = (item) => {
    setDeleteTarget(item);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await deleteShowroom(deleteTarget.id);

      setShowrooms((prev) =>
        prev.filter((item) => item.id !== deleteTarget.id),
      );

      showToast("success", t(TEXT_SHOWROOM_MANAGEMENT_DELETE_SUCCESS));

      setDeleteTarget(null);
    } catch (error) {
      console.log(error);

      showToast("error", t(TEXT_SHOWROOM_MANAGEMENT_DELETE_FAILED));
    } finally {
      setDeleting(false);
    }
  };
  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F8FAFC" }}>
      <Sidebar selected="showroom" />
      <View style={{ flex: 1, padding: 24 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>
              {t(TEXT_SHOWROOM_MANAGEMENT_TITLE)}
            </Text>

            <Text style={styles.subtitle}>
              {t(TEXT_SHOWROOM_MANAGEMENT_SUBTITLE)}
            </Text>
          </View>

          <Pressable style={styles.addButton} onPress={openCreateForm}>
            <IconPlus />
            <Text style={styles.addButtonText}>
              {t(TEXT_SHOWROOM_MANAGEMENT_CREATE)}
            </Text>
          </Pressable>
        </View>

        {errorMsg ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Search */}

        <View style={styles.toolbar}>
          <View style={styles.searchBox}>
            <IconSearchSmall />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder={t(TEXT_SHOWROOM_MANAGEMENT_SEARCH)}
              placeholderTextColor="#CBD5E1"
              style={{
                flex: 1,
                height: "100%",
                fontSize: 14,
                color: "#0F172A",
              }}
            />
          </View>

          <Text style={styles.resultCount}>
            {filteredShowrooms.length} {t(TEXT_SHOWROOM_MANAGEMENT_COUNT)}
          </Text>
        </View>

        {/* Loading */}

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : pageItems.length === 0 ? (
          <View style={styles.emptyWrap}>
            <IconStoreEmpty />

            <Text style={styles.emptyText}>
              {t(TEXT_SHOWROOM_MANAGEMENT_EMPTY)}
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {pageItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.name}</Text>

                  <View style={styles.cardAddressRow}>
                    <IconMapPinSmall />

                    <Text style={styles.cardAddress}>{item.address}</Text>
                  </View>

                  <View style={styles.cardInfoGrid}>
                    <View style={styles.cardInfoItem}>
                      <Text style={styles.cardInfoLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_PHONE)}
                      </Text>

                      <Text style={styles.cardInfoValue}>
                        {item.phone || "-"}
                      </Text>
                    </View>

                    <View style={styles.cardInfoItem}>
                      <Text style={styles.cardInfoLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_WEBSITE)}
                      </Text>

                      <Text style={styles.cardInfoValue}>
                        {item.website || "-"}
                      </Text>
                    </View>

                    <View style={styles.cardInfoItem}>
                      <Text style={styles.cardInfoLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_LATITUDE)}
                      </Text>

                      <Text style={styles.cardInfoValue}>{item.latitude}</Text>
                    </View>

                    <View style={styles.cardInfoItem}>
                      <Text style={styles.cardInfoLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_LONGITUDE)}
                      </Text>

                      <Text style={styles.cardInfoValue}>{item.longitude}</Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.cardActions}>
                    <Pressable
                      style={styles.detailButton}
                      onPress={() => setDetailItem(item)}
                    >
                      <Text style={styles.detailButtonText}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_DETAIL)}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.iconButton}
                      onPress={() => openEditForm(item)}
                    >
                      <IconEdit />
                    </Pressable>

                    <Pressable
                      style={[styles.iconButton, styles.iconButtonDanger]}
                      onPress={() => confirmDelete(item)}
                    >
                      <IconTrash />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Pagination */}

        {!loading && filteredShowrooms.length > 0 && (
          <View style={styles.paginationRow}>
            <Text style={styles.paginationInfo}>
              {t(TEXT_SHOWROOM_MANAGEMENT_SHOWING)}{" "}
              {(currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, filteredShowrooms.length)}
              {" / "}
              {filteredShowrooms.length} {t(TEXT_SHOWROOM_MANAGEMENT_RESULTS)}
            </Text>

            <View style={styles.paginationControls}>
              <Pressable
                style={[
                  styles.pageBtn,
                  currentPage === 1 && styles.pageBtnDisabled,
                ]}
                disabled={currentPage === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <IconChevronLeft />
              </Pressable>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pressable
                    key={page}
                    style={[
                      styles.pageBtn,
                      page === currentPage && styles.pageBtnActive,
                    ]}
                    onPress={() => setPage(page)}
                  >
                    <Text
                      style={[
                        styles.pageBtnText,
                        page === currentPage && styles.pageBtnTextActive,
                      ]}
                    >
                      {page}
                    </Text>
                  </Pressable>
                ),
              )}

              <Pressable
                style={[
                  styles.pageBtn,
                  currentPage === totalPages && styles.pageBtnDisabled,
                ]}
                disabled={currentPage === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <IconChevronRight />
              </Pressable>
            </View>
          </View>
        )}

        {/* Form Modal */}

        <ShowroomFormModal
          visible={formVisible}
          mode={formMode}
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
        {/* Detail Modal */}
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
                  {t(TEXT_SHOWROOM_MANAGEMENT_DETAIL_TITLE)}
                </Text>

                <Pressable onPress={() => setDetailItem(null)} hitSlop={8}>
                  <IconClose />
                </Pressable>
              </View>

              {detailItem && (
                <View style={styles.modalBody}>
                  <View style={styles.detailGrid}>
                    <View style={styles.detailGridItem}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_SHOWROOM_NAME)}
                      </Text>

                      <Text style={styles.detailValue}>{detailItem.name}</Text>
                    </View>

                    <View style={[styles.detailGridItem, { width: "100%" }]}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_SHOWROOM_ADDRESS)}
                      </Text>

                      <Text style={styles.detailValue}>
                        {detailItem.address}
                      </Text>
                    </View>

                    <View style={styles.detailGridItem}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_PHONE)}
                      </Text>

                      <Text style={styles.detailValue}>{detailItem.phone}</Text>
                    </View>

                    <View style={styles.detailGridItem}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_WEBSITE)}
                      </Text>

                      <Text style={styles.detailValue}>
                        {detailItem.website}
                      </Text>
                    </View>

                    <View style={styles.detailGridItem}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_LATITUDE)}
                      </Text>

                      <Text style={styles.detailValue}>
                        {detailItem.latitude}
                      </Text>
                    </View>

                    <View style={styles.detailGridItem}>
                      <Text style={styles.detailLabel}>
                        {t(TEXT_SHOWROOM_MANAGEMENT_LONGITUDE)}
                      </Text>

                      <Text style={styles.detailValue}>
                        {detailItem.longitude}
                      </Text>
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
                    {t(TEXT_SHOWROOM_MANAGEMENT_CLOSE)}
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
                    {t(TEXT_SHOWROOM_MANAGEMENT_EDIT)}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Modal */}
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
                  {t(TEXT_SHOWROOM_MANAGEMENT_DELETE_TITLE)}
                </Text>

                <Pressable onPress={() => setDeleteTarget(null)} hitSlop={8}>
                  <IconClose />
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.confirmText}>
                  {t(TEXT_SHOWROOM_MANAGEMENT_DELETE_CONFIRM)}{" "}
                  <Text style={{ fontWeight: "700" }}>
                    {deleteTarget?.name}
                  </Text>
                  ?
                </Text>
              </View>

              <View style={styles.modalFooter}>
                <Pressable
                  style={styles.btnSecondary}
                  onPress={() => setDeleteTarget(null)}
                  disabled={deleting}
                >
                  <Text style={styles.btnSecondaryText}>
                    {t(TEXT_SHOWROOM_MANAGEMENT_CANCEL)}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.btnDanger}
                  onPress={handleDelete}
                  disabled={deleting}
                >
                  <Text style={styles.btnDangerText}>
                    {deleting
                      ? t(TEXT_SHOWROOM_MANAGEMENT_DELETING)
                      : t(TEXT_SHOWROOM_MANAGEMENT_DELETE)}
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
