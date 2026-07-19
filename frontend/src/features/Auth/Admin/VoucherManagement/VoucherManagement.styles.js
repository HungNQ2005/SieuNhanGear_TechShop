import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
  },

  main: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  pageSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },
});