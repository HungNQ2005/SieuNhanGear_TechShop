import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigate } from "react-router-dom";
import { API } from "../../../constants/apiURL";
import { ROUTES } from "../../../constants/routes";
import styles from "./UserDropdown.styles";

import { getAvatarUri } from "../../../utils/avatar";

export default function UserDropdown({ user, onClose, onLogout }) {
  const navigate = useNavigate();
  const avatarUri = getAvatarUri(user?.avatarURL);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatarImage}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
        )}

        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <Pressable
        style={styles.item}
        onPress={() => {
          navigate(ROUTES.PROFILE);
          onClose();
        }}
      >
        <Text style={styles.itemText}>👤 Hồ sơ</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() => {
          navigate(ROUTES.ORDER);
          onClose();
        }}
      >
        <Text style={styles.itemText}>📦 Đơn hàng</Text>
      </Pressable>

      {user.role === "sales_staff" && (
        <Pressable
          style={styles.item}
          onPress={() => {
            navigate(ROUTES.ORDER_MANAGEMENT);
            onClose();
          }}
        >
          <Text style={styles.itemText}>⚙️ Quản lý đơn hàng</Text>
        </Pressable>
      )}

      {user.role === "product_manager" && (
        <Pressable
          style={styles.item}
          onPress={() => {
            navigate(ROUTES.PRODUCT_MANAGEMENT);
            onClose();
          }}
        >
          <Text style={styles.itemText}>⚙️ Quản lý cửa hàng</Text>
        </Pressable>
      )}

      {user.role === "system_admin" && (
        <Pressable
          style={styles.item}
          onPress={() => {
            navigate(ROUTES.ADMIN_ACCOUNTS);
            onClose();
          }}
        >
          <Text style={styles.itemText}>⚙️ Hệ thống quản trị</Text>
        </Pressable>
      )}

      <View style={styles.divider} />

      <Pressable style={styles.item} onPress={onLogout}>
        <Text style={styles.logout}>🚪 Đăng xuất</Text>
      </Pressable>
    </View>
  );
}
