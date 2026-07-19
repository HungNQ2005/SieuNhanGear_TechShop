import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";
import { IconCustomers, IconStore } from "../../../../constants/icons";
import { ROUTES } from "../../../../constants/routes";
import { styles } from "./Sidebar.styles";
import { useLocalization } from "../../../../providers/LocalizationProvider";
import {
  TEXT_ADMIN_SYSTEM,
  TEXT_ADMIN_SYSTEM_SUBTITLE,
  TEXT_MENU_ACCOUNT,
  TEXT_MENU_SHOWROOM,
} from "../../../../constants/i18nKeys";

const MENUS = [
  {
    id: "account",
    title: TEXT_MENU_ACCOUNT,
    route: ROUTES.ADMIN_ACCOUNTS,
    Icon: IconCustomers,
  },
  {
    id: "showroom",
    title: TEXT_MENU_SHOWROOM,
    route: ROUTES.ADMIN_SHOWROOM,
    Icon: IconStore,
  },
];

export default function Sidebar() {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Text style={styles.logo}>{t(TEXT_ADMIN_SYSTEM)}</Text>
        <Text style={styles.subLogo}>{t(TEXT_ADMIN_SYSTEM_SUBTITLE)}</Text>
      </View>

      <View style={styles.menu}>
        {MENUS.map(({ id, title, route, Icon }) => {
          const active = location.pathname === route;

          return (
            <Pressable
              key={id}
              style={[styles.menuItem, active && styles.menuItemActive]}
              onPress={() => navigate(route)}
            >
              <View style={styles.icon}>
                <Icon size={18} color={active ? "#2563EB" : "#6B7280"} />
              </View>

              <Text style={[styles.menuText, active && styles.menuTextActive]}>
                <Text>{t(title)}</Text>
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
