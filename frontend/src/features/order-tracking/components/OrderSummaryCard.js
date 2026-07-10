import React from "react";
import { View, Text, Image } from "react-native";
import {
  TEXT_CART_SUBTOTAL,
  TEXT_CART_SHIPPING,
  TEXT_CART_FREE_SHIPPING,
  TEXT_CART_TOTAL,
  TEXT_ORDER_TRACKING_PRODUCTS,
} from "../../../constants/i18nKeys";
import styles from "../styles/OrderSummaryCard.style";
import { API } from "../../../constants/apiURL";
import { useLocalization } from "../../../providers/LocalizationProvider";
export default function OrderSummaryCard({ order }) {
  
  const { t } = useLocalization();
  if (!order) return null;
  const subtotal =
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const shipping = 0;

  const total = subtotal + shipping;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t(TEXT_ORDER_TRACKING_PRODUCTS)} ({order.items?.length || 0})</Text>

      {order.items?.map((item) => (
        <View key={item.id} style={styles.product}>
          <Image
            source={{
              uri: `${API.BASE_API_URL}/${item.image}`
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text style={styles.brand}>{item.brand}</Text>

            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.spec}>{item.specs}</Text>

            <Text style={styles.qty}>x{item.quantity}</Text>
          </View>

          <Text style={styles.price}>{item.price?.toLocaleString()}đ</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>{t(TEXT_CART_SUBTOTAL)}</Text>

        <Text style={styles.value}>{subtotal.toLocaleString()}đ</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{t(TEXT_CART_SHIPPING)}</Text>

        <Text style={styles.free}>{t(TEXT_CART_FREE_SHIPPING)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.total}>{t(TEXT_CART_TOTAL)}</Text>

        <Text style={styles.totalPrice}>{total.toLocaleString()}đ</Text>
      </View>
    </View>
  );

}
