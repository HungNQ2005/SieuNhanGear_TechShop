import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 24,
  },

  // ================= HEADER =================

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  addButton: {
    backgroundColor: "#2563EB",
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },

  // ================= TOOLBAR =================

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    zIndex: 1000,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },

  selectBox: {
    width: 180,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  selectText: {
    color: "#374151",
    fontWeight: "600",
  },

  // ================= CARD =================

  directoryCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "visible",
  },

  directoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  directoryHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  directoryTitle: {
    fontWeight: "700",
    fontSize: 17,
    color: "#111827",
  },

  liveBadge: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  liveBadgeText: {
    marginLeft: 4,
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 11,
  },

  // ================= TABLE =================

  tableHeadRow: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  tableHeadCell: {
    color: "#6B7280",
    fontWeight: "700",
    fontSize: 12,
  },

  colName: {
    flex: 2.5,
  },

  colEmail: {
    flex: 2.5,
  },

  colStatus: {
    flex: 1.4,
  },

  colActions: {
    width: 90,
    textAlign: "right",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  tableRowPressable: {},

  cellName: {
    flex: 2.5,
    flexDirection: "row",
    alignItems: "center",
  },

  // ================= EMAIL =================

  cellEmail: {
    flex: 2.5,
    flexDirection: "row",
    alignItems: "center",
  },

  emailText: {
    marginLeft: 8,
    color: "#6B7280",
    fontSize: 13,
  },

  // ================= ROLE =================

  cellStatus: {
    flex: 1.4,
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusPillText: {
    fontWeight: "600",
    fontSize: 12,
  },

  // ================= ACTION =================

  cellActions: {
    width: 90,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowIconButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // ================= EMPTY =================

  loaderWrap: {
    paddingVertical: 70,
    alignItems: "center",
  },

  emptyWrap: {
    paddingVertical: 70,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 12,
    color: "#9CA3AF",
    fontSize: 14,
  },

  // ================= PAGINATION =================

  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },

  paginationInfo: {
    color: "#6B7280",
    fontSize: 13,
  },

  paginationControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  pageBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },

  pageBtnActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  pageBtnText: {
    color: "#374151",
    fontWeight: "600",
  },

  pageBtnTextActive: {
    color: "#fff",
  },

  pageEllipsis: {
    marginHorizontal: 6,
    color: "#9CA3AF",
  },

  // ================= MODAL =================

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 550,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },

  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },

  modalSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
    maxWidth: 260,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonPressed: {
    backgroundColor: "#E5E7EB",
  },

  modalBody: {
    paddingHorizontal: 20,
  },

  modalBodyContent: {
    paddingTop: 18,
    paddingBottom: 8,
  },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 12,
  },

  footerBtn: {
    flex: 1,
    alignItems: "center",
  },

  btnPrimary: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 13,
    marginLeft: 10,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  btnPrimaryPressed: {
    backgroundColor: "#1D4ED8",
  },

  btnPrimaryDisabled: {
    backgroundColor: "#93C5FD",
    shadowOpacity: 0,
    elevation: 0,
  },

  btnPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  btnSecondary: {
    minWidth: 96,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  btnSecondaryPressed: {
    backgroundColor: "#E5E7EB",
  },

  btnSecondaryText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },
  btnDanger: {
    minWidth: 96,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },

  btnDangerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  confirmText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#4B5563",
    paddingVertical: 10,
  },

  // ================= FORM =================

  formGroup: {
    marginBottom: 18,
  },

  formLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 8,
  },

  requiredMark: {
    color: "#DC2626",
  },

  formInput: {
    height: 46,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },

  formInputFocused: {
    borderColor: "#2563EB",
    backgroundColor: "#fff",
  },

  formInputError: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },

  formErrorText: {
    marginTop: 6,
    color: "#DC2626",
    fontSize: 12,
  },

  roleList: {
    gap: 10,
  },

  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  roleTextWrap: {
    flex: 1,
  },

  roleLabel: {
    fontWeight: "700",
    fontSize: 14,
    color: "#111827",
  },
});
