import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_VOUCHER_TOTAL,
  TEXT_VOUCHER_ACTIVE,
  TEXT_VOUCHER_INACTIVE,
  TEXT_VOUCHER_USED,
} from "../../../../../constants/i18nKeys";


function StatisticCard({ title, value, color }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        padding: 18,
        marginHorizontal: 6,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#6B7280",
          marginBottom: 8,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          color,
        }}
      >
        {value}
      </Text>
    </View>
  );
}


export default function VoucherStatistics({
  total,
  active,
  inactive,
  used,
}) {
  const { t } = useLocalization();

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 24,
        marginBottom: 24,
        marginHorizontal: -6,
      }}
    >

      <StatisticCard
        title={t(TEXT_VOUCHER_TOTAL)}
        value={total}
        color="#111827"
      />


      <StatisticCard
        title={t(TEXT_VOUCHER_ACTIVE)}
        value={active}
        color="#16A34A"
      />


      <StatisticCard
        title={t(TEXT_VOUCHER_INACTIVE)}
        value={inactive}
        color="#6B7280"
      />


      <StatisticCard
        title={t(TEXT_VOUCHER_USED)}
        value={used}
        color="#2563EB"
      />

    </View>
  );
}