import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_CAT_STATUS_ACTIVE,
  TEXT_CAT_STATUS_HIDDEN,
} from "../../../../../../constants/i18nKeys";

const THEME = {
  active: { dot: "#16A34A", bg: "#F0FDF4", fg: "#15803D" },
  hidden: { dot: "#9CA3AF", bg: "#F3F4F6", fg: "#6B7280" },
};

export default function CategoryStatusBadge({ status }) {
  const { t } = useLocalization();
  const theme = THEME[status] || THEME.active;
  const label = status === "hidden" ? t(TEXT_CAT_STATUS_HIDDEN) : t(TEXT_CAT_STATUS_ACTIVE);

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
        {label}
      </Text>
    </View>
  );
}
