import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { IconShippingAddress } from "../../constants/icons";
import {
  TEXT_CHECKOUT_SHIPPING_INFO,
  TEXT_NAME,
  TEXT_EMAIL,
  TEXT_CHECKOUT_PHONE,
  TEXT_CHECKOUT_PHONE_PLACEHOLDER,
  TEXT_CHECKOUT_PROVINCE,
  TEXT_CHECKOUT_PROVINCE_PLACEHOLDER,
  TEXT_CHECKOUT_WARD,
  TEXT_CHECKOUT_WARD_PLACEHOLDER,
  TEXT_CHECKOUT_ADDRESS,
  TEXT_CHECKOUT_ADDRESS_PLACEHOLDER,
} from "../../constants/i18nKeys";
const SHIPPING_ADDRESS_FIELDS = [
  {
    id: "name",
    label: TEXT_NAME,
    placeholder: TEXT_NAME,
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: TEXT_EMAIL,
    placeholder: TEXT_EMAIL,
    type: "email",
    required: true,
  },
  {
    id: "phone",
    label: TEXT_CHECKOUT_PHONE,
    placeholder: TEXT_CHECKOUT_PHONE_PLACEHOLDER,
    type: "tel",
    required: true,
  },
  {
    id: "province",
    label: TEXT_CHECKOUT_PROVINCE,
    placeholder: TEXT_CHECKOUT_PROVINCE_PLACEHOLDER,
    type: "select",
    required: true,
  },
  {
    id: "ward",
    label: TEXT_CHECKOUT_WARD,
    placeholder: TEXT_CHECKOUT_WARD_PLACEHOLDER,
    type: "select",
    required: true,
  },
  {
    id: "address",
    label: TEXT_CHECKOUT_ADDRESS,
    placeholder: TEXT_CHECKOUT_ADDRESS_PLACEHOLDER,
    type: "text",
    required: true,
  },
];
export default function ShippingInfoCard({
  styles,
  t,
  formData,
  handleInputChange,
  openPicker,
  allowManualSelect = false,
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconContainer}>
          <IconShippingAddress />
        </View>

        <Text style={styles.sectionTitle}>
          {t(TEXT_CHECKOUT_SHIPPING_INFO)}
        </Text>
      </View>

      <View style={styles.formContainer}>
        {SHIPPING_ADDRESS_FIELDS.map((field) => (
          <View key={field.id} style={styles.formGroup}>
            <Text style={styles.label}>
              {t(field.label)}
              {field.required && <Text style={styles.required}>*</Text>}
            </Text>

            {field.type === "select" ? (
              // Nếu không có danh sách (allowManualSelect=true), cho phép nhập tay
              allowManualSelect ? (
                <TextInput
                  style={styles.input}
                  placeholder={t(field.placeholder)}
                  placeholderTextColor="#9CA3AF"
                  value={formData[field.id] || ""}
                  onChangeText={(value) => handleInputChange(field.id, value)}
                />
              ) : (
                <TouchableOpacity
                  style={styles.selectInput}
                  onPress={() => openPicker(field.id)}
                >
                  <Text
                    style={
                      formData[field.id]
                        ? styles.selectText
                        : styles.selectPlaceholder
                    }
                  >
                    {formData[field.id] ||
                      (field.id === "province"
                        ? t(TEXT_CHECKOUT_PROVINCE)
                        : t(TEXT_CHECKOUT_WARD))}
                  </Text>

                  <Text style={styles.selectArrow}>▼</Text>
                </TouchableOpacity>
              )
            ) : (
              <TextInput
                style={styles.input}
                placeholder={t(field.placeholder)}
                placeholderTextColor="#9CA3AF"
                value={formData[field.id] || ""}
                onChangeText={(value) => handleInputChange(field.id, value)}
                keyboardType={
                  field.type === "email"
                    ? "email-address"
                    : field.type === "tel"
                      ? "phone-pad"
                      : "default"
                }
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
