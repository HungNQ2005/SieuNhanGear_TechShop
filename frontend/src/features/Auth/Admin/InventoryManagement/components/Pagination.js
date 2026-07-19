import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalization } from "../../../../../providers/LocalizationProvider";
import { TEXT_PREVIOUS, TEXT_NEXT } from "../../../../../constants/i18nKeys";
import {
  IconChevronLeftSmall,
  IconChevronRightSmall,
} from "../../../../../constants/icons";

function buildPageList(current, totalPages) {
  const pages = [];
  const push = (p) => {
    if (!pages.includes(p)) pages.push(p);
  };

  push(1);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p > 1 && p < totalPages) push(p);
  }
  if (totalPages > 1) push(totalPages);

  const withEllipsis = [];
  let prev = 0;
  for (const p of pages.sort((a, b) => a - b)) {
    if (prev && p - prev > 1) withEllipsis.push("...");
    withEllipsis.push(p);
    prev = p;
  }
  return withEllipsis;
}

export default function Pagination({ page, totalPages, onChange }) {
  const { t } = useLocalization();
  if (totalPages <= 1) return null;

  const pageList = buildPageList(page, totalPages);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        disabled={page === 1}
        onPress={() => onChange(page - 1)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          opacity: page === 1 ? 0.4 : 1,
        }}
      >
        <IconChevronLeftSmall />
        <Text style={{ fontSize: 13, fontWeight: "600", color: "#374151" }}>
          {t(TEXT_PREVIOUS)}
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {pageList.map((p, idx) =>
          p === "..." ? (
            <Text key={`e-${idx}`} style={{ color: "#9CA3AF", paddingHorizontal: 4 }}>
              …
            </Text>
          ) : (
            <TouchableOpacity
              key={p}
              onPress={() => onChange(p)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: p === page ? "#2563EB" : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: p === page ? "#fff" : "#374151",
                }}
              >
                {p}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <TouchableOpacity
        disabled={page === totalPages}
        onPress={() => onChange(page + 1)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          opacity: page === totalPages ? 0.4 : 1,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "600", color: "#374151" }}>
          {t(TEXT_NEXT)}
        </Text>
        <IconChevronRightSmall />
      </TouchableOpacity>
    </View>
  );
}
