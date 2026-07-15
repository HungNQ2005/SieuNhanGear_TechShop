import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    flex: 1,
  },

  logoArea: {
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  logo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subLogo: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 1,
    color: "#6B7280",
    fontWeight: "600",
  },

  menu: {
    marginTop: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 20,
    marginBottom: 4,
  },

  menuItemActive: {
    backgroundColor: "#EEF4FF",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
    paddingLeft: 16,
  },

  icon: {
    width: 24,
    alignItems: "center",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },

  menuTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
