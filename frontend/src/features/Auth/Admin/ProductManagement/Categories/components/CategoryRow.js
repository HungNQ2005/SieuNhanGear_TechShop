import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_CAT_ITEMS_COUNT,
  TEXT_CAT_SKUS_COUNT,
} from "../../../../../../constants/i18nKeys";
import { IconPencilEdit, IconTrash } from "../../../../../../constants/icons";
import CategoryIconBadge from "./CategoryIconBadge";
import CategoryStatusBadge from "./CategoryStatusBadge";

function formatNumber(n) {
  return (n ?? 0).toLocaleString("en-US");
}

export default function CategoryRow({ category, onEdit, onDelete }) {
  const { t } = useLocalization();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "#F1F3F6",
      }}
    >
      <View style={{ flex: 3, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <CategoryIconBadge icon={category.icon} />
        <Text style={{ fontSize: 14.5, fontWeight: "700", color: "#111827" }}>
          {category.name}
        </Text>
      </View>

      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 13.5, color: "#374151" }}>
          {t(TEXT_CAT_ITEMS_COUNT).replace("{{count}}", formatNumber(category.subCategoriesCount))}
        </Text>
      </View>

      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 13.5, color: "#374151" }}>
          {t(TEXT_CAT_SKUS_COUNT).replace("{{count}}", formatNumber(category.productsCount))}
        </Text>
      </View>

      <View style={{ flex: 2 }}>
        <CategoryStatusBadge status={category.status} />
      </View>

      <View style={{ flex: 1.2, flexDirection: "row", justifyContent: "flex-end", gap: 14 }}>
        <TouchableOpacity onPress={() => onEdit && onEdit(category)} style={{ padding: 4 }}>
          <IconPencilEdit />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete && onDelete(category)} style={{ padding: 4 }}>
          <IconTrash />
        </TouchableOpacity>
      </View>
    </View>
  );
}
