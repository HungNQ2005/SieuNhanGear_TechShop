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
import { useLocalization } from "../../../providers/LocalizationProvider";

const resolveImageUri = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.replace(/\\/g, "/");
  const formatted = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `http://localhost:3521${formatted}`;
};

export default function OrderSummaryCard({ order }) {
  const { t } = useLocalization();
  if (!order) return null;
  
  const items = order.items || [];
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0) || Number(order.total) || 0;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t(TEXT_ORDER_TRACKING_PRODUCTS)} ({items.length})
      </Text>

      {items.map((item, idx) => (
        <View key={item.id || idx} style={styles.product}>
          <Image
            source={{
              uri: resolveImageUri(item.image || item.img_URL),
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            {item.brand ? <Text style={styles.brand}>{item.brand}</Text> : null}
            <Text style={styles.name}>{item.name || item.productName || "Sản phẩm"}</Text>
            {item.specs ? <Text style={styles.spec}>{item.specs}</Text> : null}
            <Text style={styles.qty}>x{item.quantity || 1}</Text>
          </View>

          <Text style={styles.price}>{(Number(item.price) || 0).toLocaleString()}đ</Text>
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
