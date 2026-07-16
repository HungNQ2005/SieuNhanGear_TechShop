import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_EDIT,
  TEXT_DELETE,
} from "../../../../../constants/i18nKeys";

import VoucherStatusBadge from "./VoucherStatusBadge";

function formatCurrency(value) {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return `${Number(value).toLocaleString("vi-VN")}đ`;
}

export default function VoucherRow({
  row = {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  const { t } = useLocalization();

  const discountValue =
    row.discountPercentage != null ? `${row.discountPercentage}%` : "-";

  const minOrder =
    row.minOrderValue != null ? formatCurrency(row.minOrderValue) : "-";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        minHeight: 64,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "#F3F4F6",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Voucher Code */}
      <View style={{ flex: 2 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#111827",
          }}
        >
          {row.code || "-"}
        </Text>
      </View>

      {/* Description */}
      <View style={{ flex: 3 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#374151",
          }}
          numberOfLines={2}
        >
          {row.description || "-"}
        </Text>
      </View>

      {/* Discount Value */}
      <View style={{ flex: 1.2 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#374151",
          }}
        >
          {discountValue}
        </Text>
      </View>

      {/* Minimum Order Value */}
      <View style={{ flex: 1.5 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#374151",
          }}
        >
          {minOrder}
        </Text>
      </View>

      {/* Status */}
      <View
        style={{
          flex: 1.5,
          alignItems: "flex-start",
        }}
      >
        <VoucherStatusBadge
          status={row.status}
        />
      </View>

      {/* Actions */}
      <View
        style={{
          flex: 1.2,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => onEdit(row)}
          style={{ marginRight: 14 }}
        >
          <Text
            style={{
              color: "#2563EB",
              fontWeight: "600",
            }}
          >
            {t(TEXT_EDIT)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(row)}
        >
          <Text
            style={{
              color: "#DC2626",
              fontWeight: "600",
            }}
          >
            {t(TEXT_DELETE)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
