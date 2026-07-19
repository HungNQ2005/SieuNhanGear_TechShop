import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import {
  TEXT_ORDER_TRACKING_TITLE,
  TEXT_ORDER_TRACKING_SUBTITLE,
  TEXT_ORDER_TRACKING_INPUT_PLACEHOLDER,
  TEXT_ORDER_TRACKING_BUTTON,
  TEXT_ORDER_TRACKING_HELPER,
} from "../../../constants/i18nKeys";
import { useLocalization } from "../../../providers/LocalizationProvider";
import styles from "../styles/OrderTrackingHeader.style";

export default function OrderTrackingHeader({
  orderCode,
  setOrderCode,
  onSearch,
}) {
  const { t } = useLocalization();
  return (
    <View style={styles.card}>
      <View style={styles.headingRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LIVE</Text>
        </View>

        <Text style={styles.title}>{t(TEXT_ORDER_TRACKING_TITLE)}</Text>
      </View>

      <Text style={styles.subtitle}>{t(TEXT_ORDER_TRACKING_SUBTITLE)}</Text>

      <View style={styles.searchRow}>
        <TextInput
          value={orderCode}
          onChangeText={setOrderCode}
          placeholder={t(TEXT_ORDER_TRACKING_INPUT_PLACEHOLDER)}
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={onSearch}
          activeOpacity={0.9}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{t(TEXT_ORDER_TRACKING_BUTTON)}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.helperText}>{t(TEXT_ORDER_TRACKING_HELPER)}</Text>
    </View>
  );
}
