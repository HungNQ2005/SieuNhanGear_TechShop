import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 28,
    color: "#0f172a",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  free: {
    color: "#16a34a",
    fontWeight: "700",
  },

  line: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 20,
  },

  total: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },

  button: {
    marginTop: 28,
    backgroundColor: "#1665f5",
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});