import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_LOW_STOCK_BANNER_TITLE,
  TEXT_LOW_STOCK_BANNER_SUBTITLE,
  TEXT_LOW_STOCK_EMPTY,
  TEXT_LOW_STOCK_EMPTY_SUBTITLE,
  TEXT_RESTOCK,
  TEXT_COL_WAREHOUSE,
} from "../../../../../constants/i18nKeys";
import { IconAlertTriangle, IconMapPinSmall } from "../../../../../constants/icons";
import StockLevelBadge from "./StockLevelBadge";

export default function LowStockAlertsView({ items, onRestock }) {
  const { t } = useLocalization();

  if (items.length === 0) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          padding: 48,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
          {t(TEXT_LOW_STOCK_EMPTY)}
        </Text>
        <Text style={{ fontSize: 13, color: "#9CA3AF", marginTop: 6 }}>
          {t(TEXT_LOW_STOCK_EMPTY_SUBTITLE)}
        </Text>
      </View>
    );
  }

  const urgentCount = items.filter((i) => i.status === "urgent").length;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 12,
          backgroundColor: "#FEF2F2",
          borderWidth: 1,
          borderColor: "#FCA5A5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <IconAlertTriangle />
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#991B1B", fontWeight: "700", fontSize: 14 }}>
            {t(TEXT_LOW_STOCK_BANNER_TITLE).replace(
              "{{count}}",
              String(items.length)
            )}
          </Text>
          <Text style={{ color: "#B91C1C", fontSize: 12, marginTop: 2 }}>
            {t(TEXT_LOW_STOCK_BANNER_SUBTITLE)}
            {urgentCount > 0
              ? `  ·  ${urgentCount} ${t("inventory.TEXT_STATUS_URGENT")}`
              : ""}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          overflow: "hidden",
        }}
      >
        {items.map((row, idx) => (
          <View
            key={row.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderTopWidth: idx === 0 ? 0 : 1,
              borderColor: "#F1F3F6",
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#111827" }}>
                {row.product?.name || "-"}
              </Text>
              <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                {row.category?.name || "-"}
              </Text>
            </View>

            <View style={{ flex: 2 }}>
              <StockLevelBadge quantity={row.quantity} status={row.status} />
            </View>

            <View style={{ flex: 2, flexDirection: "row", alignItems: "center", gap: 6 }}>
              <IconMapPinSmall />
              <View>
                <Text style={{ fontSize: 11, color: "#9CA3AF" }}>
                  {t(TEXT_COL_WAREHOUSE)}
                </Text>
                <Text style={{ fontSize: 13, color: "#111827" }}>
                  {row.warehouse?.name || "-"}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => onRestock(row)}
                style={{
                  backgroundColor: "#2563EB",
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>
                  {t(TEXT_RESTOCK)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
