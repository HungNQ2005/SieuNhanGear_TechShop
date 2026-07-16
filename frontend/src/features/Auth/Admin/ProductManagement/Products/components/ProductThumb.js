import React, { useState } from "react";
import { View, Image } from "react-native";
import { API } from "../../../../../../constants/apiURL";
import { IconPackageDevice } from "../../../../../../constants/icons";

function resolveUri(imgUrl) {
  if (!imgUrl) return null;
  if (/^https?:\/\//i.test(imgUrl)) return imgUrl;
  return `${API.BASE_API_URL}${imgUrl}`;
}

export default function ProductThumb({ imgUrl, size = 44 }) {
  const [failed, setFailed] = useState(false);
  const uri = resolveUri(imgUrl);

  if (!uri || failed) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.26,
          backgroundColor: "#F3F4F6",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconPackageDevice color="#9CA3AF" size={size * 0.45} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      onError={() => setFailed(true)}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        backgroundColor: "#F3F4F6",
      }}
    />
  );
}
