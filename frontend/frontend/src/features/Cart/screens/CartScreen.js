
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../../../store/CartContext";
import { ROUTES } from "../../../constants/routes";
import { useLocalization } from "../../../providers/LocalizationProvider";
import {
  TEXT_CART_EMPTY,
  TEXT_CART_CONTINUE_SHOPPING,
  TEXT_CART_SUBLABEL,
  TEXT_CART_TITLE,
  TEXT_CART_TOTAL,
  TEXT_CART_CHECKOUT, 
  TEXT_CART_DESCRIPTION,
  TEXT_CART_PRODUCT,
} from "../../../constants/i18nKeys";
export default function CartScreen() {
  const { items, increaseQuantity, decreaseQuantity, removeItem, totalItems } = useCart();
  const navigate = useNavigate();
  const { t } = useLocalization();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{t(TEXT_CART_TITLE)} </Text>
        <Text style={styles.sublabel}>
          ( {totalItems} {t(TEXT_CART_PRODUCT)} )
        </Text>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>{t(TEXT_CART_EMPTY)}</Text>

            <Text style={styles.emptyDescription}>
              {t(TEXT_CART_DESCRIPTION)}
            </Text>

            <Pressable
              style={styles.shopButton}
              onPress={() => navigate(ROUTES.HOME)}
            >
              <Text style={styles.shopButtonText}>
                {t(TEXT_CART_CONTINUE_SHOPPING)}
              </Text>
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

  sublabel: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
    top: -30,
    left: 4,
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
