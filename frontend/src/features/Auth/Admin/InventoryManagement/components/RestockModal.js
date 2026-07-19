import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import {
  TEXT_RESTOCK_MODAL_TITLE,
  TEXT_RESTOCK_MODAL_CURRENT,
  TEXT_RESTOCK_MODAL_QUANTITY_LABEL,
  TEXT_RESTOCK_MODAL_NOTE_LABEL,
  TEXT_RESTOCK_MODAL_CANCEL,
  TEXT_RESTOCK_MODAL_CONFIRM,
  TEXT_UNITS,
} from "../../../../../constants/i18nKeys";

export default function RestockModal({ row, onClose, onConfirm, saving }) {
  const { t } = useLocalization();
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (row) {
      setQuantity(String(row.quantity));
      setNote("");
    }
  }, [row]);

  if (!row) return null;

  const parsedQty = Number(quantity);
  const isValid = quantity !== "" && !Number.isNaN(parsedQty) && parsedQty >= 0;

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
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
            width: "100%",
            maxWidth: 420,
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "800", color: "#111827" }}>
            {t(TEXT_RESTOCK_MODAL_TITLE)}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
            {row.product?.name} · {row.warehouse?.name}
          </Text>

          <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 18 }}>
            {t(TEXT_RESTOCK_MODAL_CURRENT)}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>
            {row.quantity} {t(TEXT_UNITS)}
          </Text>

          <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 16, marginBottom: 6 }}>
            {t(TEXT_RESTOCK_MODAL_QUANTITY_LABEL)}
          </Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 12,
              fontSize: 14,
              color: "#111827",
            }}
          />

          <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 16, marginBottom: 6 }}>
            {t(TEXT_RESTOCK_MODAL_NOTE_LABEL)}
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 12,
              fontSize: 14,
              color: "#111827",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 24,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text style={{ color: "#374151", fontWeight: "600", fontSize: 13 }}>
                {t(TEXT_RESTOCK_MODAL_CANCEL)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isValid || saving}
              onPress={() => onConfirm(row, parsedQty, note)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                borderRadius: 8,
                backgroundColor: "#2563EB",
                opacity: !isValid || saving ? 0.6 : 1,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
                {t(TEXT_RESTOCK_MODAL_CONFIRM)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
