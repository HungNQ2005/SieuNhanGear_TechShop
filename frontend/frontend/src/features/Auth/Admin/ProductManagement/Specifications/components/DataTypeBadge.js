import React from "react";
import { View, Text } from "react-native";

const THEME = {
  SELECT: { bg: "#EFF6FF", fg: "#2563EB" },
  NUMBER: { bg: "#F0FDF4", fg: "#16A34A" },
  TEXT: { bg: "#FEF3C7", fg: "#B45309" },
  BOOLEAN: { bg: "#F3E8FF", fg: "#7C3AED" },
};

export default function DataTypeBadge({ dataType }) {
  const theme = THEME[dataType] || { bg: "#F3F4F6", fg: "#4B5563" };

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: theme.bg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
      }}
    >
      <Text style={{ color: theme.fg, fontSize: 11.5, fontWeight: "700" }}>
        {dataType}
      </Text>
    </View>
  );
}
