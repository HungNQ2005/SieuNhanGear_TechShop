import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { IconClose } from "../../../../../constants/icons";

function formatPrice(price) {
  return (price ?? 0).toLocaleString("vi-VN") + "đ";
}

export default function ProductDetailModal({ product, visible, onClose }) {
  if (!product) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 580,
            backgroundColor: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            maxHeight: "90%",
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 25,
            elevation: 8,
          }}
        >
          {/* Header modal */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingVertical: 18,
              borderBottomWidth: 1,
              borderColor: "#E5E7EB",
              backgroundColor: "#F8FAFC",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "700", color: "#0F172A" }}>
              Thông tin chi tiết sản phẩm
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
              <IconClose color="#64748B" size={20} />
            </TouchableOpacity>
          </View>

          {/* Noi dung modal */}
          <ScrollView contentContainerStyle={{ padding: 24 }}>
            <View style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 12,
                  backgroundColor: "#F1F5F9",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                }}
              >
                {product.img_URL ? (
                  <Image
                    source={{ uri: product.img_URL }}
                    style={{ width: 120, height: 120 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={{ color: "#94A3B8", fontSize: 13 }}>Không có ảnh</Text>
                )}
              </View>

              <View style={{ flex: 1, justifyContent: "center", gap: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#0F172A" }}>
                  {product.name || "Chưa có tên"}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#2563EB" }}>
                  {formatPrice(product.price)}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ fontSize: 13, color: "#64748B" }}>
                    Tồn kho: <Text style={{ fontWeight: "700", color: "#0F172A" }}>{product.stock ?? 0}</Text>
                  </Text>
                  <Text style={{ fontSize: 13, color: "#64748B" }}>|</Text>
                  <Text style={{ fontSize: 13, color: "#64748B" }}>
                    Đánh giá: <Text style={{ fontWeight: "700", color: "#D97706" }}>★ {product.rating || "5.0"}</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Chi tiet thong tin */}
            <View style={{ backgroundColor: "#F8FAFC", borderRadius: 12, padding: 16, gap: 12, marginBottom: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 13, color: "#64748B" }}>Mã sản phẩm (ID):</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#0F172A" }}>#{product.id}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 13, color: "#64748B" }}>Danh mục ID:</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#0F172A" }}>
                  {product.category_id || product.categoryName || "-"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 13, color: "#64748B" }}>Nhà sản xuất ID:</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#0F172A" }}>
                  {product.manufacturer_id || "-"}
                </Text>
              </View>
            </View>

            {/* Mo ta san pham */}
            <View>
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#0F172A", marginBottom: 8 }}>
                Mô tả sản phẩm
              </Text>
              <Text style={{ fontSize: 13.5, color: "#334155", lineHeight: 20 }}>
                {product.description || "Chưa có thông tin mô tả chi tiết cho sản phẩm này."}
              </Text>
            </View>
          </ScrollView>

          {/* Footer modal */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              borderTopWidth: 1,
              borderColor: "#E5E7EB",
              backgroundColor: "#F8FAFC",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "#1E293B",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 13 }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
