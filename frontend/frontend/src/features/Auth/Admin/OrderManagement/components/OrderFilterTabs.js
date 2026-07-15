import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_ALL_ORDERS,
  TEXT_DASHBOARD_PROCESSING,
  TEXT_DASHBOARD_SHIPPING,
  TEXT_DASHBOARD_DELIVERED,
  TEXT_DASHBOARD_CANCELLED,
} from "../../../../../constants/i18nKeys";
export default function OrderFilterTabs({
  statusList,
  selected,
  onChange,
}) {
const { t } = useLocalization();

const statusName = {
  1: t(TEXT_DASHBOARD_PROCESSING),
  2: t(TEXT_DASHBOARD_SHIPPING),
  3: t(TEXT_DASHBOARD_DELIVERED),
  4: t(TEXT_DASHBOARD_CANCELLED),
  
};
const tabs = [
  {
    id: 0,
    name: t(TEXT_ALL_ORDERS),
  },
  ...statusList.map((item) => ({
    ...item,
    name: statusName[item.id] || item.name,
  })),
];
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {tabs.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onChange(item.id)}
          style={{
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 8,
            backgroundColor:
              selected === item.id
                ? "#2563EB"
                : "#E5E7EB",
            marginRight: 12,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color:
                selected === item.id
                  ? "#fff"
                  : "#111827",
              fontWeight: "600",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}