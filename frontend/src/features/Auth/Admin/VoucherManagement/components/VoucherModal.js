import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

import { useLocalization } from "../../../../../providers/LocalizationProvider";

import {
  TEXT_VOUCHER_MODAL_TITLE,
  TEXT_VOUCHER_MODAL_CODE,
  TEXT_VOUCHER_MODAL_DESCRIPTION,
  TEXT_VOUCHER_MODAL_VALUE,
  TEXT_VOUCHER_MODAL_MIN_ORDER,
  TEXT_VOUCHER_MODAL_ACTIVE,
  TEXT_VOUCHER_MODAL_CANCEL,
  TEXT_VOUCHER_MODAL_SAVE,
} from "../../../../../constants/i18nKeys";

export default function VoucherModal({
  visible,
  voucher,
  saving,
  onClose,
  onConfirm,
}) {
  const { t } = useLocalization();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (voucher) {
      setCode(voucher.code || "");
      setDescription(voucher.description || "");
      setDiscountPercentage(
        voucher.discountPercentage != null
          ? String(voucher.discountPercentage)
          : "",
      );
      setMinOrderValue(
        voucher.minOrderValue != null ? String(voucher.minOrderValue) : "0",
      );
      setIsActive(voucher.isActive !== false);
    } else {
      setCode("");
      setDescription("");
      setDiscountPercentage("");
      setMinOrderValue("0");
      setIsActive(true);
    }
  }, [voucher, visible]);

  const isValid =
    code.trim() !== "" &&
    discountPercentage.trim() !== "" &&
    Number(discountPercentage) > 0 &&
    Number(discountPercentage) <= 100 &&
    minOrderValue.trim() !== "" &&
    Number(minOrderValue) >= 0;

  const handleSave = () => {
    if (!isValid) return;

    onConfirm({
      ...(voucher || {}),
      code: code.trim(),
      description: description.trim(),
      discountPercentage: Number(discountPercentage),
      minOrderValue: Number(minOrderValue),
      isActive,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15,23,42,0.45)",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 20,
            }}
          >
            {voucher?.id
              ? `Edit ${t(TEXT_VOUCHER_MODAL_TITLE)}`
              : `Create ${t(TEXT_VOUCHER_MODAL_TITLE)}`}
          </Text>

          {/* Voucher Code */}
          <Text
            style={{
              marginBottom: 6,
              color: "#6B7280",
              fontSize: 13,
            }}
          >
            {t(TEXT_VOUCHER_MODAL_CODE)}
          </Text>

          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="WELCOME10"
            autoCapitalize="characters"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 44,
              marginBottom: 16,
            }}
          />

          {/* Description */}
          <Text
            style={{
              marginBottom: 6,
              color: "#6B7280",
              fontSize: 13,
            }}
          >
            {t(TEXT_VOUCHER_MODAL_DESCRIPTION)}
          </Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Giảm 10% cho mọi đơn hàng"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 44,
              marginBottom: 16,
            }}
          />

          {/* Discount Percentage */}
          <Text
            style={{
              marginBottom: 6,
              color: "#6B7280",
              fontSize: 13,
            }}
          >
            {t(TEXT_VOUCHER_MODAL_VALUE)}
          </Text>

          <TextInput
            value={discountPercentage}
            onChangeText={setDiscountPercentage}
            keyboardType="numeric"
            placeholder="10"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 44,
              marginBottom: 16,
            }}
          />

          {/* Minimum Order Value */}
          <Text
            style={{
              marginBottom: 6,
              color: "#6B7280",
              fontSize: 13,
            }}
          >
            {t(TEXT_VOUCHER_MODAL_MIN_ORDER)}
          </Text>

          <TextInput
            value={minOrderValue}
            onChangeText={setMinOrderValue}
            keyboardType="numeric"
            placeholder="0"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 44,
              marginBottom: 16,
            }}
          />

          {/* Active toggle */}
          <TouchableOpacity
            onPress={() => setIsActive((prev) => !prev)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#2563EB",
                backgroundColor: isActive ? "#2563EB" : "#FFFFFF",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                color: "#374151",
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {t(TEXT_VOUCHER_MODAL_ACTIVE)}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                borderWidth: 1,
                borderColor: "#D1D5DB",
                borderRadius: 8,
                paddingHorizontal: 20,
                paddingVertical: 11,
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  color: "#374151",
                  fontWeight: "600",
                }}
              >
                {t(TEXT_VOUCHER_MODAL_CANCEL)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isValid || saving}
              onPress={handleSave}
              style={{
                backgroundColor: "#2563EB",
                borderRadius: 8,
                paddingHorizontal: 20,
                paddingVertical: 11,
                opacity: !isValid || saving ? 0.6 : 1,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "700",
                }}
              >
                {saving ? "Saving..." : t(TEXT_VOUCHER_MODAL_SAVE)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
