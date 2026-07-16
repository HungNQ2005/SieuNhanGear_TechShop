import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_FILTER_BY_CATEGORY,
  TEXT_ALL_CATEGORIES,
  TEXT_ALL_WAREHOUSES,
  TEXT_SHOWING_ITEMS,
} from "../../../../../constants/i18nKeys";
import { IconFilter, IconMapPinSmall } from "../../../../../constants/icons";
import Dropdown from "./Dropdown";

export default function StockFilterBar({
  categories,
  warehouses,
  categoryFilter,
  warehouseFilter,
  onCategoryChange,
  onWarehouseChange,
  from,
  to,
  total,
}) {
  const { t } = useLocalization();

  const categoryOptions = [
    { value: "all", label: t(TEXT_ALL_CATEGORIES) },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const warehouseOptions = [
    { value: "all", label: t(TEXT_ALL_WAREHOUSES) },
    ...warehouses.map((w) => ({ value: w.id, label: w.name })),
  ];

  const showingText = t(TEXT_SHOWING_ITEMS)
    .replace("{{from}}", total === 0 ? 0 : from)
    .replace("{{to}}", to)
    .replace("{{total}}", total);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 16,
        zIndex: 10,
        elevation: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
        <Dropdown
          icon={<IconFilter />}
          label={t(TEXT_FILTER_BY_CATEGORY)}
          options={categoryOptions}
          value={categoryFilter}
          onChange={onCategoryChange}
        />
        <Dropdown
          icon={<IconMapPinSmall />}
          label={t(TEXT_ALL_WAREHOUSES)}
          options={warehouseOptions}
          value={warehouseFilter}
          onChange={onWarehouseChange}
        />
      </View>

      <Text style={{ color: "#6B7280", fontSize: 12, fontWeight: "600" }}>
        {showingText.toUpperCase()}
      </Text>
    </View>
  );
}
