import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 24,
  },

  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
},

left: {
    flex: 7,
},

right: {
    flex: 3,
    alignSelf: "stretch",
},
});