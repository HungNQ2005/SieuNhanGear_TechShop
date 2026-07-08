import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    marginBottom: 18,
    color: "#0F172A",
  },

  item: {
    minHeight: 64,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8EEF7",
  },
});