import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigate } from "react-router-dom";
import { API } from "../../../constants/apiURL";
import { ROUTES } from "../../../constants/routes";
import styles from "./UserDropdown.styles";

export default function UserDropdown({ user, onClose, onLogout }) {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user.avatarURL ? (
          <Image
            source={{ uri: `${API.BASE_API_URL}${user.avatarURL}` }}
            style={styles.avatarImage}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
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

      {user.role === "admin" && (
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

      <View style={styles.divider} />

      <Pressable style={styles.item} onPress={onLogout}>
        <Text style={styles.logout}>🚪 Đăng xuất</Text>
      </Pressable>
    </View>
  );
}
