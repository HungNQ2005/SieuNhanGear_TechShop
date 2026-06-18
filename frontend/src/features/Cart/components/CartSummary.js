import React from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useCart } from "../../../store/CartContext";
import { styles } from "./CartSummary.styles";

export default function CartSummary() {
  const { totalPrice } = useCart();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Tóm tắt đơn hàng
      </Text>

      <View style={styles.row}>
        <Text>Tạm tính</Text>
        <Text>{totalPrice.toLocaleString()}đ</Text>
      </View>

      <View style={styles.row}>
        <Text>Vận chuyển</Text>
        <Text style={styles.free}>Miễn phí</Text>
      </View>

      <View style={styles.line} />

<View style={styles.row}>
  <Text style={styles.total}>Tổng cộng</Text>

  <Text style={styles.total}>
    {totalPrice.toLocaleString()}đ
  </Text>
</View>

<Pressable style={styles.button}>
  <Text style={styles.buttonText}>
    Tiếp tục thanh toán
  </Text>
</Pressable>
</View>
);
}