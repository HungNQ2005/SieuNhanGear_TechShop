import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import { TEXT_DETAIL } from "../../../../../constants/i18nKeys";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderRow({ order, statusList }) {
  const { t } = useLocalization();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 18,
        borderTopWidth: 1,
        borderColor: "#eee",
        alignItems: "center",
      }}
    >
      <Text style={{ flex: 1 }}>{order.code}</Text>

      <Text style={{ flex: 2 }}>{order.customerName}</Text>

      <Text style={{ flex: 1 }}>{order.total?.toLocaleString()}₫</Text>

      <View style={{ flex: 1 }}>
        <OrderStatusBadge statusId={order.statusId} statusList={statusList} />
      </View>

      <TouchableOpacity
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "#2563EB",
            fontWeight: "600",
          }}
        >
          {t(TEXT_DETAIL)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
