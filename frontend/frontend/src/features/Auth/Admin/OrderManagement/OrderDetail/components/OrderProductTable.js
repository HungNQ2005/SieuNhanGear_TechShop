import React from "react";
import { View, Text, Image } from "react-native";
import { API } from "../../../../../../constants/apiURL";

export default function OrderProductTable({ items }) {
  if (!items) return null;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          padding: 20,
        }}
      >
        Danh sách sản phẩm ({items.length})
      </Text>

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          backgroundColor: "#F9FAFB",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <Text style={{ flex: 4, fontWeight: "700" }}>
          Sản phẩm
        </Text>

        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          SL
        </Text>

        <Text
          style={{
            flex: 2,
            textAlign: "right",
            fontWeight: "700",
          }}
        >
          Đơn giá
        </Text>

        <Text
          style={{
            flex: 2,
            textAlign: "right",
            fontWeight: "700",
          }}
        >
          Thành tiền
        </Text>
      </View>

      {items.map((item) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#F3F4F6",
          }}
        >
          {/* Product */}
          <View
            style={{
              flex: 4,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: `${API.BASE_API_URL}/${item.img_URL}`,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 12,
                resizeMode: "contain",
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 12,
                }}
              >
                Product #{item.productId}
              </Text>
            </View>
          </View>

          {/* Quantity */}
          <Text
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            {item.quantity}
          </Text>

          {/* Price */}
          <Text
            style={{
              flex: 2,
              textAlign: "right",
            }}
          >
            {item.price.toLocaleString()}₫
          </Text>

          {/* Total */}
          <Text
            style={{
              flex: 2,
              textAlign: "right",
              fontWeight: "700",
            }}
          >
            {(item.price * item.quantity).toLocaleString()}₫
          </Text>
        </View>
      ))}
    </View>
  );
}