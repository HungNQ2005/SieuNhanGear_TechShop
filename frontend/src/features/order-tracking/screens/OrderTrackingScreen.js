import React, { useState } from "react";

import { View, ScrollView, Text, Alert } from "react-native";
import { useLocalization } from "../../../providers/LocalizationProvider";
import OrderTrackingHeader from "../components/OrderTrackingHeader";
import ShippingInfoCard from "../components/ShippingInfoCard";
import OrderTimelineCard from "../components/OrderTimelineCard";
import OrderSummaryCard from "../components/OrderSummaryCard";
import SupportCard from "../components/SupportCard";
import { getOrderByCode } from "../../../services/api";
import {
  TEXT_ORDER_TRACKING_TITLE,
  TEXT_ORDER_TRACKING_EMPTY_TITLE,
  TEXT_ORDER_TRACKING_EMPTY_DESCRIPTION,
} from "../../../constants/i18nKeys";
import styles from "../styles/OrderTrackingScreen.style";

export default function OrderTrackingScreen() {
  const { t } = useLocalization();
  const [orderCode, setOrderCode] = useState("");

  const [order, setOrder] = useState(null);
  const handleSearch = async () => {
    if (!orderCode.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập mã đơn");

      return;
    }

    const result = await getOrderByCode(orderCode.trim());

    if (!result) {
      Alert.alert("Không tìm thấy", "Mã đơn không tồn tại");

      setOrder(null);

      return;
    }

    setOrder(result);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <OrderTrackingHeader
        orderCode={orderCode}
        setOrderCode={setOrderCode}
        onSearch={handleSearch}
      />

      <View style={styles.content}>
        {order ? (
          <>
            <View style={styles.left}>
              <ShippingInfoCard order={order} />
              <OrderTimelineCard order={order} />
            </View>

            <View style={styles.right}>
              <OrderSummaryCard order={order} />
              <SupportCard />
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Text style={styles.emptyIcon}>📦</Text>
            </View>

            <Text style={styles.emptyTitle}>{t(TEXT_ORDER_TRACKING_EMPTY_TITLE)}</Text>

            <Text style={styles.emptyDescription}>
              {t(TEXT_ORDER_TRACKING_EMPTY_DESCRIPTION)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
