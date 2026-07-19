import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconPencilEdit, IconTrash } from "../../../../../../constants/icons";
import ProductThumb from "./ProductThumb";
import CategoryPill from "./CategoryPill";
import ProductStatusBadge from "./ProductStatusBadge";

function formatPrice(price) {
  return (price ?? 0).toLocaleString("vi-VN") + "đ";
}

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "#F1F3F6",
      }}
    >
      <View style={{ flex: 3.4, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <ProductThumb imgUrl={product.img_URL} />
        <View style={{ flexShrink: 1 }}>
          <Text style={{ fontSize: 14.5, fontWeight: "700", color: "#111827" }}>
            {product.name}
          </Text>
          {Boolean(product.subtitle) && (
            <Text style={{ fontSize: 12.5, color: "#9CA3AF", marginTop: 2 }}>
              {product.subtitle}
            </Text>
          )}
        </View>
      </View>

      <View style={{ flex: 1.8 }}>
        <CategoryPill label={product.categoryName || "—"} />
      </View>

      <View style={{ flex: 1.6 }}>
        <Text style={{ fontSize: 13.5, color: "#374151", fontWeight: "600" }}>
          {formatPrice(product.price)}
        </Text>
      </View>

      <View style={{ flex: 1.8 }}>
        <ProductStatusBadge status={product.status} />
      </View>

      <View style={{ flex: 1.2, flexDirection: "row", justifyContent: "flex-end", gap: 14 }}>
        <TouchableOpacity onPress={() => onEdit && onEdit(product)} style={{ padding: 4 }}>
          <IconPencilEdit />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete && onDelete(product)} style={{ padding: 4 }}>
          <IconTrash />
        </TouchableOpacity>
      </View>
    </View>
  );
}
