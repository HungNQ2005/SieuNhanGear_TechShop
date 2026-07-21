import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import { TEXT_DETAIL } from "../../../../../constants/i18nKeys";
import OrderStatusBadge from "./OrderStatusBadge";
import { useNavigate } from "react-router-dom";

export default function OrderRow({ order, statusList, onEdit, onDelete }) {
  const { t } = useLocalization();
  const navigate = useNavigate();

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
      <Text style={{ flex: 1.2, fontWeight: "600" }}>{order.code}</Text>

      <Text style={{ flex: 2 }}>{order.customerName}</Text>

      <Text style={{ flex: 1.2 }}>{(Number(order.total) || 0).toLocaleString()}₫</Text>

      <View style={{ flex: 1.2 }}>
        <OrderStatusBadge statusId={order.statusId} statusList={statusList} />
      </View>

      <View style={{ flex: 1.5, flexDirection: "row", gap: 12, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigate(`/admin/orders/${order.id}`)}>
          <Text style={{ color: "#2563EB", fontWeight: "600", fontSize: 13 }}>
            {t(TEXT_DETAIL)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onEdit && onEdit(order)}>
          <Text style={{ color: "#D97706", fontWeight: "600", fontSize: 13 }}>
            Sửa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete && onDelete(order)}>
          <Text style={{ color: "#DC2626", fontWeight: "600", fontSize: 13 }}>
            Xóa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
