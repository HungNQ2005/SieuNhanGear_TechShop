import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_ORDER_CODE,
  TEXT_CUSTOMER,
  TEXT_TOTAL,
  TEXT_STATUS,
  TEXT_ACTION,
} from "../../../../../constants/i18nKeys";
import OrderRow from "./OrderRow";

export default function OrderTable({ orders, statusList, onEdit, onDelete }) {
  const { t } = useLocalization();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 18,
          backgroundColor: "#F9FAFB",
        }}
      >
        <Text style={{ flex: 1.2, fontWeight: "700" }}>
          {t(TEXT_ORDER_CODE)}
        </Text>

        <Text style={{ flex: 2, fontWeight: "700" }}>
          {t(TEXT_CUSTOMER)}
        </Text>

        <Text style={{ flex: 1.2, fontWeight: "700" }}>
          {t(TEXT_TOTAL)}
        </Text>

        <Text style={{ flex: 1.2, fontWeight: "700" }}>
          {t(TEXT_STATUS)}
        </Text>

        <Text style={{ flex: 1.5, fontWeight: "700" }}>
          {t(TEXT_ACTION)}
        </Text>
      </View>

      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <OrderRow
            key={order.id || order._id || Math.random()}
            order={order}
            statusList={statusList}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <View style={{ padding: 24, alignItems: "center" }}>
          <Text style={{ color: "#64748B" }}>Chưa có đơn hàng nào.</Text>
        </View>
      )}
    </View>
  );
}