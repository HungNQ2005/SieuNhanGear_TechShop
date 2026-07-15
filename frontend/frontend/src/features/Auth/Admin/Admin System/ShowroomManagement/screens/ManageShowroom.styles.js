import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8FAFC",
  },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 4,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },

  // Toolbar
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    outlineStyle: "none",
  },

  resultCount: {
    marginLeft: 20,
    color: "#64748B",
  },

  // Card
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  cardInfoItem: {
    marginBottom: 8,
  },

  cardInfoLabel: {
    color: "#64748B",
    fontSize: 12,
  },

  cardInfoValue: {
    color: "#0F172A",
    fontWeight: "600",
  },

  cardActions: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },

  detailButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
  },

  detailButtonText: {
    fontWeight: "600",
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  iconButtonDanger: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  // Empty
  emptyWrap: {
    padding: 60,
    alignItems: "center",
  },

  emptyText: {
    color: "#64748B",
  },

  loaderWrap: {
    padding: 60,
    alignItems: "center",
  },

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  modalBody: {
    padding: 20,
  },

  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    gap: 10,
  },

  // Form
  formGroup: {
    marginBottom: 16,
  },

  formRow: {
    flexDirection: "row",
    gap: 12,
  },

  formLabel: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#334155",
  },

  formInput: {
    height: 42,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    outlineStyle: "none",
  },

  formInputError: {
    borderColor: "#EF4444",
  },

  formErrorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },

  btnPrimary: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  btnPrimaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  btnSecondary: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  btnSecondaryText: {
    fontWeight: "600",
  },

  btnDanger: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  btnDangerText: {
    color: "#fff",
    fontWeight: "700",
  },

  // Detail
  detailGrid: {
    gap: 16,
  },

  detailLabel: {
    fontSize: 12,
    color: "#64748B",
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  confirmText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
  // Pagination
  paginationRow: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paginationInfo: {
    fontSize: 14,
    color: "#64748B",
  },

  paginationControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  pageBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  pageBtnActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  pageBtnDisabled: {
    opacity: 0.45,
  },

  pageBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  pageBtnTextActive: {
    color: "#FFFFFF",
  },
});
