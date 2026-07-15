import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#2196F3",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    gap: 20,
    flexWrap: "wrap",
  },
  leftColumn: {
    flex: 2,
    marginRight: 20,
  },

  rightColumn: {
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#ececec",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF4FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  formContainer: {
    gap: 16,
  },
  formGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  required: {
    color: "#e74c3c",
  },
  input: {
    height: 48,

    borderWidth: 1,
    borderColor: "#dcdfe4",

    borderRadius: 10,

    paddingHorizontal: 15,

    fontSize: 14,

    backgroundColor: "#fff",
  },
  selectInput: {
    height: 48,

    borderWidth: 1,
    borderColor: "#dcdfe4",

    borderRadius: 10,

    paddingHorizontal: 15,

    backgroundColor: "#fff",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  selectPlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  selectArrow: {
    fontSize: 16,
    color: "#999",
  },
  discountContainer: {
    gap: 12,
  },
  discountInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    backgroundColor: "#fff",
    color: "#000",
    textTransform: "uppercase",
  },
  discountInputDisabled: {
    backgroundColor: "#f5f5f5",
    color: "#999",
  },
  discountButton: {
    width: 110,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#1976D2",
  },
  discountButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  discountButtonRemove: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  discountButtonTextRemove: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  discountButtonDisabled: {
    opacity: 0.6,
  },
  appliedDiscountContainer: {
    backgroundColor: "#f0f7ff",
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  discountBadge: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  discountBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  discountDesc: {
    fontSize: 12,
    color: "#333",
    fontStyle: "italic",
  },
  discountValueText: {
    fontSize: 13,
    color: "#2196F3",
    fontWeight: "500",
    marginTop: 4,
  },
  availableCodesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  availableCodesTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  codesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  codeItem: {
    marginBottom: 4,
  },
  codeItemActive: {
    opacity: 1,
  },
  codeItemDisabled: {
    opacity: 0.5,
  },
  codeBadge: {
    backgroundColor: "#fff3cd",
    borderWidth: 1,
    borderColor: "#ffc107",
    color: "#856404",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: "600",
  },
  codeBadgeActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
    color: "#fff",
  },
  codeBadgeDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    color: "#999",
  },
  codeStatus: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
    textAlign: "center",
  },
  discountCodeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "400",
  },
  methodsContainer: {
    gap: 12,
  },
  methodCard: {
    flexDirection: "row",

    padding: 16,

    borderRadius: 10,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    backgroundColor: "#fff",

    marginBottom: 12,
  },
  methodCardSelected: {
    borderColor: "#2196F3",
    backgroundColor: "#f0f7ff",
  },
  methodRadio: {
    width: 22,
    height: 22,

    borderRadius: 11,

    borderWidth: 2,

    borderColor: "#1976D2",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },
  methodRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1976D2",
  },
  methodInfo: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  summaryCard: {
    backgroundColor: "#fff",

    borderRadius: 12,

    padding: 20,

    borderWidth: 1,
    borderColor: "#ececec",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemsContainer: {
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  itemQuantity: {
    fontSize: 11,
    color: "#999",
    marginLeft: 8,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  discountValue: {
    color: "#27ae60",
  },
  totalRow: {
    marginTop: 12,

    paddingVertical: 16,

    paddingHorizontal: 16,

    borderRadius: 10,

    backgroundColor: "#F8FAFC",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E53935",
  },
  checkoutButton: {
    height: 52,

    borderRadius: 10,

    backgroundColor: "#1976D2",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 16,
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: "#fff",

    fontSize: 15,

    fontWeight: "700",
  },
  infoContainer: {
    gap: 8,
  },
  infoBullet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoBulletIcon: {
    fontSize: 14,
    color: "#27ae60",
    fontWeight: "bold",
  },
  infoBulletText: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  pickerItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#333",
  },
  pickerEmpty: {
    textAlign: "center",
    padding: 20,
    color: "#999",
  },
  modalClose: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
