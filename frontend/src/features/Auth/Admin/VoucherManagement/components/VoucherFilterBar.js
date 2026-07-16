import React from "react";
import { View, Text } from "react-native";

import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_VOUCHER_STATUS,
  TEXT_VOUCHER_ALL,
  TEXT_SHOWING_ITEMS,
} from "../../../../../constants/i18nKeys";

import { IconFilter } from "../../../../../constants/icons";

import Dropdown from "../../InventoryManagement/components/Dropdown";

export default function VoucherFilterBar({
  statusFilter,
  onStatusChange,
  from,
  to,
  total,
}) {
  const { t } = useLocalization();

  const statusOptions = [
    { value: "all", label: t(TEXT_VOUCHER_ALL) },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
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
        marginBottom: 20,
        zIndex: 10,
        elevation: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
        <Dropdown
          icon={<IconFilter />}
          label={t(TEXT_VOUCHER_STATUS)}
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusChange}
        />
      </View>

      <Text style={{ color: "#6B7280", fontSize: 12, fontWeight: "600" }}>
        {showingText.toUpperCase()}
      </Text>
    </View>
  );
}
