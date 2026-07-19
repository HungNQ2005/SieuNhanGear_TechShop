import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_TAB_VIEW_STOCK,
  TEXT_TAB_STOCK_HISTORY,
  TEXT_TAB_LOW_STOCK_ALERTS,
} from "../../../../../constants/i18nKeys";

export default function InventoryTabs({ active, onChange, alertsCount }) {
  const { t } = useLocalization();

  const tabs = [
    { id: "view", label: t(TEXT_TAB_VIEW_STOCK) },
    { id: "history", label: t(TEXT_TAB_STOCK_HISTORY) },
    {
      id: "alerts",
      label: t(TEXT_TAB_LOW_STOCK_ALERTS),
      badge: alertsCount,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 20,
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderBottomWidth: 2,
              borderColor: isActive ? "#2563EB" : "transparent",
              marginBottom: -1,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                letterSpacing: 0.3,
                color: isActive ? "#2563EB" : "#6B7280",
              }}
            >
              {tab.label.toUpperCase()}
            </Text>
            {typeof tab.badge === "number" && tab.badge > 0 && (
              <View
                style={{
                  backgroundColor: "#DC2626",
                  borderRadius: 10,
                  paddingHorizontal: 7,
                  paddingVertical: 1,
                  minWidth: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}
                >
                  {tab.badge}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
