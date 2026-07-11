import React from "react";
import { View, Text } from "react-native";

const STEPS = [
  "Đặt hàng",
  "Thanh toán",
  "Đang xử lý",
  "Đang giao",
  "Hoàn tất",
];

export default function OrderTimelineCard() {
  const currentStep = 2;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 24,
        }}
      >
        Trạng thái đơn hàng
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {STEPS.map((step, index) => (
          <React.Fragment key={step}>
            <View style={{ alignItems: "center", width: 90 }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor:
                    index <= currentStep ? "#2563EB" : "#D1D5DB",
                }}
              />
              <Text style={{ marginTop: 8, fontSize: 12, textAlign: "center" }}>
                {step}
              </Text>
            </View>

            {index < STEPS.length - 1 && (
              <View
                style={{
                  flex: 1,
                  height: 3,
                  backgroundColor:
                    index < currentStep ? "#2563EB" : "#D1D5DB",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}