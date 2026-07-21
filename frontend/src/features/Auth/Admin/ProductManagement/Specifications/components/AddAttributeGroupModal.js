import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_SPEC_MODAL_TITLE,
  TEXT_SPEC_MODAL_NAME_LABEL,
  TEXT_SPEC_MODAL_NAME_PLACEHOLDER,
  TEXT_SPEC_MODAL_DESC_LABEL,
  TEXT_SPEC_MODAL_DESC_PLACEHOLDER,
  TEXT_SPEC_MODAL_ICON_LABEL,
  TEXT_SPEC_MODAL_CANCEL,
  TEXT_SPEC_MODAL_CREATE,
} from "../../../../../../constants/i18nKeys";
import {
  IconMouseDevice,
  IconMonitorDevice,
  IconHeadphoneDevice,
} from "../../../../../../constants/icons";

const ICON_OPTIONS = [
  { value: "mouse", Icon: IconMouseDevice },
  { value: "monitor", Icon: IconMonitorDevice },
  { value: "headphone", Icon: IconHeadphoneDevice },
];

export default function AddAttributeGroupModal({ visible, editingGroup, saving, onClose, onCreate, onUpdate }) {
  const { t } = useLocalization();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("mouse");

  React.useEffect(() => {
    if (editingGroup) {
      setName(editingGroup.name || "");
      setDescription(editingGroup.description || "");
      setIcon(editingGroup.icon || "mouse");
    } else {
      setName("");
      setDescription("");
      setIcon("mouse");
    }
  }, [editingGroup, visible]);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (editingGroup) {
      onUpdate && onUpdate(editingGroup.id, { name: name.trim(), description: description.trim(), icon });
    } else {
      onCreate({ name: name.trim(), description: description.trim(), icon });
    }
    setName("");
    setDescription("");
    setIcon("mouse");
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
            width: 420,
            maxWidth: "100%",
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "800", color: "#111827" }}>
            {editingGroup ? "Chỉnh sửa nhóm thuộc tính" : t(TEXT_SPEC_MODAL_TITLE)}
          </Text>

          <Text
            style={{
              fontSize: 12.5,
              fontWeight: "700",
              color: "#374151",
              marginTop: 18,
              marginBottom: 6,
            }}
          >
            {t(TEXT_SPEC_MODAL_NAME_LABEL)}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t(TEXT_SPEC_MODAL_NAME_PLACEHOLDER)}
            placeholderTextColor="#9CA3AF"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 13.5,
              color: "#111827",
              outlineStyle: "none",
            }}
          />

          <Text
            style={{
              fontSize: 12.5,
              fontWeight: "700",
              color: "#374151",
              marginTop: 16,
              marginBottom: 6,
            }}
          >
            {t(TEXT_SPEC_MODAL_DESC_LABEL)}
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder={t(TEXT_SPEC_MODAL_DESC_PLACEHOLDER)}
            placeholderTextColor="#9CA3AF"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 13.5,
              color: "#111827",
              outlineStyle: "none",
            }}
          />

          <Text
            style={{
              fontSize: 12.5,
              fontWeight: "700",
              color: "#374151",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            {t(TEXT_SPEC_MODAL_ICON_LABEL)}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {ICON_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setIcon(opt.value)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: icon === opt.value ? "#2563EB" : "#EFF6FF",
                }}
              >
                <opt.Icon color={icon === opt.value ? "#fff" : "#2563EB"} size={20} />
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
                {t(TEXT_SPEC_MODAL_CANCEL)}
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
                {editingGroup ? "Lưu thay đổi" : t(TEXT_SPEC_MODAL_CREATE)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
