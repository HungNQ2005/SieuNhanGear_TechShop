import React from "react";
import { View, Text } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_SPEC_COL_ATTRIBUTE_NAME,
  TEXT_SPEC_COL_GROUP,
  TEXT_SPEC_COL_DATA_TYPE,
  TEXT_SPEC_COL_USAGE_COUNT,
  TEXT_SPEC_COL_STATUS,
  TEXT_SPEC_COL_ACTIONS,
  TEXT_SPEC_NO_RESULTS,
} from "../../../../../../constants/i18nKeys";
import AttributeRow from "./AttributeRow";

const HEADER_TEXT_STYLE = {
  fontWeight: "700",
  fontSize: 11.5,
  color: "#6B7280",
  letterSpacing: 0.3,
};

export default function AttributeTable({ rows, maxUsage, onEdit }) {
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
          {t(TEXT_SPEC_COL_ATTRIBUTE_NAME).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_SPEC_COL_GROUP).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_SPEC_COL_DATA_TYPE).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_SPEC_COL_USAGE_COUNT).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 2 }]}>
          {t(TEXT_SPEC_COL_STATUS).toUpperCase()}
        </Text>
        <Text style={[HEADER_TEXT_STYLE, { flex: 1, textAlign: "right" }]}>
          {t(TEXT_SPEC_COL_ACTIONS).toUpperCase()}
        </Text>
      </View>

      {rows.length === 0 ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ color: "#9CA3AF", fontSize: 13 }}>
            {t(TEXT_SPEC_NO_RESULTS)}
          </Text>
        </View>
      ) : (
        rows.map((attribute) => (
          <AttributeRow
            key={attribute.id}
            attribute={attribute}
            maxUsage={maxUsage}
            onEdit={onEdit}
          />
        ))
      )}
    </View>
  );
}
