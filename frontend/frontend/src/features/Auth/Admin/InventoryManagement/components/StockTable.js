import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_COL_PRODUCT_NAME,
  TEXT_COL_STOCK_LEVEL,
  TEXT_COL_LAST_UPDATED,
  TEXT_COL_WAREHOUSE,
  TEXT_COL_ACTIONS,
  TEXT_NO_RESULTS,
} from "../../../../../constants/i18nKeys";
import StockRow from "./StockRow";

export default function StockTable({ rows, onRestock }) {
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
          {t(TEXT_COL_STOCK_LEVEL).toUpperCase()}
        </Text>
        <Text style={{ flex: 2, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_LAST_UPDATED).toUpperCase()}
        </Text>
        <Text style={{ flex: 2, fontWeight: "700", fontSize: 12, color: "#6B7280" }}>
          {t(TEXT_COL_WAREHOUSE).toUpperCase()}
        </Text>
        <Text
          style={{
            flex: 1,
            fontWeight: "700",
            fontSize: 12,
            color: "#6B7280",
            textAlign: "right",
          }}
        >
          {t(TEXT_COL_ACTIONS).toUpperCase()}
        </Text>
      </View>

      {rows.length === 0 ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
            {t(TEXT_NO_RESULTS)}
          </Text>
        </View>
      ) : (
        rows.map((row) => (
          <StockRow key={row.id} row={row} onRestock={onRestock} />
        ))
      )}
    </View>
  );
}
