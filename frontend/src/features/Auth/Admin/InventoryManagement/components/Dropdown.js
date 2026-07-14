import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconChevronDownGray } from "../../../../../constants/icons";

export default function Dropdown({ icon, label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <View
      style={{
        position: "relative",
        zIndex: open ? 20 : 1,
        overflow: "visible",
      }}
    >
      <TouchableOpacity
        onPress={() => setOpen((o) => !o)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 14,
          backgroundColor: "#fff",
        }}
      >
        {icon}
        <Text style={{ color: "#374151", fontWeight: "600", fontSize: 13 }}>
          {selected ? selected.label : label}
        </Text>
        <IconChevronDownGray />
      </TouchableOpacity>

      {open && (
        <View
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            minWidth: 200,
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
          }}
        >
          {options.map((opt) => (
            <TouchableOpacity
              key={String(opt.value)}
              onPress={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                backgroundColor:
                  opt.value === value ? "#EFF6FF" : "transparent",
              }}
            >
              <Text
                style={{
                  color: opt.value === value ? "#2563EB" : "#374151",
                  fontWeight: opt.value === value ? "700" : "500",
                  fontSize: 13,
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
