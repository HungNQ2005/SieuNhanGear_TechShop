import React from "react";
import { View, Text } from "react-native";

export default function DashboardCard({ title, value }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginHorizontal: 8,
        elevation: 2,
      }}
    >
      <Text
        style={{
          color: "#666",
          marginBottom: 10,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
    </View>
  );
}