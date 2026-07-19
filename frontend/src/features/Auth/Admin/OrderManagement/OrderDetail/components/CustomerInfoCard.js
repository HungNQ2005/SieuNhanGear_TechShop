import React from "react";
import { View, Text } from "react-native";

export default function CustomerInfoCard({ customer }) {
  if (!customer) return null;

  const initials = customer.customerName
    ?.split(" ")
    .map((word) => word[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Thông tin khách hàng
      </Text>

      {/* Avatar + Tên */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#2563EB",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {initials}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {customer.customerName}
          </Text>

          <Text
            style={{
              color: "#6B7280",
            }}
          >
            {customer.email || "Chưa có email"}
          </Text>
        </View>
      </View>

      <InfoItem title="Số điện thoại" value={customer.phone} />

      <InfoItem title="Địa chỉ giao hàng" value={customer.address} />
    </View>
  );
}

function InfoItem({ title, value }) {
  return (
    <View
      style={{
        marginBottom: 18,
      }}
    >
      <Text
        style={{
          color: "#6B7280",
          fontSize: 13,
          marginBottom: 5,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontWeight: "500",
        }}
      >
        {value}
      </Text>
    </View>
  );
}