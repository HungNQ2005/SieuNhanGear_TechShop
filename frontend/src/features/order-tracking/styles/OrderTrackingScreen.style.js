import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  content: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  left: {
    flex: 1,
    minWidth: 0,
  },

  right: {
    width: "100%",
    maxWidth: 420,
    flexGrow: 1,
    gap: 16,
    minWidth: 320,
  },

  emptyState: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingVertical: 44,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E6ECF5",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },

  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyIcon: {
    fontSize: 34,
  },

  emptyTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});