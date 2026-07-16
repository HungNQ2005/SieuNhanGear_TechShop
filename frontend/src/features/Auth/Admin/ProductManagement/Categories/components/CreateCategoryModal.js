import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_CAT_MODAL_TITLE_CREATE,
  TEXT_CAT_MODAL_TITLE_EDIT,
  TEXT_CAT_MODAL_NAME_LABEL,
  TEXT_CAT_MODAL_NAME_PLACEHOLDER,
  TEXT_CAT_MODAL_SUBCATEGORIES_LABEL,
  TEXT_CAT_MODAL_ICON_LABEL,
  TEXT_CAT_MODAL_STATUS_LABEL,
  TEXT_CAT_MODAL_CANCEL,
  TEXT_CAT_MODAL_CREATE,
  TEXT_CAT_MODAL_SAVE,
  TEXT_CAT_STATUS_ACTIVE,
  TEXT_CAT_STATUS_HIDDEN,
} from "../../../../../../constants/i18nKeys";
import CategoryIconBadge, { CATEGORY_ICON_OPTIONS } from "./CategoryIconBadge";

const inputStyle = {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  fontSize: 13.5,
  color: "#111827",
  outlineStyle: "none",
};

const labelStyle = {
  fontSize: 12.5,
  fontWeight: "700",
  color: "#374151",
  marginTop: 16,
  marginBottom: 6,
};

export default function CreateCategoryModal({ visible, saving, editingCategory, onClose, onSubmit }) {
  const { t } = useLocalization();
  const isEditing = Boolean(editingCategory);

  const [name, setName] = useState("");
  const [subCategoriesCount, setSubCategoriesCount] = useState("0");
  const [icon, setIcon] = useState("keyboard");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (visible) {
      setName(editingCategory?.name || "");
      setSubCategoriesCount(String(editingCategory?.subCategoriesCount ?? 0));
      setIcon(editingCategory?.icon || "keyboard");
      setStatus(editingCategory?.status || "active");
    }
  }, [visible, editingCategory]);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      subCategoriesCount: Math.max(0, parseInt(subCategoriesCount, 10) || 0),
      icon,
      status,
    });
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15, 23, 42, 0.45)",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: 440,
            maxWidth: "100%",
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "800", color: "#111827" }}>
            {isEditing ? t(TEXT_CAT_MODAL_TITLE_EDIT) : t(TEXT_CAT_MODAL_TITLE_CREATE)}
          </Text>

          <Text style={labelStyle}>{t(TEXT_CAT_MODAL_NAME_LABEL)}</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t(TEXT_CAT_MODAL_NAME_PLACEHOLDER)}
            placeholderTextColor="#9CA3AF"
            style={inputStyle}
          />

          <Text style={labelStyle}>{t(TEXT_CAT_MODAL_SUBCATEGORIES_LABEL)}</Text>
          <TextInput
            value={subCategoriesCount}
            onChangeText={(v) => setSubCategoriesCount(v.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            style={inputStyle}
          />

          <Text style={labelStyle}>{t(TEXT_CAT_MODAL_ICON_LABEL)}</Text>
          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            {CATEGORY_ICON_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setIcon(opt.value)}
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: icon === opt.value ? "#2563EB" : "transparent",
                }}
              >
                <CategoryIconBadge icon={opt.value} size={44} iconSize={20} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={labelStyle}>{t(TEXT_CAT_MODAL_STATUS_LABEL)}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {[
              { value: "active", label: t(TEXT_CAT_STATUS_ACTIVE) },
              { value: "hidden", label: t(TEXT_CAT_STATUS_HIDDEN) },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setStatus(opt.value)}
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: status === opt.value ? "#2563EB" : "#E5E7EB",
                  backgroundColor: status === opt.value ? "#EFF6FF" : "#fff",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: status === opt.value ? "#2563EB" : "#374151",
                  }}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 26,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text style={{ fontSize: 13.5, fontWeight: "700", color: "#374151" }}>
                {t(TEXT_CAT_MODAL_CANCEL)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={saving || !name.trim()}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: "#2563EB",
                opacity: saving || !name.trim() ? 0.6 : 1,
              }}
            >
              <Text style={{ fontSize: 13.5, fontWeight: "700", color: "#fff" }}>
                {isEditing ? t(TEXT_CAT_MODAL_SAVE) : t(TEXT_CAT_MODAL_CREATE)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
