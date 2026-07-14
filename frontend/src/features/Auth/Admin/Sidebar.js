import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.styles";
import { useLocalization } from "../../../providers/LocalizationProvider";
import { ROUTES } from "../../../constants/routes";
import {
  TEXT_ORDERS,
  TEXT_PRODUCTS_MENU,
  TEXT_INVENTORY,
  TEXT_VOUCHERS_MENU,
  TEXT_SETTINGS,
  TEXT_LOGOUT,
  TEXT_ADMIN_CONSOLE,
} from "../../../constants/i18nKeys";
import {
  IconShippingBox,
  IconGridOutline,
  IconWarehouse,
  IconTagOutline,
  IconSettingsGear,
  IconLogoutArrow,
} from "../../../constants/icons";

export default function Sidebar({ selected, onSelect }) {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      id: "orders",
      label: t(TEXT_ORDERS),
      route: ROUTES.ORDER_MANAGEMENT,
      icon: IconShippingBox,
    },
    {
      id: "products",
      label: t(TEXT_PRODUCTS_MENU),
      route: ROUTES.PRODUCT_MANAGEMENT,
      icon: IconGridOutline,
    },
    {
      id: "inventory",
      label: t(TEXT_INVENTORY),
      route: ROUTES.INVENTORY_MANAGEMENT,
      icon: IconWarehouse,
    },
    {
      id: "vouchers",
      label: t(TEXT_VOUCHERS_MENU),
      route: ROUTES.VOUCHER_MANAGEMENT,
      icon: IconTagOutline,
    },
  ];

  const activeId =
    selected ||
    menus.find((m) => location.pathname.startsWith(m.route))?.id ||
    "";

  const handleSelect = (item) => {
    if (onSelect) onSelect(item.id);
    navigate(item.route);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>Sieu Nhan Gear</Text>
          <Text style={styles.logoSubtitle}>{t(TEXT_ADMIN_CONSOLE)}</Text>
        </View>

        <View style={styles.menuSection}>
          {menus.map((item) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.activeMenu]}
                onPress={() => handleSelect(item)}
              >
                <Icon color={isActive ? "#2563EB" : "#6B7280"} size={18} />
                <Text
                  style={[
                    styles.menuText,
                    isActive && styles.activeText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.bottomItem}>
          <IconSettingsGear color="#6B7280" size={18} />
          <Text style={styles.bottomText}>{t(TEXT_SETTINGS)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}>
          <IconLogoutArrow color="#6B7280" size={18} />
          <Text style={styles.bottomText}>{t(TEXT_LOGOUT)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
