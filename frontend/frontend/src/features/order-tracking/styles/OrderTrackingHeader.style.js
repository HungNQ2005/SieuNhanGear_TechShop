import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 22,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E8F1FF",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0057E7",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 8,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
  },

  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: "#D8E1EE",
    borderRadius: 16,
    paddingHorizontal: 18,
    backgroundColor: "#F8FAFC",
    fontSize: 16,
  },

  button: {
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: "#0057E7",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  helperText: {
    marginTop: 12,
    fontSize: 13,
    color: "#94A3B8",
  },
});