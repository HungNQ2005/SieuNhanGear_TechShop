import React from "react";
import {
  TEXT_ORDER_TRACKING_TIMELINE,
} from "../../../constants/i18nKeys";
import { useLocalization } from "../../../providers/LocalizationProvider";
import { View, Text } from "react-native";
import styles from "../styles/OrderTimelineCard.style";

const getDefaultTimeline = (order) => {
  const statusId = Number(order?.statusId) || 1;
  const dateStr = order?.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Hôm nay';

  const steps = [
    {
      title: "Đặt hàng thành công",
      description: `Đơn hàng #${order?.code || ''} đã được tiếp nhận hệ thống.`,
      time: dateStr,
      active: true,
    },
    {
      title: "Đang xử lý & Đóng gói",
      description: "Nhân viên kho đang chuẩn bị và đóng gói sản phẩm.",
      time: statusId >= 1 ? dateStr : "Đang chờ",
      active: statusId >= 1,
    },
    {
      title: "Đang vận chuyển",
      description: "Đơn hàng đã được giao cho đơn vị vận chuyển.",
      time: statusId >= 2 ? dateStr : "Đang chờ",
      active: statusId >= 2,
    },
    {
      title: "Giao hàng thành công",
      description: "Đơn hàng đã giao tới người nhận.",
      time: statusId >= 3 ? dateStr : "Đang chờ",
      active: statusId >= 3,
    },
  ];

  if (statusId === 4) {
    return [
      steps[0],
      {
        title: "Đơn hàng đã bị hủy",
        description: "Đơn hàng này đã được hủy.",
        time: dateStr,
        active: true,
      }
    ];
  }

  return steps;
};

export default function OrderTimelineCard({ order }) {
  const { t } = useLocalization();
  const timeline = (order?.timeline && order.timeline.length > 0) 
    ? order.timeline 
    : getDefaultTimeline(order);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t(TEXT_ORDER_TRACKING_TIMELINE)}</Text>

      {timeline.map((item, index) => (
        <View key={index} style={styles.timelineItem}>
          <View>
            <View style={[styles.dot, !item.active && { backgroundColor: '#cbd5e1' }]} />
            {index < timeline.length - 1 && <View style={styles.line} />}
          </View>

          <View style={styles.box}>
            <Text style={[styles.stepTitle, !item.active && { color: '#64748b' }]}>
              {item?.title || "Đang cập nhật"}
            </Text>

            <Text style={{ color: '#475569', fontSize: 13 }}>{item?.description || ""}</Text>

            <Text style={styles.time}>{item?.time || ""}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
