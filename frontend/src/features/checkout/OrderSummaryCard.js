import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  TEXT_CHECKOUT_ORDER_TITLE,
  TEXT_CHECKOUT_SUBTOTAL,
  TEXT_CHECKOUT_SHIPPING_FEE,
  TEXT_CHECKOUT_DISCOUNT_LABEL,
  TEXT_CHECKOUT_TOTAL,
  TEXT_CHECKOUT_PLACE_ORDER,
} from "../../constants/i18nKeys";

export default function OrderSummaryCard({
  styles,
  t,
  safeItems,
  subtotal,
  shippingFee,
  discountAmount,
  appliedVoucher,
  total,
  submitting,
  handleCheckout,
}) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>{t(TEXT_CHECKOUT_ORDER_TITLE)}</Text>

      <View style={styles.itemsContainer}>
        {safeItems.map((item) => (
          <View key={item.id} style={styles.summaryItem}>
            <View style={styles.itemContent}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name || `Sản phẩm #${item.id}`}
              </Text>

              <Text style={styles.itemQuantity}>x{item.quantity || 1}</Text>
            </View>

            <Text style={styles.itemPrice}>
              {(item.price * (item.quantity || 1)).toLocaleString()}đ
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{t(TEXT_CHECKOUT_SUBTOTAL)}</Text>

        <Text style={styles.summaryValue}>{subtotal.toLocaleString()}đ</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{t(TEXT_CHECKOUT_SHIPPING_FEE)}</Text>

        <Text style={styles.summaryValue}>{shippingFee.toLocaleString()}đ</Text>
      </View>

      {appliedVoucher && discountAmount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            {t(TEXT_CHECKOUT_DISCOUNT_LABEL)}
            <Text style={styles.discountCodeLabel}>
              ({appliedVoucher.code})
            </Text>
          </Text>

          <Text style={[styles.summaryValue, styles.discountValue]}>
            -{discountAmount.toLocaleString()}đ
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{t(TEXT_CHECKOUT_TOTAL)}</Text>

        <Text style={styles.totalPrice}>{total.toLocaleString()}đ</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          submitting && styles.checkoutButtonDisabled,
        ]}
        onPress={handleCheckout}
        disabled={submitting}
      >
        <Text style={styles.checkoutButtonText}>
          {submitting ? "Đang xử lý..." : t(TEXT_CHECKOUT_PLACE_ORDER)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
