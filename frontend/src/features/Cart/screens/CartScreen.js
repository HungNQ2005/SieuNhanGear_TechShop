import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../../../store/CartContext";

export default function CartScreen() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>
          Giỏ hàng ({items.length})
        </Text>

        {items.length === 0 ? (
          <Text style={styles.emptyText}>
            Giỏ hàng đang trống
          </Text>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          ))
        )}
      </View>

      <View style={styles.right}>
        <CartSummary />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    maxWidth: 1400,
    width: "100%",
    alignSelf: "center",
    padding: 32,
    gap: 24,
  },

  left: {
    flex: 3,
  },

  right: {
    flex: 1,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 32,
    color: "#0f172a",
  },

  emptyText: {
    fontSize: 18,
    color: "#64748b",
  },
});