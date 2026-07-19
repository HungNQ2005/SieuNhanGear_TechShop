import React from "react";
import { View } from "react-native";
import {
  IconKeyboardDevice,
  IconMouseDevice,
  IconMonitorDevice,
  IconHeadphoneDevice,
  IconComputerDevice,
} from "../../../../../../constants/icons";

export const CATEGORY_ICON_OPTIONS = [
  { value: "keyboard", Icon: IconKeyboardDevice },
  { value: "mouse", Icon: IconMouseDevice },
  { value: "monitor", Icon: IconMonitorDevice },
  { value: "headphone", Icon: IconHeadphoneDevice },
  { value: "computer", Icon: IconComputerDevice },
];

const ICON_MAP = CATEGORY_ICON_OPTIONS.reduce((acc, opt) => {
  acc[opt.value] = opt.Icon;
  return acc;
}, {});

export default function CategoryIconBadge({ icon, size = 40, iconSize = 19 }) {
  const Icon = ICON_MAP[icon] || IconKeyboardDevice;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon color="#2563EB" size={iconSize} />
    </View>
  );
}
