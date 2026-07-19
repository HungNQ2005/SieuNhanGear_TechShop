import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_SPEC_STATUS_ACTIVE,
  TEXT_SPEC_STATUS_PENDING,
  TEXT_SPEC_STATUS_ARCHIVED,
} from "../../../../../../constants/i18nKeys";

const THEME = {
  active: { fg: "#16A34A" },
  pending: { fg: "#D97706" },
  archived: { fg: "#9CA3AF" },
};

export default function StatusBadge({ status }) {
  const { t } = useLocalization();
  const theme = THEME[status] || THEME.active;

  const label =
    status === "pending"
      ? t(TEXT_SPEC_STATUS_PENDING)
      : status === "archived"
      ? t(TEXT_SPEC_STATUS_ARCHIVED)
      : t(TEXT_SPEC_STATUS_ACTIVE);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 4,
          backgroundColor: theme.fg,
        }}
      />
      <Text style={{ fontSize: 13, color: "#374151", fontWeight: "500" }}>
        {label}
      </Text>
    </View>
  );
}
