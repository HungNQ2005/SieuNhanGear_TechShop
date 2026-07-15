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
    marginBottom: 22,
    color: "#0F172A",
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 18,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: "#16A34A",
    marginTop: 5,
    shadowColor: "#16A34A",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#CDEDD6",
    marginLeft: 5,
    marginTop: 6,
  },

  box: {
    flex: 1,
    marginLeft: 14,
    backgroundColor: "#F7FAFC",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E8EEF7",
  },

  stepTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
    marginBottom: 6,
    color: "#0F172A",
  },

  time: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
});