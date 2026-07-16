import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_CAT_DELETE_TITLE,
  TEXT_CAT_DELETE_MESSAGE,
  TEXT_CAT_DELETE_CANCEL,
  TEXT_CAT_DELETE_CONFIRM,
} from "../../../../../../constants/i18nKeys";
import { IconAlertTriangle } from "../../../../../../constants/icons";

export default function DeleteCategoryModal({ visible, category, deleting, onClose, onConfirm }) {
  const { t } = useLocalization();

  if (!visible || !category) return null;

  const message = t(TEXT_CAT_DELETE_MESSAGE).replace("{{name}}", category.name);

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
            width: 400,
            maxWidth: "100%",
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              backgroundColor: "#FEF2F2",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <IconAlertTriangle color="#DC2626" size={20} />
          </View>

          <Text style={{ fontSize: 16.5, fontWeight: "800", color: "#111827" }}>
            {t(TEXT_CAT_DELETE_TITLE)}
          </Text>
          <Text style={{ fontSize: 13.5, color: "#6B7280", marginTop: 8, lineHeight: 19 }}>
            {message}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 22,
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
                {t(TEXT_CAT_DELETE_CANCEL)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              disabled={deleting}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: "#DC2626",
                opacity: deleting ? 0.6 : 1,
              }}
            >
              <Text style={{ fontSize: 13.5, fontWeight: "700", color: "#fff" }}>
                {t(TEXT_CAT_DELETE_CONFIRM)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
