import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useLocalization } from "../../../providers/LocalizationProvider";
import {
  TEXT_CART_PRODUCT_COUNT,
} from "../../../constants/i18nKeys";
import { styles } from "./CartItem.styles";
import { API } from "../../../constants/apiURL";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { t } = useLocalization();
  if (!item) return null;

  const itemId = item.id || item._id;
  const imgPath = item.img_URL || item.image || "";
  const imageUri = imgPath
    ? (imgPath.startsWith("http") ? imgPath : `${API.BASE_API_URL}${imgPath.startsWith('/') ? imgPath.slice(1) : imgPath}`)
    : "https://via.placeholder.com/150";

  const price = Number(item.price) || 0;
  const qty = Number(item.quantity) || 1;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.brand}>
          {item.brand || ""} {item.brand && item.category ? "•" : ""} {item.category || ""}
        </Text>

        <View style={styles.quantityBox}>
          <Pressable style={styles.qtyBtn} onPress={() => onDecrease(itemId)}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>

          <Text style={styles.qtyText}>{qty}</Text>

          <Pressable style={styles.qtyBtn} onPress={() => onIncrease(itemId)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>
          {(price * qty).toLocaleString("vi-VN")}đ
        </Text>

        <Text style={styles.unitPrice}>
          {price.toLocaleString("vi-VN")}đ / {t(TEXT_CART_PRODUCT_COUNT)}
        </Text>
      </View>

      <Pressable style={styles.removeBtn} onPress={() => onRemove(itemId)}>
        <Text style={styles.removeText}>✕</Text>
      </Pressable>
    </View>
  );
}
