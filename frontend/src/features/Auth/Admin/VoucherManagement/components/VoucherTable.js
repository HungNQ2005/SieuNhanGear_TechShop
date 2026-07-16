import React from "react";
import {
  View,
  Text,
} from "react-native";

import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_VOUCHER_COL_CODE,
  TEXT_VOUCHER_COL_DESCRIPTION,
  TEXT_VOUCHER_COL_DISCOUNT_VALUE,
  TEXT_VOUCHER_COL_MIN_ORDER,
  TEXT_VOUCHER_COL_STATUS,
  TEXT_VOUCHER_COL_ACTIONS,
  TEXT_NO_RESULTS,
} from "../../../../../constants/i18nKeys";

import VoucherRow from "./VoucherRow";

export default function VoucherTable({
  rows = [],
  onEdit,
  onDelete,
}) {
  const { t } = useLocalization();

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        zIndex: 1,
        elevation: 1,
      }}
    >
      {/* Table Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          paddingHorizontal: 20,
          height: 52,
        }}
      >
        <Text
          style={{
            flex: 2,
            fontSize: 12,
            fontWeight: "700",
            color: "#6B7280",
          }}
        >
          {t(TEXT_VOUCHER_COL_CODE).toUpperCase()}
        </Text>

        <Text
          style={{
            flex: 3,
            fontSize: 12,
            fontWeight: "700",
            color: "#6B7280",
          }}
        >
          {t(TEXT_VOUCHER_COL_DESCRIPTION).toUpperCase()}
        </Text>

        <Text
          style={{
            flex: 1.2,
            fontSize: 12,
            fontWeight: "700",
            color: "#6B7280",
          }}
        >
          {t(TEXT_VOUCHER_COL_DISCOUNT_VALUE).toUpperCase()}
        </Text>

        <Text
          style={{
            flex: 1.5,
            fontSize: 12,
            fontWeight: "700",
            color: "#6B7280",
          }}
        >
          {t(TEXT_VOUCHER_COL_MIN_ORDER).toUpperCase()}
        </Text>

        <Text
          style={{
            flex: 1.5,
            textAlign: "center",
            fontSize: 12,
            fontWeight: "700",
            color: "#6B7280",
          }}
        >
          {t(TEXT_VOUCHER_COL_STATUS).toUpperCase()}
        </Text>

        <Text
          style={{
            flex: 1.2,
            textAlign: "right",
            fontSize: 12,
            fontWeight: "700",
            color: "#6B7280",
          }}
        >
          {t(TEXT_VOUCHER_COL_ACTIONS).toUpperCase()}
        </Text>
      </View>

      {/* Body */}
      {rows.length === 0 ? (
        <View
          style={{
            paddingVertical: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#9CA3AF",
              fontSize: 14,
            }}
          >
            {t(TEXT_NO_RESULTS)}
          </Text>
        </View>
      ) : (
        rows.map((row) => (
          <VoucherRow
            key={row.id}
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </View>
  );
}