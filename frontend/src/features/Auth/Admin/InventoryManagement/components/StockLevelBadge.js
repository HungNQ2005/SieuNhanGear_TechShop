import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_STATUS_URGENT,
  TEXT_STATUS_LOW_STOCK,
  TEXT_STATUS_HEALTHY,
  TEXT_UNITS,
} from "../../../../../constants/i18nKeys";

const THEME = {
  urgent: {
    bg: "#FEE2E2",
    fg: "#DC2626",
    dot: "#DC2626",
  },
  low: {
    bg: "#DBEAFE",
    fg: "#2563EB",
    dot: "#2563EB",
  },
  healthy: {
    bg: "#F3F4F6",
    fg: "#4B5563",
    dot: "#9CA3AF",
  },
};

export default function StockLevelBadge({ quantity, status }) {
  const { t } = useLocalization();
  const theme = THEME[status] || THEME.healthy;

  const label =
    status === "urgent"
      ? t(TEXT_STATUS_URGENT)
      : status === "low"
      ? t(TEXT_STATUS_LOW_STOCK)
      : t(TEXT_STATUS_HEALTHY);

  return (
    <View style={{ alignItems: "flex-start" }}>
      <View
        style={{
          backgroundColor: theme.bg,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: theme.fg, fontWeight: "700", fontSize: 13 }}>
          {quantity} {t(TEXT_UNITS).toUpperCase()}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginTop: 4,
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.dot,
          }}
        />
        <Text style={{ color: theme.fg, fontSize: 11, fontWeight: "600" }}>
          {label}
        </Text>
      </View>
    </View>
  );
}
