import React from "react";
import { View, Text, TextInput } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_INVENTORY_TITLE,
  TEXT_INVENTORY_SUBTITLE,
  TEXT_INVENTORY_SEARCH_PLACEHOLDER,
} from "../../../../../constants/i18nKeys";
import { IconSearchGray } from "../../../../../constants/icons";

export default function InventoryHeader({
  warehouseCount,
  search,
  onSearchChange,
}) {
  const { t } = useLocalization();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 10,
          backgroundColor: "#fff",
          paddingHorizontal: 14,
          paddingVertical: 10,
          marginBottom: 24,
          maxWidth: 420,
        }}
      >
        <IconSearchGray />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder={t(TEXT_INVENTORY_SEARCH_PLACEHOLDER)}
          placeholderTextColor="#9CA3AF"
          style={{
            marginLeft: 10,
            flex: 1,
            fontSize: 14,
            color: "#111827",
            outlineStyle: "none",
          }}
        />
      </View>

      <Text style={{ fontSize: 24, fontWeight: "800", color: "#111827" }}>
        {t(TEXT_INVENTORY_TITLE)}
      </Text>
      <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
        {t(TEXT_INVENTORY_SUBTITLE).replace("{{count}}", warehouseCount)}
      </Text>
    </View>
  );
}
