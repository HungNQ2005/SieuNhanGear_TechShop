import React from "react";
import { View, Text } from "react-native";

export default function OrderDetailHeader({ order, statusList }) {
  if (!order) return null;

  const status = statusList.find(
    (item) => item.id === order.statusId
  );

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            {order.code}
          </Text>

          <Text
            style={{
              color: "#6B7280",
              marginTop: 6,
            }}
          >
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: status?.color || "#D1D5DB",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            {status?.name}
          </Text>
        </View>
      </View>
    </View>
  );
}