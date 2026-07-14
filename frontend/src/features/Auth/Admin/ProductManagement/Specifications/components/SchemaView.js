import React from "react";
import { View, Text } from "react-native";

const TYPE_MAP = {
  SELECT: "enum",
  NUMBER: "number",
  TEXT: "string",
  BOOLEAN: "boolean",
};

function buildSchema(rows) {
  const byGroup = {};
  rows.forEach((attr) => {
    const key = attr.groupName || "Ungrouped";
    if (!byGroup[key]) byGroup[key] = {};
    byGroup[key][attr.name.replace(/\s+/g, "")] = {
      type: TYPE_MAP[attr.dataType] || "string",
      usageCount: attr.usageCount,
      status: attr.status,
    };
  });
  return byGroup;
}

export default function SchemaView({ rows }) {
  const schema = buildSchema(rows);
  const json = JSON.stringify(schema, null, 2);

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          backgroundColor: "#0F172A",
          borderRadius: 10,
          padding: 18,
        }}
      >
        <Text
          style={{
            color: "#A5F3FC",
            fontFamily: "monospace",
            fontSize: 12.5,
            lineHeight: 19,
          }}
        >
          {json}
        </Text>
      </View>
    </View>
  );
}
