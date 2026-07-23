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
import { styles } from "../screens/ManageNews.styles";
import { IconClose } from "../../../../../../constants/icons";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_NEWS_CREATE_TITLE,
  TEXT_NEWS_EDIT_TITLE,
  TEXT_NEWS_TITLE,
  TEXT_NEWS_CONTENT,
  TEXT_NEWS_IMAGE,
  TEXT_NEWS_STATUS,
  TEXT_NEWS_CANCEL,
  TEXT_NEWS_SAVE,
  TEXT_NEWS_SAVING,
  TEXT_NEWS_REQUIRED_TITLE,
  TEXT_NEWS_REQUIRED_CONTENT,
  TEXT_NEWS_MANAGEMENT_PUBLISHED,
  TEXT_NEWS_MANAGEMENT_DRAFT,
  TEXT_NEWS_MANAGEMENT_HIDDEN,
} from "../../../../../../constants/i18nKeys";

const EMPTY_FORM = {
  title: "",
  content: "",
  image: "",
  status: "published",
};

export default function NewsFormModal({
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

  const STATUS_OPTIONS = [
    { value: "published", label: t(TEXT_NEWS_MANAGEMENT_PUBLISHED), bg: "#EFF6FF", color: "#2563EB" },
    { value: "draft", label: t(TEXT_NEWS_MANAGEMENT_DRAFT), bg: "#F1F5F9", color: "#64748B" },
    { value: "hidden", label: t(TEXT_NEWS_MANAGEMENT_HIDDEN), bg: "#FEF2F2", color: "#DC2626" },
  ];

  useEffect(() => {
    if (visible) {
      setForm(
        initialValue
          ? {
              title: initialValue.title ? String(initialValue.title) : "",
              content: initialValue.content ? String(initialValue.content) : "",
              image: initialValue.image ? String(initialValue.image) : "",
              status: initialValue.status || "published",
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
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = t(TEXT_NEWS_REQUIRED_TITLE);
    if (!form.content.trim()) next.content = t(TEXT_NEWS_REQUIRED_CONTENT);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({
      title: form.title.trim(),
      content: form.content.trim(),
      image: form.image.trim(),
      status: form.status,
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
                {isEdit ? t(TEXT_NEWS_EDIT_TITLE) : t(TEXT_NEWS_CREATE_TITLE)}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
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
            {/* Title */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                {t(TEXT_NEWS_TITLE)}
                <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TextInput
                value={form.title}
                onChangeText={(v) => setField("title", v)}
                onFocus={() => setFocusedField("title")}
                onBlur={() => setFocusedField(null)}
                placeholder={t(TEXT_NEWS_TITLE)}
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.formInput,
                  focusedField === "title" && styles.formInputFocused,
                  errors.title && styles.formInputError,
                ]}
              />
              {!!errors.title && <Text style={styles.formErrorText}>{errors.title}</Text>}
            </View>

            {/* Content */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                {t(TEXT_NEWS_CONTENT)}
                <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TextInput
                value={form.content}
                onChangeText={(v) => setField("content", v)}
                onFocus={() => setFocusedField("content")}
                onBlur={() => setFocusedField(null)}
                placeholder={t(TEXT_NEWS_CONTENT)}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                style={[
                  styles.formInput,
                  { height: 120, textAlignVertical: "top", paddingTop: 12 },
                  focusedField === "content" && styles.formInputFocused,
                  errors.content && styles.formInputError,
                ]}
              />
              {!!errors.content && <Text style={styles.formErrorText}>{errors.content}</Text>}
            </View>

            {/* Image */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                {t(TEXT_NEWS_IMAGE)}
              </Text>
              <TextInput
                value={form.image}
                onChangeText={(v) => setField("image", v)}
                onFocus={() => setFocusedField("image")}
                onBlur={() => setFocusedField(null)}
                placeholder="https://..."
                placeholderTextColor="#9CA3AF"
                style={[
                  styles.formInput,
                  focusedField === "image" && styles.formInputFocused,
                ]}
              />
            </View>

            {/* Status */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t(TEXT_NEWS_STATUS)}</Text>
              <View style={styles.roleOptions}>
                {STATUS_OPTIONS.map((opt) => {
                  const isSelected = form.status === opt.value;
                  return (
                    <Pressable
                      key={opt.value}
                      onPress={() => setField("status", opt.value)}
                      style={[
                        styles.roleOption,
                        isSelected && { borderColor: opt.color, backgroundColor: opt.bg },
                      ]}
                    >
                      <View style={[styles.radioOuter, isSelected && { borderColor: opt.color }]}>
                        {isSelected && <View style={[styles.radioInner, { backgroundColor: opt.color }]} />}
                      </View>
                      <Text style={[styles.roleOptionLabel, isSelected && { color: opt.color, fontWeight: "600" }]}>
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <Pressable
              style={styles.btnCancel}
              onPress={onClose}
              disabled={submitting}
            >
              <Text style={styles.btnCancelText}>{t(TEXT_NEWS_CANCEL)}</Text>
            </Pressable>
            <Pressable
              style={[styles.btnSave, submitting && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.btnSaveText}>
                {submitting ? t(TEXT_NEWS_SAVING) : t(TEXT_NEWS_SAVE)}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
