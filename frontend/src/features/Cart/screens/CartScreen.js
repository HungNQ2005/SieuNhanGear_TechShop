import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../../../store/CartContext";
import { ROUTES } from "../../../constants/routes";
export default function CartScreen() {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>Giỏ hàng ({items.length})</Text>

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>

            <Text style={styles.emptyDescription}>
              Hãy thêm một số linh kiện tuyệt vời vào giỏ!
            </Text>

            <Pressable
              style={styles.shopButton}
              onPress={() => navigate(ROUTES.HOME)}
            >
              <Text style={styles.shopButtonText}>Khám phá sản phẩm</Text>
            </Pressable>
          </View>
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

      {items.length > 0 && (
        <View style={styles.right}>
          <CartSummary />
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  emptyTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 12,
  },

  emptyDescription: {
    fontSize: 18,
    color: "#64748b",
    marginBottom: 32,
    textAlign: "center",
  },

  shopButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },

  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
