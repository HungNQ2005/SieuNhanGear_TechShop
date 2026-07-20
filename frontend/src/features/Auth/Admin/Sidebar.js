import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.styles";
import { useLocalization } from "../../../providers/LocalizationProvider";
import { ROUTES } from "../../../constants/routes";
import {
  TEXT_ORDERS,
  TEXT_PRODUCTS_MENU,
  TEXT_SPECIFICATIONS_MENU,
  TEXT_CATEGORIES_MENU,
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
  IconChevronDownGray,
} from "../../../constants/icons";

export default function Sidebar({ selected, onSelect }) {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const location = useLocation();

  const productChildren = [
    {
      id: "specifications",
      label: t(TEXT_SPECIFICATIONS_MENU),
      route: ROUTES.PRODUCT_SPECIFICATIONS,
    },
    {
      id: "categories",
      label: t(TEXT_CATEGORIES_MENU),
      route: ROUTES.PRODUCT_CATEGORIES,
    },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userRole = user ? user.role : "";

  const menus = [
    {
      id: "orders",
      label: t(TEXT_ORDERS),
      route: ROUTES.ORDER_MANAGEMENT,
      icon: IconShippingBox,
      allowedRoles: ["sales_staff", "system_admin"],
    },
    {
      id: "products",
      label: t(TEXT_PRODUCTS_MENU),
      route: ROUTES.PRODUCT_MANAGEMENT,
      icon: IconGridOutline,
      children: productChildren,
      allowedRoles: ["product_manager", "system_admin"],
    },
    {
      id: "inventory",
      label: t(TEXT_INVENTORY),
      route: ROUTES.INVENTORY_MANAGEMENT,
      icon: IconWarehouse,
      allowedRoles: ["product_manager", "system_admin"],
    },
    {
      id: "vouchers",
      label: t(TEXT_VOUCHERS_MENU),
      route: ROUTES.VOUCHER_MANAGEMENT,
      icon: IconTagOutline,
      allowedRoles: ["product_manager", "system_admin"],
    },
  ].filter((item) => item.allowedRoles.includes(userRole));

  const activeChildId = productChildren.find((c) =>
    location.pathname.startsWith(c.route)
  )?.id;

  const activeId =
    selected ||
    (activeChildId ? "products" : null) ||
    menus.find((m) => location.pathname.startsWith(m.route))?.id ||
    "";

  const [expanded, setExpanded] = useState(() => ({
    products: activeId === "products" || Boolean(activeChildId),
  }));

  const handleSelect = (item) => {
    if (item.children) {
      setExpanded((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
      // CHANGED (merged from product-management-feature): parent items with
      // children (e.g. "Products") now own a real page of their own, so
      // clicking the parent navigates there directly instead of jumping
      // straight into the first child.
      if (onSelect) onSelect(item.id);
      navigate(item.route);
      return;
    }
    if (onSelect) onSelect(item.id);
    navigate(item.route);
  };

  const handleSelectChild = (parentId, child) => {
    if (onSelect) onSelect(child.id);
    navigate(child.route);
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
            const isActive = activeId === item.id && !item.children;
            const isParentActive = item.children && activeId === item.id;
            const Icon = item.icon;
            const isOpen = Boolean(item.children) && Boolean(expanded[item.id]);

            return (
              <View key={item.id}>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    (isActive || isParentActive) && styles.activeMenu,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Icon
                    color={isActive || isParentActive ? "#2563EB" : "#6B7280"}
                    size={18}
                  />
                  <Text
                    style={[
                      styles.menuText,
                      (isActive || isParentActive) && styles.activeText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.children && (
                    <View
                      style={{
                        marginLeft: "auto",
                        transform: [{ rotate: isOpen ? "0deg" : "-90deg" }],
                      }}
                    >
                      <IconChevronDownGray
                        color={isParentActive ? "#2563EB" : "#9CA3AF"}
                        size={12}
                      />
                    </View>
                  )}
                </TouchableOpacity>

                {item.children && isOpen && (
                  <View style={styles.submenuSection}>
                    {item.children.map((child) => {
                      const isChildActive = activeChildId
                        ? activeChildId === child.id
                        : location.pathname.startsWith(child.route);
                      return (
                        <TouchableOpacity
                          key={child.id}
                          style={[
                            styles.submenuItem,
                            isChildActive && styles.submenuItemActive,
                          ]}
                          onPress={() => handleSelectChild(item.id, child)}
                        >
                          <Text
                            style={[
                              styles.submenuText,
                              isChildActive && styles.submenuTextActive,
                            ]}
                          >
                            {child.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
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
