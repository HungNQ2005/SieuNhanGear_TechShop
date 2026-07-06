import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useLocalization } from "../../../providers/LocalizationProvider";
import {
  TEXT_CART_PRODUCT,
  TEXT_CART_PRODUCT_COUNT,
} from "../../../constants/i18nKeys";
import { styles } from "./CartItem.styles";
import { API } from "../../../constants/apiURL";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    const { t } = useLocalization();
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: API.BASE_API_URL + item.img_URL,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.brand}>
          {item.brand} • {item.category}
        </Text>

        <View style={styles.quantityBox}>
          <Pressable style={styles.qtyBtn} onPress={() => onDecrease(item.id)}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>

          <Text style={styles.qtyText}>{item.quantity}</Text>

          <Pressable style={styles.qtyBtn} onPress={() => onIncrease(item.id)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>
          {(item.price * item.quantity).toLocaleString()}đ
        </Text>

        <Text style={styles.unitPrice}>
          {item.price.toLocaleString()}đ / 
          {t(TEXT_CART_PRODUCT_COUNT)}
        </Text>
      </View>

      <Pressable style={styles.removeBtn} onPress={() => onRemove(item.id)}>
        <Text style={styles.removeText}>✕</Text>
      </Pressable>
    </View>
  );
}
