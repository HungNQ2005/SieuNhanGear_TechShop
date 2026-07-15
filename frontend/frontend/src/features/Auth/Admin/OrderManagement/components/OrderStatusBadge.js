import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_DASHBOARD_PROCESSING,
  TEXT_DASHBOARD_SHIPPING,
  TEXT_DASHBOARD_DELIVERED,
  TEXT_DASHBOARD_CANCELLED,
} from "../../../../../constants/i18nKeys";

export default function OrderStatusBadge({ statusId, statusList }) {
  const { t } = useLocalization();

  const statusName = {
    1: t(TEXT_DASHBOARD_PROCESSING),
    2: t(TEXT_DASHBOARD_SHIPPING),
    3: t(TEXT_DASHBOARD_DELIVERED),
    4: t(TEXT_DASHBOARD_CANCELLED),
  };

  const status = statusList.find(
    (item) => item.id === Number(statusId)
  );

  if (!status) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: status.color,
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
        }}
      >
        {statusName[status.id] || status.name}
      </Text>
    </View>
  );
}