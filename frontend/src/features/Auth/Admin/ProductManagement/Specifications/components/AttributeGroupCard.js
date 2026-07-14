import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_SPEC_PRODUCTS_COUNT,
  TEXT_SPEC_EDIT_TEMPLATE,
  TEXT_SPEC_MORE_ATTRIBUTES,
  TEXT_SPEC_DUPLICATE_TEMPLATE,
  TEXT_SPEC_DELETE_TEMPLATE,
} from "../../../../../../constants/i18nKeys";
import {
  IconMouseDevice,
  IconMonitorDevice,
  IconHeadphoneDevice,
  IconDotsVertical,
} from "../../../../../../constants/icons";

const ICONS = {
  mouse: IconMouseDevice,
  monitor: IconMonitorDevice,
  headphone: IconHeadphoneDevice,
};

const VISIBLE_CHIPS = 3;

export default function AttributeGroupCard({ group, onEditTemplate, onDuplicate, onDelete }) {
  const { t } = useLocalization();
  const [menuOpen, setMenuOpen] = useState(false);

  const Icon = ICONS[group.icon] || IconMouseDevice;
  const attributes = group.attributes || [];
  const visibleChips = attributes.slice(0, VISIBLE_CHIPS);
  const remaining = attributes.length - VISIBLE_CHIPS;

  return (
    <View
      style={{
        flex: 1,
        minWidth: 280,
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 20,
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#EFF6FF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon color="#2563EB" size={20} />
        </View>

        <View style={{ position: "relative" }}>
          <TouchableOpacity
            onPress={() => setMenuOpen((o) => !o)}
            style={{ padding: 4 }}
          >
            <IconDotsVertical />
          </TouchableOpacity>

          {menuOpen && (
            <View
              style={{
                position: "absolute",
                top: 30,
                right: 0,
                minWidth: 170,
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
                zIndex: 30,
              }}
            >
              <TouchableOpacity
                style={{ paddingVertical: 9, paddingHorizontal: 14 }}
                onPress={() => {
                  setMenuOpen(false);
                  onDuplicate && onDuplicate(group);
                }}
              >
                <Text style={{ fontSize: 13, color: "#374151", fontWeight: "600" }}>
                  {t(TEXT_SPEC_DUPLICATE_TEMPLATE)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingVertical: 9, paddingHorizontal: 14 }}
                onPress={() => {
                  setMenuOpen(false);
                  onDelete && onDelete(group);
                }}
              >
                <Text style={{ fontSize: 13, color: "#DC2626", fontWeight: "600" }}>
                  {t(TEXT_SPEC_DELETE_TEMPLATE)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#111827",
          marginTop: 14,
        }}
      >
        {group.name}
      </Text>
      <Text style={{ fontSize: 12.5, color: "#9CA3AF", marginTop: 2 }}>
        {group.description}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 14,
        }}
      >
        {visibleChips.map((attr) => (
          <View
            key={attr}
            style={{
              backgroundColor: "#F3F4F6",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 12, color: "#4B5563", fontWeight: "600" }}>
              {attr}
            </Text>
          </View>
        ))}
        {remaining > 0 && (
          <View
            style={{
              backgroundColor: "#F3F4F6",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 12, color: "#4B5563", fontWeight: "600" }}>
              {t(TEXT_SPEC_MORE_ATTRIBUTES).replace("{{count}}", remaining)}
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 18,
          paddingTop: 14,
          borderTopWidth: 1,
          borderColor: "#F1F3F6",
        }}
      >
        <Text style={{ fontSize: 11.5, fontWeight: "700", color: "#6B7280" }}>
          {t(TEXT_SPEC_PRODUCTS_COUNT)
            .replace("{{count}}", group.productsCount ?? 0)
            .toUpperCase()}
        </Text>
        <TouchableOpacity onPress={() => onEditTemplate && onEditTemplate(group)}>
          <Text style={{ fontSize: 12.5, fontWeight: "700", color: "#2563EB" }}>
            {t(TEXT_SPEC_EDIT_TEMPLATE).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
