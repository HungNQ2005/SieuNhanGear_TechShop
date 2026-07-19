import React from "react";
import { View, Text } from "react-native";

export default function UsageBar({ value, max }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View
        style={{
          width: 70,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${pct}%`,
            height: "100%",
            backgroundColor: "#2563EB",
            borderRadius: 3,
          }}
        />
      </View>
      <Text style={{ fontSize: 13, color: "#111827", fontWeight: "600" }}>
        {value.toLocaleString()}
      </Text>
    </View>
  );
}
