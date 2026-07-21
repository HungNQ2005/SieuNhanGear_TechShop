import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import { styles } from "../screens/ManageShowroom.styles";
import { IconClose } from "../../../../../../constants/icons";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";

import {
  TEXT_SHOWROOM_CREATE_TITLE,
  TEXT_SHOWROOM_EDIT_TITLE,
  TEXT_SHOWROOM_NAME,
  TEXT_SHOWROOM_ADDRESS,
  TEXT_SHOWROOM_PHONE,
  TEXT_SHOWROOM_WEBSITE,
  TEXT_SHOWROOM_LATITUDE,
  TEXT_SHOWROOM_LONGITUDE,
  TEXT_SHOWROOM_PLACEHOLDER_NAME,
  TEXT_SHOWROOM_PLACEHOLDER_ADDRESS,
  TEXT_SHOWROOM_PLACEHOLDER_PHONE,
  TEXT_SHOWROOM_PLACEHOLDER_WEBSITE,
  TEXT_SHOWROOM_CANCEL,
  TEXT_SHOWROOM_CREATE,
  TEXT_SHOWROOM_SAVE,
  TEXT_SHOWROOM_SAVING,
  TEXT_SHOWROOM_REQUIRED_NAME,
  TEXT_SHOWROOM_REQUIRED_ADDRESS,
  TEXT_SHOWROOM_INVALID_PHONE,
  TEXT_SHOWROOM_INVALID_LATITUDE,
  TEXT_SHOWROOM_INVALID_LONGITUDE,
} from "../../../../../../constants/i18nKeys";
const EMPTY_FORM = {
  name: "",
  address: "",
  phone: "",
  website: "",
  latitude: "",
  longitude: "",
};

export default function ShowroomFormModal({
  visible,
  mode,
  initialValue,
  onClose,
  onSubmit,
  submitting,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const { t } = useLocalization();
  useEffect(() => {
    if (!visible) return;

    if (initialValue) {
      setForm({
        name: initialValue.name || "",
        address: initialValue.address || "",
        phone: initialValue.phone || "",
        website: initialValue.website || "",
        latitude: String(initialValue.latitude ?? ""),
        longitude: String(initialValue.longitude ?? ""),
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setErrors({});
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
      next.name = t(TEXT_SHOWROOM_REQUIRED_NAME);
    }

    if (!form.address.trim()) {
      next.address = t(TEXT_SHOWROOM_REQUIRED_ADDRESS);
    }

    if (form.phone && !/^[0-9+().\-\s]{6,20}$/.test(form.phone)) {
      next.phone = t(TEXT_SHOWROOM_INVALID_PHONE);
    }

    if (form.latitude && isNaN(Number(form.latitude))) {
      next.latitude = t(TEXT_SHOWROOM_INVALID_LATITUDE);
    }

    if (form.longitude && isNaN(Number(form.longitude))) {
      next.longitude = t(TEXT_SHOWROOM_INVALID_LONGITUDE);
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const lat = form.latitude !== "" && !isNaN(Number(form.latitude)) ? Number(form.latitude) : 0;
    const lng = form.longitude !== "" && !isNaN(Number(form.longitude)) ? Number(form.longitude) : 0;

    onSubmit({
      ...form,
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {mode === "edit"
                ? t(TEXT_SHOWROOM_EDIT_TITLE)
                : t(TEXT_SHOWROOM_CREATE_TITLE)}
            </Text>

            <Pressable onPress={onClose} hitSlop={8}>
              <IconClose />
            </Pressable>
          </View>

          <ScrollView
            style={{ maxHeight: 500 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalBody}>
              {/* Name */}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{t(TEXT_SHOWROOM_NAME)} *</Text>

                <TextInput
                  style={[
                    styles.formInput,
                    errors.name && styles.formInputError,
                  ]}
                  value={form.name}
                  onChangeText={(v) => setField("name", v)}
                  placeholder={t(TEXT_SHOWROOM_PLACEHOLDER_NAME)}
                  placeholderTextColor="#94A3B8"
                />

                {errors.name && (
                  <Text style={styles.formErrorText}>{errors.name}</Text>
                )}
              </View>

              {/* Address */}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  {t(TEXT_SHOWROOM_ADDRESS)} *
                </Text>

                <TextInput
                  style={[
                    styles.formInput,
                    errors.address && styles.formInputError,
                  ]}
                  value={form.address}
                  onChangeText={(v) => setField("address", v)}
                  placeholder={t(TEXT_SHOWROOM_PLACEHOLDER_ADDRESS)}
                  placeholderTextColor="#94A3B8"
                />

                {errors.address && (
                  <Text style={styles.formErrorText}>{errors.address}</Text>
                )}
              </View>

              {/* Phone */}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{t(TEXT_SHOWROOM_PHONE)}</Text>

                <TextInput
                  style={[
                    styles.formInput,
                    errors.phone && styles.formInputError,
                  ]}
                  value={form.phone}
                  onChangeText={(v) => setField("phone", v)}
                  keyboardType="phone-pad"
                  placeholder={t(TEXT_SHOWROOM_PLACEHOLDER_PHONE)}
                  placeholderTextColor="#94A3B8"
                />

                {errors.phone && (
                  <Text style={styles.formErrorText}>{errors.phone}</Text>
                )}
              </View>

              {/* Website */}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{t(TEXT_SHOWROOM_WEBSITE)}</Text>

                <TextInput
                  style={styles.formInput}
                  value={form.website}
                  onChangeText={(v) => setField("website", v)}
                  placeholder={t(TEXT_SHOWROOM_PLACEHOLDER_WEBSITE)}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Latitude & Longitude */}

              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    {t(TEXT_SHOWROOM_LATITUDE)}
                  </Text>

                  <TextInput
                    style={[
                      styles.formInput,
                      errors.latitude && styles.formInputError,
                    ]}
                    value={form.latitude}
                    onChangeText={(v) => setField("latitude", v)}
                    keyboardType="numeric"
                  />

                  {errors.latitude && (
                    <Text style={styles.formErrorText}>{errors.latitude}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    {t(TEXT_SHOWROOM_LONGITUDE)}
                  </Text>

                  <TextInput
                    style={[
                      styles.formInput,
                      errors.longitude && styles.formInputError,
                    ]}
                    value={form.longitude}
                    onChangeText={(v) => setField("longitude", v)}
                    keyboardType="numeric"
                  />

                  {errors.longitude && (
                    <Text style={styles.formErrorText}>{errors.longitude}</Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Pressable
              style={styles.btnSecondary}
              onPress={onClose}
              disabled={submitting}
            >
              <Text style={styles.btnSecondaryText}>
                {t(TEXT_SHOWROOM_CANCEL)}
              </Text>
            </Pressable>

            <Pressable
              style={styles.btnPrimary}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.btnPrimaryText}>
                {submitting
                  ? t(TEXT_SHOWROOM_SAVING)
                  : mode === "edit"
                    ? t(TEXT_SHOWROOM_SAVE)
                    : t(TEXT_SHOWROOM_CREATE)}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
