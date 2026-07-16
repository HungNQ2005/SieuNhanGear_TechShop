import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_CAT_COL_NAME,
  TEXT_CAT_COL_SUBCATEGORIES,
  TEXT_CAT_COL_PRODUCTS,
  TEXT_CAT_COL_STATUS,
  TEXT_CAT_COL_ACTIONS,
  TEXT_CAT_NO_RESULTS,
} from "../../../../../../constants/i18nKeys";
import CategoryRow from "./CategoryRow";

const HEADER_TEXT_STYLE = {
  fontWeight: "700",
  fontSize: 11.5,
  color: "#6B7280",
  letterSpacing: 0.3,
};

export default function CategoryTable({ rows, onEdit, onDelete }) {
  const { t } = useLocalization();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 13,
          paddingHorizontal: 20,
          backgroundColor: "#F9FAFB",
        }}
      >
        <Text style={[HEADER_TEXT_STYLE, { flex: 3 }]}>
          {t(TEXT_CAT_COL_NAME).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_CAT_COL_SUBCATEGORIES).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_CAT_COL_PRODUCTS).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_CAT_COL_STATUS).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 1.2, textAlign: "right" }]}>
          {t(TEXT_CAT_COL_ACTIONS).toUpperCase()}
        </Text>
      </View>

      {rows.length === 0 ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
            {t(TEXT_CAT_NO_RESULTS)}
          </Text>
        </View>
      ) : (
        rows.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </View>
  );
}
