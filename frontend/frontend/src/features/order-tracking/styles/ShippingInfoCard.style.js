import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
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
    color: "#0F172A",
    marginBottom: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 18,
    flexWrap: "wrap",
  },

  label: {
    fontSize: 13,
    lineHeight: 18,
    color: "#94A3B8",
    marginBottom: 6,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  value: {
    fontSize: 16,
    lineHeight: 23,
    color: "#1E293B",
    fontWeight: "700",
    maxWidth: 320,
  },
});