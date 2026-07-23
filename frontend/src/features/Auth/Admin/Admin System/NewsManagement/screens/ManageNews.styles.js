import { StyleSheet } from "react-native";

// ================= DESIGN TOKENS =================
const colors = {
  bg: "#F8F9FC",
  surface: "#FFFFFF",
  border: "#E9EBF3",
  borderSoft: "#F1F2F7",

  text: "#0F172A",
  textMuted: "#64748B",
  textFaint: "#94A3B8",

  primary: "#4F46E5",
  primaryDark: "#4338CA",
  primarySoft: "#EEF2FF",

  danger: "#DC2626",
  dangerSoft: "#FEE2E2",
  dangerBorder: "#FCA5A5",

  neutralSoft: "#F1F5F9",
};

const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 24,
  },

  // ================= HEADER =================

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },

  addButton: {
    backgroundColor: colors.primary,
    height: 46,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },

  addButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 46,
    marginRight: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text,
  },

  selectBox: {
    width: 180,
    height: 46,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  selectText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },

  // Status filter dropdown
  dropdownMenu: {
    position: "absolute",
    top: 52,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },

  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: radius.sm,
    marginHorizontal: 4,
  },

  dropdownItemActive: {
    backgroundColor: colors.primarySoft,
  },

  dropdownItemText: {
    fontSize: 14,
    color: colors.text,
  },

  // ================= CARD / TABLE =================

  directoryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.neutralSoft,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  th: {
    color: colors.textMuted,
    fontWeight: "700",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tableBody: {},

  tr: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },

  td: {
    justifyContent: "center",
  },

  // Title cell
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },

  nameBlock: {
    flex: 1,
  },

  nameText: {
    fontWeight: "700",
    fontSize: 14,
    color: colors.text,
  },

  secondaryText: {
    fontSize: 13,
    color: colors.textMuted,
  },

  // Status badge
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },

  roleText: {
    fontWeight: "700",
    fontSize: 12,
  },

  // Row actions
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.neutralSoft,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  actionBtnDanger: {
    backgroundColor: colors.dangerSoft,
  },

  // Empty / loading / error states
  emptyState: {
    paddingVertical: 72,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    marginTop: 12,
    color: colors.textFaint,
    fontSize: 14,
  },

  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
  },

  // ================= PAGINATION =================

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },

  pageInfo: {
    color: colors.textMuted,
    fontSize: 13,
  },

  pageControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  pageBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },

  pageBtnDisabled: {
    opacity: 0.5,
  },

  // ================= DELETE MODAL =================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  deleteCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 24,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 8,
  },

  deleteIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  deleteTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },

  deleteDesc: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 22,
  },

  deleteActions: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },

  deleteCancel: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteCancelText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },

  deleteConfirm: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },

  deleteConfirmText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // ================= TOAST =================

  toastContainer: {
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },

  toast: {
    backgroundColor: "#111827",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: radius.md,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
    maxWidth: 420,
  },

  toastError: {
    backgroundColor: colors.danger,
  },

  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  // ================= FORM MODAL (NewsFormModal) =================

  modalCard: {
    width: "100%",
    maxWidth: 560,
    maxHeight: "88%",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 8,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.neutralSoft,
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonPressed: {
    backgroundColor: colors.border,
  },

  modalBody: {
    paddingHorizontal: 22,
  },

  modalBodyContent: {
    paddingTop: 20,
    paddingBottom: 8,
  },

  formGroup: {
    marginBottom: 18,
  },

  formLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 8,
  },

  requiredMark: {
    color: colors.danger,
  },

  formInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.neutralSoft,
  },

  formInputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },

  formInputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },

  formErrorText: {
    marginTop: 6,
    color: colors.danger,
    fontSize: 12,
  },

  roleOptions: {
    gap: 10,
  },

  roleOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
  },

  roleOptionLabel: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    gap: 12,
  },

  btnCancel: {
    minWidth: 100,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  btnCancelText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },

  btnSave: {
    minWidth: 120,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },

  btnSaveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});