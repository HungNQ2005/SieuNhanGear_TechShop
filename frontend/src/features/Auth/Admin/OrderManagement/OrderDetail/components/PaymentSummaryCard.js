import React from "react";
import { View, Text } from "react-native";

export default function PaymentSummaryCard({ order, items }) {
  if (!order) return null;

  const subtotal =
    items?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  const shipping = 0;

  const total = subtotal + shipping;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Thanh toán
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text>Tạm tính</Text>

        <Text>{subtotal.toLocaleString()}₫</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text>Phí vận chuyển</Text>

        <Text
          style={{
            color: "#10B981",
            fontWeight: "600",
          }}
        >
          Miễn phí
        </Text>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          marginVertical: 16,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          Tổng cộng
        </Text>

        <Text
          style={{
            color: "#2563EB",
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          {total.toLocaleString()}₫
        </Text>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 16,
        }}
      >
        <Text
          style={{
            color: "#6B7280",
            marginBottom: 4,
          }}
        >
          Phương thức thanh toán
        </Text>

        <Text
          style={{
            fontWeight: "600",
            marginBottom: 16,
          }}
        >
          {order.paymentMethod}
        </Text>

        <Text
          style={{
            color: "#6B7280",
            marginBottom: 4,
          }}
        >
          Trạng thái thanh toán
        </Text>

        <Text
          style={{
            color:
              order.paymentStatus === "Paid"
                ? "#10B981"
                : "#F59E0B",
            fontWeight: "700",
          }}
        >
          {order.paymentStatus}
        </Text>
      </View>
    </View>
  );
}