import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_VOUCHER_TITLE,
  TEXT_VOUCHER_SUBTITLE,
  TEXT_VOUCHER_SEARCH,
  TEXT_VOUCHER_CREATE,
} from "../../../../../constants/i18nKeys";

import {
  IconSearchGray,
  IconAddCircle,
} from "../../../../../constants/icons";

export default function VoucherHeader({
  search,
  onSearchChange,
  onCreate,
}) {
  const { t } = useLocalization();

  return (
    <>
      {/* Search + Button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 10,
            backgroundColor: "#fff",
            paddingHorizontal: 14,
            paddingVertical: 10,
            width: 430,
          }}
        >
          <IconSearchGray />

          <TextInput
            value={search}
            onChangeText={onSearchChange}
            placeholder={t(TEXT_VOUCHER_SEARCH)}
            placeholderTextColor="#9CA3AF"
            style={{
              marginLeft: 10,
              flex: 1,
              fontSize: 14,
              color: "#111827",
              outlineStyle: "none",
            }}
          />
        </View>

        <TouchableOpacity
          onPress={onCreate}
          style={{
            backgroundColor: "#2563EB",
            borderRadius: 8,
            paddingHorizontal: 18,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {IconAddCircle ? <IconAddCircle /> : null}

          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 13,
              marginLeft: 8,
            }}
          >
            {t(TEXT_VOUCHER_CREATE)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "800",
          color: "#111827",
        }}
      >
        {t(TEXT_VOUCHER_TITLE)}
      </Text>

      <Text
        style={{
          color: "#6B7280",
          marginTop: 4,
          marginBottom: 24,
        }}
      >
        {t(TEXT_VOUCHER_SUBTITLE)}
      </Text>
    </>
  );
}
