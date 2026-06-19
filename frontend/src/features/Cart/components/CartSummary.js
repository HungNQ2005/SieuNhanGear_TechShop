import React from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../../../providers/LocalizationProvider";
import { useCart } from "../../../store/CartContext";
import { styles } from "./CartSummary.styles";
import {
  TEXT_CART_FREE_SHIPPING,
  TEXT_CART_GRAND_TOTAL,
  TEXT_CART_PROCEED_CHECKOUT,
  TEXT_CART_SHIPPING,
  TEXT_CART_SUBTOTAL,
  TEXT_CART_SUMMARY_TITLE,
} from "../../../constants/i18nKeys";
export default function CartSummary() {
  const { totalPrice } = useCart();
  const { t } = useLocalization();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t(TEXT_CART_SUMMARY_TITLE)}
      </Text>

      <View style={styles.row}>
        <Text>{t(TEXT_CART_SUBTOTAL)}</Text>
        <Text>{totalPrice.toLocaleString()}đ</Text>
      </View>

      <View style={styles.row}>
        <Text>{t(TEXT_CART_SHIPPING)}</Text>
        <Text style={styles.free}>{t(TEXT_CART_FREE_SHIPPING)}</Text>
      </View>

      <View style={styles.line} />

<View style={styles.row}>
  <Text style={styles.total}>{t(TEXT_CART_GRAND_TOTAL)}</Text>

  <Text style={styles.total}>
    {totalPrice.toLocaleString()}đ
  </Text>
</View>

<Pressable style={styles.button}>
  <Text style={styles.buttonText}>
    {t(TEXT_CART_PROCEED_CHECKOUT)}
  </Text>
</Pressable>
</View>
);
}