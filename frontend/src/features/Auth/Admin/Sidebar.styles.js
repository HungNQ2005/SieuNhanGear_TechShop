import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: "#111827",
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 40,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
  },

  activeMenu: {
    backgroundColor: "#2563EB",
  },

  menuText: {
    color: "#ddd",
    fontSize: 16,
  },

  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
});