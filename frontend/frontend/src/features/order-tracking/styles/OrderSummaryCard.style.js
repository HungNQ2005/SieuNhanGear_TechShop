import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
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
    marginBottom: 20,
  },

  product: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 12,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  brand: {
    color: "#0057E7",
    fontWeight: "800",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 4,
  },

  name: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
    color: "#1E293B",
  },

  spec: {
    fontSize: 13,
    lineHeight: 18,
    color: "#94A3B8",
    marginTop: 4,
  },

  price: {
    fontSize: 16,
    lineHeight: 22,
    color: "#0F172A",
    fontWeight: "800",
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5EAF2",
    marginVertical: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 16,
  },

  free: {
    color: "#16A34A",
    fontWeight: "800",
  },

  total: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  totalPrice: {
    fontSize: 22,
    lineHeight: 28,
    color: "#0057E7",
    fontWeight: "900",
  },
});