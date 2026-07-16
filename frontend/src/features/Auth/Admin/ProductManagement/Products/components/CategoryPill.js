import React from "react";
import { View, Text } from "react-native";

export default function CategoryPill({ label }) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontSize: 12.5, color: "#374151", fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}
