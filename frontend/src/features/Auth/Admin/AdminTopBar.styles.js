import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 320,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#111827",
    outlineStyle: "none",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#E5E7EB",
  },

  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileTextWrap: {
    alignItems: "flex-end",
  },

  profileTag: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: 0.4,
  },

  profileUsername: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 1,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
