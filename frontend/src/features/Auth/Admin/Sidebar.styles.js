import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: 240,
    minWidth: 240,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 28,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  logoWrap: {
    marginBottom: 28,
    paddingHorizontal: 6,
  },

  logo: {
    color: "#111827",
    fontSize: 21,
    fontWeight: "800",
    lineHeight: 26,
  },

  logoSubtitle: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },

  menuSection: {
    marginTop: 4,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 4,
  },

  activeMenu: {
    backgroundColor: "#EFF6FF",
  },

  menuText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },

  activeText: {
    color: "#2563EB",
    fontWeight: "700",
  },

  bottomSection: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 14,
  },

  bottomItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 2,
  },

  bottomText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
  },
});
