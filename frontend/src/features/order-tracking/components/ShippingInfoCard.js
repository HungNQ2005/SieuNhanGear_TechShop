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

const getShippingCompanyName = (company, id) => {
  if (company && typeof company === "string" && company.trim()) return company;
  if (company && typeof company === "object" && company.name) return company.name;
  switch (Number(id)) {
    case 1: return "Viettel Post";
    case 2: return "Giao hàng Nhanh (GHN)";
    case 3: return "Giao hàng Tiết kiệm (GHTK)";
    default: return "Giao hàng Nhanh (GHN)";
  }
};

export default function ShippingInfoCard({ order }) {
  const { t } = useLocalization();
  const companyName = getShippingCompanyName(order.shippingCompany, order.shippingCompanyId);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t(TEXT_ORDER_TRACKING_SHIPPING_INFO_TITLE)}
      </Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            {t(TEXT_ORDER_TRACKING_SHIPPING_COMPANY_LABEL)}
          </Text>

          <Text style={styles.value}>{companyName}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            {t(TEXT_ORDER_TRACKING_TRACKING_CODE_LABEL)}
          </Text>

          <Text style={styles.value}>{order.trackingCode || `VN${order.id || Date.now()}`}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            {t(TEXT_ORDER_TRACKING_ADDRESS_LABEL)}
          </Text>

          <Text style={styles.value}>{order.address || "Chưa cập nhật"}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{t(TEXT_ORDER_TRACKING_PHONE_LABEL)}</Text>

          <Text style={styles.value}>{order.phone || "Chưa cập nhật"}</Text>
        </View>
      </View>
    </View>
  );
}
