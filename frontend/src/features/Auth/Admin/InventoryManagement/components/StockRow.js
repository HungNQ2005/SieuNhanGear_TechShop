import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import { TEXT_RESTOCK } from "../../../../../constants/i18nKeys";
import { IconMapPinSmall } from "../../../../../constants/icons";
import StockLevelBadge from "./StockLevelBadge";

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function StockRow({ row, onRestock, onViewDetail }) {
  const { t } = useLocalization();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "#F1F3F6",
      }}
    >
      <TouchableOpacity
        style={{ flex: 3, flexDirection: "row", alignItems: "center", gap: 12 }}
        onPress={() => onViewDetail && onViewDetail(row.product || row)}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: "#F3F4F6",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {row.product?.img_URL ? (
            <Image
              source={{ uri: row.product.img_URL }}
              style={{ width: 40, height: 40 }}
              resizeMode="cover"
            />
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 14, fontWeight: "700", color: "#111827", textDecorationLine: "underline" }}
            numberOfLines={2}
          >
            {row.product?.name || "-"}
          </Text>
          <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
            {row.category?.name || "-"}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ flex: 2 }}>
        <StockLevelBadge quantity={row.quantity} status={row.status} />
      </View>

      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 13, color: "#111827" }}>
          {formatDate(row.lastUpdated)}
        </Text>
        <Text style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
          {row.updatedBy}
        </Text>
      </View>

      <View style={{ flex: 2, flexDirection: "row", alignItems: "center", gap: 6 }}>
        <IconMapPinSmall />
        <Text style={{ fontSize: 13, color: "#111827" }}>
          {row.warehouse?.name || "-"}
        </Text>
      </View>

      <View style={{ flex: 1.5, flexDirection: "row", justifyContent: "flex-end", gap: 12 }}>
        <TouchableOpacity onPress={() => onViewDetail && onViewDetail(row.product || row)}>
          <Text style={{ color: "#4B5563", fontWeight: "600", fontSize: 12.5 }}>
            Chi tiết
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRestock(row)}>
          <Text style={{ color: "#2563EB", fontWeight: "700", fontSize: 13 }}>
            {t(TEXT_RESTOCK)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
