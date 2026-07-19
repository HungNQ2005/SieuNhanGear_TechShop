import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_VOUCHER_STATUS_ACTIVE,
  TEXT_VOUCHER_STATUS_INACTIVE,
} from "../../../../../constants/i18nKeys";


export default function VoucherStatusBadge({
  status = "inactive",
}) {
  const { t } = useLocalization();

  let backgroundColor = "#E5E7EB";
  let textColor = "#374151";
  let label = status;


  switch (status) {

    case "active":
      backgroundColor = "#DCFCE7";
      textColor = "#15803D";
      label = t(TEXT_VOUCHER_STATUS_ACTIVE);
      break;


    case "inactive":
      backgroundColor = "#F3F4F6";
      textColor = "#6B7280";
      label = t(TEXT_VOUCHER_STATUS_INACTIVE);
      break;


    default:
      break;
  }


  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 12,
          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </View>
  );
}