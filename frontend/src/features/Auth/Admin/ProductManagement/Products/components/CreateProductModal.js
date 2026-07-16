import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_PROD_MODAL_TITLE_CREATE,
  TEXT_PROD_MODAL_TITLE_EDIT,
  TEXT_PROD_MODAL_NAME_LABEL,
  TEXT_PROD_MODAL_NAME_PLACEHOLDER,
  TEXT_PROD_MODAL_SUBTITLE_LABEL,
  TEXT_PROD_MODAL_SUBTITLE_PLACEHOLDER,
  TEXT_PROD_MODAL_CATEGORY_LABEL,
  TEXT_PROD_MODAL_PRICE_LABEL,
  TEXT_PROD_MODAL_IMAGE_LABEL,
  TEXT_PROD_MODAL_IMAGE_PLACEHOLDER,
  TEXT_PROD_MODAL_STATUS_LABEL,
  TEXT_PROD_MODAL_CANCEL,
  TEXT_PROD_MODAL_CREATE,
  TEXT_PROD_MODAL_SAVE,
  TEXT_PROD_STATUS_ACTIVE,
  TEXT_PROD_STATUS_DRAFTING,
  TEXT_PROD_STATUS_OUT_OF_STOCK,
} from "../../../../../../constants/i18nKeys";
import { IconChevronDownGray } from "../../../../../../constants/icons";

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

export default function CreateProductModal({
  visible,
  saving,
  editingProduct,
  categories,
  onClose,
  onSubmit,
}) {
  const { t } = useLocalization();
  const isEditing = Boolean(editingProduct);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories?.[0]?.id ?? null);
  const [price, setPrice] = useState("0");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState("active");
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      setName(editingProduct?.name || "");
      setSubtitle(editingProduct?.subtitle || "");
      setCategoryId(editingProduct?.category_id ?? categories?.[0]?.id ?? null);
      setPrice(String(editingProduct?.price ?? 0));
      setImgUrl(editingProduct?.img_URL || "");
      setStatus(editingProduct?.status || "active");
      setCategoryPickerOpen(false);
    }
  }, [visible, editingProduct, categories]);

  if (!visible) return null;

  const selectedCategory = categories?.find((c) => c.id === categoryId);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      subtitle: subtitle.trim(),
      category_id: categoryId,
      price: Math.max(0, parseInt(price, 10) || 0),
      img_URL: imgUrl.trim(),
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
            width: 460,
            maxWidth: "100%",
            maxHeight: "90%",
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "800", color: "#111827" }}>
            {isEditing ? t(TEXT_PROD_MODAL_TITLE_EDIT) : t(TEXT_PROD_MODAL_TITLE_CREATE)}
          </Text>

          <ScrollView style={{ maxHeight: 480 }} showsVerticalScrollIndicator={false}>
            <Text style={labelStyle}>{t(TEXT_PROD_MODAL_NAME_LABEL)}</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={t(TEXT_PROD_MODAL_NAME_PLACEHOLDER)}
              placeholderTextColor="#9CA3AF"
              style={inputStyle}
            />

            <Text style={labelStyle}>{t(TEXT_PROD_MODAL_SUBTITLE_LABEL)}</Text>
            <TextInput
              value={subtitle}
              onChangeText={setSubtitle}
              placeholder={t(TEXT_PROD_MODAL_SUBTITLE_PLACEHOLDER)}
              placeholderTextColor="#9CA3AF"
              style={inputStyle}
            />

            <Text style={labelStyle}>{t(TEXT_PROD_MODAL_CATEGORY_LABEL)}</Text>
            <View style={{ position: "relative", zIndex: categoryPickerOpen ? 20 : 1 }}>
              <TouchableOpacity
                onPress={() => setCategoryPickerOpen((o) => !o)}
                style={{
                  ...inputStyle,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 13.5, color: selectedCategory ? "#111827" : "#9CA3AF" }}>
                  {selectedCategory ? selectedCategory.name : "—"}
                </Text>
                <IconChevronDownGray />
              </TouchableOpacity>

              {categoryPickerOpen && (
                <View
                  style={{
                    position: "absolute",
                    top: 44,
                    left: 0,
                    right: 0,
                    maxHeight: 200,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 10,
                    paddingVertical: 6,
                    shadowColor: "#0F172A",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 20,
                    elevation: 6,
                  }}
                >
                  <ScrollView>
                    {(categories || []).map((c) => (
                      <TouchableOpacity
                        key={c.id}
                        onPress={() => {
                          setCategoryId(c.id);
                          setCategoryPickerOpen(false);
                        }}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 14,
                          backgroundColor: c.id === categoryId ? "#EFF6FF" : "transparent",
                        }}
                      >
                        <Text
                          style={{
                            color: c.id === categoryId ? "#2563EB" : "#374151",
                            fontWeight: c.id === categoryId ? "700" : "500",
                            fontSize: 13,
                          }}
                        >
                          {c.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <Text style={labelStyle}>{t(TEXT_PROD_MODAL_PRICE_LABEL)}</Text>
            <TextInput
              value={price}
              onChangeText={(v) => setPrice(v.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              style={inputStyle}
            />

            <Text style={labelStyle}>{t(TEXT_PROD_MODAL_IMAGE_LABEL)}</Text>
            <TextInput
              value={imgUrl}
              onChangeText={setImgUrl}
              placeholder={t(TEXT_PROD_MODAL_IMAGE_PLACEHOLDER)}
              placeholderTextColor="#9CA3AF"
              style={inputStyle}
            />

            <Text style={labelStyle}>{t(TEXT_PROD_MODAL_STATUS_LABEL)}</Text>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {[
                { value: "active", label: t(TEXT_PROD_STATUS_ACTIVE) },
                { value: "drafting", label: t(TEXT_PROD_STATUS_DRAFTING) },
                { value: "out_of_stock", label: t(TEXT_PROD_STATUS_OUT_OF_STOCK) },
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
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
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
                {t(TEXT_PROD_MODAL_CANCEL)}
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
                {isEditing ? t(TEXT_PROD_MODAL_SAVE) : t(TEXT_PROD_MODAL_CREATE)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
