import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../../providers/LocalizationProvider";
import {
  TEXT_SPEC_EXPLORER_TITLE,
  TEXT_SPEC_TOTAL_ATTRIBUTES,
  TEXT_SPEC_VIEW_TABLE,
  TEXT_SPEC_VIEW_SCHEMA,
  TEXT_SPEC_FILTER,
  TEXT_SPEC_SHOWING_ATTRIBUTES,
  TEXT_ALL_CATEGORIES,
} from "../../../../../../constants/i18nKeys";
import { IconFilter } from "../../../../../../constants/icons";
import Dropdown from "./Dropdown";
import AttributeTable from "./AttributeTable";
import SchemaView from "./SchemaView";
import Pagination from "./Pagination";

export default function GlobalAttributeExplorer({
  attributes,
  totalCount,
  groups,
  groupFilter,
  onGroupFilterChange,
  page,
  totalPages,
  onPageChange,
  from,
  to,
  onEditAttribute,
}) {
  const { t } = useLocalization();
  const [view, setView] = useState("table");

  const maxUsage = Math.max(1, ...attributes.map((a) => a.usageCount || 0));

  const groupOptions = [
    { value: "all", label: t(TEXT_ALL_CATEGORIES) },
    ...groups.map((g) => ({ value: g.id, label: g.name })),
  ];

  const showingText = t(TEXT_SPEC_SHOWING_ATTRIBUTES)
    .replace("{{from}}", totalCount === 0 ? 0 : from)
    .replace("{{to}}", to)
    .replace("{{total}}", totalCount);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          padding: 20,
          paddingBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
            {t(TEXT_SPEC_EXPLORER_TITLE)}
          </Text>
          <View
            style={{
              backgroundColor: "#F3F4F6",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 11.5, fontWeight: "700", color: "#4B5563" }}>
              {t(TEXT_SPEC_TOTAL_ATTRIBUTES)
                .replace("{{count}}", totalCount)
                .toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => setView("table")}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: view === "table" ? "#111827" : "#fff",
              }}
            >
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: "700",
                  color: view === "table" ? "#fff" : "#374151",
                }}
              >
                {t(TEXT_SPEC_VIEW_TABLE).toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setView("schema")}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: view === "schema" ? "#111827" : "#fff",
              }}
            >
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: "700",
                  color: view === "schema" ? "#fff" : "#374151",
                }}
              >
                {t(TEXT_SPEC_VIEW_SCHEMA).toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>

          <Dropdown
            icon={<IconFilter />}
            label={t(TEXT_SPEC_FILTER)}
            options={groupOptions}
            value={groupFilter}
            onChange={onGroupFilterChange}
          />
        </View>
      </View>

      {view === "table" ? (
        <AttributeTable
          rows={attributes}
          maxUsage={maxUsage}
          onEdit={onEditAttribute}
        />
      ) : (
        <SchemaView rows={attributes} />
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingBottom: 6,
        }}
      >
        <Text style={{ fontSize: 11.5, color: "#9CA3AF", fontWeight: "600" }}>
          {showingText}
        </Text>
      </View>

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </View>
  );
}
