import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigate } from "react-router-dom";
import { API } from "../../../constants/apiURL";
import { ROUTES } from "../../../constants/routes";
import styles from "./UserDropdown.styles";

import { getAvatarUri } from "../../../utils/avatar";
import { IconAvatar } from "../../../constants/icons";

export default function UserDropdown({ user, onClose, onLogout }) {
  const navigate = useNavigate();
  const avatarUri = getAvatarUri(user?.avatarURL);
  const role = String(user?.role || "").toLowerCase().trim();

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
            <IconAvatar color="#fff" size={18} />
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

      {role === "sales_staff" && (
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

      {role === "product_manager" && (
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

      {(role === "system_admin" || role === "admin") && (
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
