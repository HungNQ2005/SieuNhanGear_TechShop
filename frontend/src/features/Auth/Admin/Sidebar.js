import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Sidebar.styles";
import { useLocalization } from "../../../providers/LocalizationProvider";
import { TEXT_ORDERS } from "../../../constants/i18nKeys";
export default function Sidebar({ selected, onSelect }) {
  const { t } = useLocalization();
  const menus = [
    {
      id: "orders",
      label: t(TEXT_ORDERS),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SieuNhanGear</Text>

      {menus.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.menuItem, selected === item.id && styles.activeMenu]}
          onPress={() => onSelect(item.id)}
        >
          <Text
            style={[styles.menuText, selected === item.id && styles.activeText]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
