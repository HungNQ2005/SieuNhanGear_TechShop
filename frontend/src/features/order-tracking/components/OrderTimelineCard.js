import React from "react";
import {
  TEXT_ORDER_TRACKING_TITLE,
  TEXT_ORDER_TRACKING_EMPTY_TITLE,
  TEXT_ORDER_TRACKING_EMPTY_DESCRIPTION,
  TEXT_ORDER_TRACKING_TIMELINE,
  TEXT_ORDER_TRACKING_EMPTY_TIMELINE
} from "../../../constants/i18nKeys";
import { useLocalization } from "../../../providers/LocalizationProvider";
import { View, Text } from "react-native";

import styles from "../styles/OrderTimelineCard.style";

export default function OrderTimelineCard({ order }) {
  const { t } = useLocalization();
  const timeline = order?.timeline || [];

  if (timeline.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{t(TEXT_ORDER_TRACKING_TIMELINE)}</Text>

        <Text>{t(TEXT_ORDER_TRACKING_EMPTY_TIMELINE)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t(TEXT_ORDER_TRACKING_TIMELINE)}</Text>

      {timeline.map((item, index) => (
        <View key={index} style={styles.timelineItem}>
          <View>
            <View style={styles.dot} />

            {index < timeline.length - 1 && <View style={styles.line} />}
          </View>

          <View style={styles.box}>
            <Text style={styles.stepTitle}>
              {item?.title || "Đang cập nhật"}
            </Text>

            <Text>{item?.description || ""}</Text>

            <Text style={styles.time}>{item?.time || ""}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
