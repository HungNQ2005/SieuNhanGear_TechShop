import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#eef2f7",
    position: "relative",
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
    resizeMode: "cover",
  },

  content: {
    flex: 1,
    marginLeft: 28,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
  },

  brand: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 24,
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    height: 52,
    borderWidth: 1,
    borderColor: "#dbe3ec",
    borderRadius: 10,
    overflow: "hidden",
  },

  qtyBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },

  qtyBtnText: {
    fontSize: 24,
    fontWeight: "600",
  },

  rightSection: {
    alignItems: "flex-end",
    marginRight: 30,
  },

  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1665f5",
  },

  unitPrice: {
    marginTop: 4,
    fontSize: 14,
    color: "#94a3b8",
  },

  removeBtn: {
    position: "absolute",
    top: 22,
    right: 22,
  },

  removeText: {
    fontSize: 28,
    color: "#94a3b8",
  },
});