import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_PROD_COL_DETAILS,
  TEXT_PROD_COL_CATEGORY,
  TEXT_PROD_COL_PRICE,
  TEXT_PROD_COL_STATUS,
  TEXT_PROD_COL_ACTIONS,
  TEXT_PROD_NO_RESULTS,
} from "../../../../../../constants/i18nKeys";
import ProductRow from "./ProductRow";

const HEADER_TEXT_STYLE = {
  fontWeight: "700",
  fontSize: 11.5,
  color: "#6B7280",
  letterSpacing: 0.3,
};

export default function ProductTable({ rows, onEdit, onDelete }) {
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
        <Text style={[HEADER_TEXT_STYLE, { flex: 3.4 }]}>
          {t(TEXT_PROD_COL_DETAILS).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 1.8 }]}>
          {t(TEXT_PROD_COL_CATEGORY).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 1.6 }]}>
          {t(TEXT_PROD_COL_PRICE).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 1.8 }]}>
          {t(TEXT_PROD_COL_STATUS).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 1.2, textAlign: "right" }]}>
          {t(TEXT_PROD_COL_ACTIONS).toUpperCase()}
        </Text>
      </View>

      {rows.length === 0 ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
            {t(TEXT_PROD_NO_RESULTS)}
          </Text>
        </View>
      ) : (
        rows.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </View>
  );
}
