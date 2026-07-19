import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_PROD_STATUS_ACTIVE,
  TEXT_PROD_STATUS_DRAFTING,
  TEXT_PROD_STATUS_OUT_OF_STOCK,
} from "../../../../../../constants/i18nKeys";

const THEME = {
  active: { dot: "#16A34A", bg: "#EFF6FF", fg: "#2563EB" },
  drafting: { dot: "#9CA3AF", bg: "#F3F4F6", fg: "#6B7280" },
  out_of_stock: { dot: "#DC2626", bg: "#FEF2F2", fg: "#DC2626" },
};

export default function ProductStatusBadge({ status }) {
  const { t } = useLocalization();
  const theme = THEME[status] || THEME.active;

  const label =
    status === "drafting"
      ? t(TEXT_PROD_STATUS_DRAFTING)
      : status === "out_of_stock"
      ? t(TEXT_PROD_STATUS_OUT_OF_STOCK)
      : t(TEXT_PROD_STATUS_ACTIVE);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 6,
        backgroundColor: theme.bg,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
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
      <Text style={{ fontSize: 12.5, color: theme.fg, fontWeight: "600" }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
