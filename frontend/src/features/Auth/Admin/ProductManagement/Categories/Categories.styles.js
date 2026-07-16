import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
  },

  main: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 28,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 16,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  pageSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    maxWidth: 560,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13.5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  cardHeader: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#F1F3F6",
  },

  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
});
