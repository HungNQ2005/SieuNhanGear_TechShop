import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  TEXT_ORDER_TRACKING_SUPPORT_TITLE,
} from "../../../constants/i18nKeys";
import { useLocalization } from "../../../providers/LocalizationProvider";
import styles from "../styles/SupportCard.style";

export default function SupportCard() {
  const { t } = useLocalization();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t(TEXT_ORDER_TRACKING_SUPPORT_TITLE)}
      </Text>

      <TouchableOpacity style={styles.item}>
        <Text>📞 Gọi Hotline</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text>⭐ Đánh giá đơn hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text>🔄 Đổi trả hàng</Text>
      </TouchableOpacity>
    </View>
  );
}