import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_COL_PRODUCT_NAME,
  TEXT_COL_WAREHOUSE,
  TEXT_COL_CHANGE,
  TEXT_COL_QUANTITY_AFTER,
  TEXT_COL_UPDATED_BY,
  TEXT_COL_NOTE,
  TEXT_HISTORY_TYPE_IMPORT,
  TEXT_HISTORY_TYPE_EXPORT,
  TEXT_HISTORY_TYPE_ADJUSTMENT,
  TEXT_NO_RESULTS,
} from "../../../../../constants/i18nKeys";

const TYPE_LABELS = {
  import: TEXT_HISTORY_TYPE_IMPORT,
  export: TEXT_HISTORY_TYPE_EXPORT,
  adjustment: TEXT_HISTORY_TYPE_ADJUSTMENT,
};

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function StockHistoryView({ rows }) {
  const { t } = useLocalization();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 14,
          paddingHorizontal: 20,
          backgroundColor: "#F9FAFB",
        }}
      >
        <Text style={{ flex: 3, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_PRODUCT_NAME).toUpperCase()}
        </Text>
        <Text style={{ flex: 2, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_WAREHOUSE).toUpperCase()}
        </Text>
        <Text style={{ flex: 1, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_CHANGE).toUpperCase()}
        </Text>
        <Text style={{ flex: 1, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_QUANTITY_AFTER).toUpperCase()}
        </Text>
        <Text style={{ flex: 2, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_UPDATED_BY).toUpperCase()}
        </Text>
        <Text style={{ flex: 3, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_NOTE).toUpperCase()}
        </Text>
      </View>

      {rows.length === 0 ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
            {t(TEXT_NO_RESULTS)}
          </Text>
        </View>
      ) : (
        rows.map((row, idx) => (
          <View
            key={row.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 14,
              paddingHorizontal: 20,
              borderTopWidth: idx === 0 ? 0 : 1,
              borderColor: "#F1F3F6",
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#111827" }}>
                {row.product?.name || "-"}
              </Text>
              <Text style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                {formatDate(row.date)} · {t(TYPE_LABELS[row.type] || TEXT_HISTORY_TYPE_ADJUSTMENT)}
              </Text>
            </View>
            <Text style={{ flex: 2, fontSize: 13, color: "#111827" }}>
              {row.warehouse?.name || "-"}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: "700",
                color: row.change >= 0 ? "#16A34A" : "#DC2626",
              }}
            >
              {row.change >= 0 ? `+${row.change}` : row.change}
            </Text>
            <Text style={{ flex: 1, fontSize: 13, color: "#111827" }}>
              {row.quantityAfter}
            </Text>
            <Text style={{ flex: 2, fontSize: 13, color: "#111827" }}>
              {row.updatedBy}
            </Text>
            <Text style={{ flex: 3, fontSize: 13, color: "#6B7280" }}>
              {row.note}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}
