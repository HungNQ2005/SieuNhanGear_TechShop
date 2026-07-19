import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { styles } from "../screens/ManageAccount.styles";
import { IconClose } from "../../../../../../constants/icons";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_ACCOUNT_CREATE_TITLE,
  TEXT_ACCOUNT_EDIT_TITLE,
  TEXT_ACCOUNT_CREATE_SUBTITLE,
  TEXT_ACCOUNT_EDIT_SUBTITLE,
  TEXT_ACCOUNT_FULL_NAME,
  TEXT_ACCOUNT_PLACEHOLDER_NAME,
  TEXT_ACCOUNT_EMAIL,
  TEXT_ACCOUNT_PLACEHOLDER_EMAIL,
  TEXT_ACCOUNT_ROLE,
  TEXT_ACCOUNT_CANCEL,
  TEXT_ACCOUNT_SAVE,
  TEXT_ACCOUNT_CREATE,
  TEXT_ACCOUNT_SAVING,
  TEXT_ACCOUNT_REQUIRED_NAME,
  TEXT_ACCOUNT_REQUIRED_EMAIL,
  TEXT_ACCOUNT_INVALID_EMAIL,
  TEXT_ACCOUNT_INVALID_PHONE,
  TEXT_ACCOUNT_ROLE_PRODUCT_MANAGER,
  TEXT_ACCOUNT_ROLE_SALES_STAFF,
  TEXT_ACCOUNT_ROLE_SYSTEM_ADMIN,
} from "../../../../../../constants/i18nKeys";
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  role: "product_manager",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ACCOUNT_ROLE_OPTIONS = [
  {
    value: "product_manager",
    label: TEXT_ACCOUNT_ROLE_PRODUCT_MANAGER,
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    value: "sales_staff",
    label: TEXT_ACCOUNT_ROLE_SALES_STAFF,
    color: "#16A34A",
    bg: "#F0FDF4",
  },
  {
    value: "system_admin",
    label: TEXT_ACCOUNT_ROLE_SYSTEM_ADMIN,
    color: "#DC2626",
    bg: "#FEF2F2",
  },
];

export default function AccountFormModal({
  visible,
  mode,
  initialValue,
  onClose,
  onSubmit,
  submitting,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const { t } = useLocalization();
  useEffect(() => {
    if (visible) {
      setForm(
        initialValue
          ? {
              name: initialValue.name || "",
              email: initialValue.email || "",
              phone: initialValue.phone || "",
              role: initialValue.role || "product_manager",
            }
          : EMPTY_FORM,
      );

      setErrors({});
      setFocusedField(null);
    }
  }, [visible, initialValue]);

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) {
      next.name = t(TEXT_ACCOUNT_REQUIRED_NAME);
    }

    if (!form.email.trim()) {
      next.email = t(TEXT_ACCOUNT_REQUIRED_EMAIL);
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = t(TEXT_ACCOUNT_INVALID_EMAIL);
    }

    if (form.phone && !/^[0-9+().\-\s]{6,20}$/.test(form.phone.trim())) {
      next.phone = t(TEXT_ACCOUNT_INVALID_PHONE);
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role,
    });
  };

  const isEdit = mode === "edit";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>
                {isEdit
                  ? t(TEXT_ACCOUNT_EDIT_TITLE)
                  : t(TEXT_ACCOUNT_CREATE_TITLE)}
              </Text>

              <Text style={styles.modalSubtitle}>
                {isEdit
                  ? t(TEXT_ACCOUNT_EDIT_SUBTITLE)
                  : t(TEXT_ACCOUNT_CREATE_SUBTITLE)}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <IconClose />
            </Pressable>
          </View>

          {/* Body */}
          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalBodyContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                {t(TEXT_ACCOUNT_FULL_NAME)}
                <Text style={styles.requiredMark}>*</Text>
              </Text>

              <TextInput
                value={form.name}
                onChangeText={(v) => setField("name", v)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder={t(TEXT_ACCOUNT_PLACEHOLDER_NAME)}
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.formInput,
                  focusedField === "name" && styles.formInputFocused,
                  errors.name && styles.formInputError,
                ]}
              />

              {!!errors.name && (
                <Text style={styles.formErrorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                {t(TEXT_ACCOUNT_EMAIL)}
                <Text style={styles.requiredMark}>*</Text>
              </Text>

              <TextInput
                value={form.email}
                onChangeText={(v) => setField("email", v)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder={t(TEXT_ACCOUNT_PLACEHOLDER_EMAIL)}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                style={[
                  styles.formInput,
                  focusedField === "email" && styles.formInputFocused,
                  errors.email && styles.formInputError,
                ]}
              />

              {!!errors.email && (
                <Text style={styles.formErrorText}>{errors.email}</Text>
              )}
            </View>

            {/* Role */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t(TEXT_ACCOUNT_ROLE)}</Text>

              <View style={styles.roleList}>
                {ACCOUNT_ROLE_OPTIONS.map((role) => {
                  const active = form.role === role.value;

                  return (
                    <Pressable
                      key={role.value}
                      onPress={() => setField("role", role.value)}
                      style={[
                        styles.roleRow,
                        active && {
                          borderColor: role.color,
                          backgroundColor: role.bg,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          active && { borderColor: role.color },
                        ]}
                      >
                        {active && (
                          <View
                            style={[
                              styles.radioInner,
                              { backgroundColor: role.color },
                            ]}
                          />
                        )}
                      </View>

                      <View style={styles.roleTextWrap}>
                        <Text
                          style={[
                            styles.roleLabel,
                            active && { color: role.color },
                          ]}
                        >
                          {t(role.label)}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <Pressable
              style={({ pressed }) => [
                styles.btnSecondary,
                styles.footerBtn,
                pressed && styles.btnSecondaryPressed,
              ]}
              onPress={onClose}
              disabled={submitting}
            >
              <Text style={styles.btnSecondaryText}>
                {t(TEXT_ACCOUNT_CANCEL)}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.btnPrimary,
                styles.footerBtn,
                submitting && styles.btnPrimaryDisabled,
                pressed && !submitting && styles.btnPrimaryPressed,
              ]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.btnPrimaryText}>
                {submitting
                  ? t(TEXT_ACCOUNT_SAVING)
                  : isEdit
                    ? t(TEXT_ACCOUNT_SAVE)
                    : t(TEXT_ACCOUNT_CREATE)}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
