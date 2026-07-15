import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./AdminTopBar.styles";
import { useLocalization } from "../../../providers/LocalizationProvider";
import {
  IconSearchGray,
  IconBellOutline,
  IconHelpCircle,
  IconMoonToggle,
} from "../../../constants/icons";

export default function AdminTopBar({
  search,
  onSearchChange,
  searchPlaceholder,
  adminTag = "ADMIN",
  username = "Dev_SGN_01",
}) {
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <IconSearchGray />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder={searchPlaceholder}
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <IconBellOutline />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <IconHelpCircle />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <IconMoonToggle />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.profileWrap}>
          <View style={styles.profileTextWrap}>
            <Text style={styles.profileTag}>{adminTag}</Text>
            <Text style={styles.profileUsername}>{username}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {username.charAt(0).toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
