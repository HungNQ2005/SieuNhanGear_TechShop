import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DataTypeBadge from "./DataTypeBadge";
import StatusBadge from "./StatusBadge";
import UsageBar from "./UsageBar";
import { IconPencilEdit } from "../../../../../../constants/icons";

export default function AttributeRow({ attribute, maxUsage, onEdit }) {
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
      <View style={{ flex: 3 }}>
        <Text style={{ fontSize: 14, fontWeight: "700", color: "#111827" }}>
          {attribute.name}
        </Text>
      </View>

      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 13.5, color: "#374151" }}>
          {attribute.groupName || "-"}
        </Text>
      </View>

      <View style={{ flex: 2 }}>
        <DataTypeBadge dataType={attribute.dataType} />
      </View>

      <View style={{ flex: 2 }}>
        <UsageBar value={attribute.usageCount} max={maxUsage} />
      </View>

      <View style={{ flex: 2 }}>
        <StatusBadge status={attribute.status} />
      </View>

      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => onEdit && onEdit(attribute)}
          style={{ padding: 6 }}
        >
          <IconPencilEdit />
        </TouchableOpacity>
      </View>
    </View>
  );
}
