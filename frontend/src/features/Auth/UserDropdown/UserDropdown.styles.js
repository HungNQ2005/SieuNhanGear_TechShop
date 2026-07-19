import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 42,
    right: 0,
    width: 230,

    backgroundColor: "#fff",

    borderRadius: 12,

    borderWidth: 1,
    borderColor: "#eee",

    elevation: 12,
    zIndex: 9999,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563eb",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  name: {
    fontWeight: "700",
    fontSize: 15,
  },

  email: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
  },

  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  itemText: {
    fontSize: 15,
    color: "#222",
  },

  logout: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 15,
  },
});