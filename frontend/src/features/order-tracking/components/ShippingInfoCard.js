import React from "react";
import { View, Text } from "react-native";
import {
  TEXT_ORDER_TRACKING_SHIPPING_INFO_TITLE,
  TEXT_ORDER_TRACKING_SHIPPING_COMPANY_LABEL,
  TEXT_ORDER_TRACKING_TRACKING_CODE_LABEL,
  TEXT_ORDER_TRACKING_ADDRESS_LABEL,
  TEXT_ORDER_TRACKING_PHONE_LABEL,
} from "../../../constants/i18nKeys";
import { useLocalization } from "../../../providers/LocalizationProvider";
import styles from "../styles/ShippingInfoCard.style";

export default function ShippingInfoCard({ order }) {
  const { t } = useLocalization();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t(TEXT_ORDER_TRACKING_SHIPPING_INFO_TITLE)}
      </Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>
            {t(TEXT_ORDER_TRACKING_SHIPPING_COMPANY_LABEL)}
          </Text>

          <Text style={styles.value}>{order.shippingCompany}</Text>
        </View>

        <View>
          <Text style={styles.label}>
            {t(TEXT_ORDER_TRACKING_TRACKING_CODE_LABEL)}
          </Text>

          <Text style={styles.value}>{order.trackingCode}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>
            {t(TEXT_ORDER_TRACKING_ADDRESS_LABEL)}
          </Text>

          <Text style={styles.value}>{order.address}</Text>
        </View>

        <View>
          <Text style={styles.label}>{t(TEXT_ORDER_TRACKING_PHONE_LABEL)}</Text>

          <Text style={styles.value}>{order.phone}</Text>
        </View>
      </View>
    </View>
  );
}
