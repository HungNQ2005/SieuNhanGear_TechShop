import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";

import Sidebar from "../Sidebar";
import DashboardCard from "./components/DashboardCard";
import OrderFilterTabs from "./components/OrderFilterTabs";
import OrderTable from "./components/OrderTable";
import { useLocalization } from "../../../../providers/LocalizationProvider";
import { getOrders, getOrderStatus } from "../../../../services/api";
import {
  TEXT_DASHBOARD_TOTAL_ORDERS,
  TEXT_DASHBOARD_PROCESSING,
  TEXT_DASHBOARD_SHIPPING,
  TEXT_DASHBOARD_DELIVERED,
  TEXT_DASHBOARD_CANCELLED,
} from "../../../../constants/i18nKeys";
import styles from "./OrderManagement.styles";

export default function OrderManagementScreen() {
  const [statusList, setStatusList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Orders");
  const { t } = useLocalization();
  const [orders, setOrders] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState(0);
  useEffect(() => {
    loadData();
  }, []);
  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadData = async () => {
    const [ordersRes, statusRes] = await Promise.all([
      getOrders(),

      getOrderStatus(),
    ]);

    setOrders(ordersRes.data);

    setStatusList(statusRes.data);
  };
  const totalOrders = orders.length;

  const processingCount = orders.filter((order) => order.statusId === 1).length;

  const shippingCount = orders.filter((order) => order.statusId === 2).length;

  const deliveredCount = orders.filter((order) => order.statusId === 3).length;

  const cancelledCount = orders.filter((order) => order.statusId === 4).length;
  return (
    <View style={styles.container}>
      <Sidebar selected={selectedMenu} onSelect={setSelectedMenu} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboardRow}>
          <DashboardCard title={t(TEXT_DASHBOARD_TOTAL_ORDERS)} value={totalOrders} />

          <DashboardCard title={t(TEXT_DASHBOARD_PROCESSING)} value={processingCount} />

          <DashboardCard title={t(TEXT_DASHBOARD_SHIPPING)} value={shippingCount} />

          <DashboardCard title={t(TEXT_DASHBOARD_DELIVERED)} value={deliveredCount} />

          <DashboardCard title={t(TEXT_DASHBOARD_CANCELLED)} value={cancelledCount} />
        </View>

        <OrderFilterTabs
          statusList={statusList}
          selected={selectedStatus}
          onChange={setSelectedStatus}
        />

        <OrderTable
          orders={
            selectedStatus === 0
              ? orders
              : orders.filter((order) => order.statusId === selectedStatus)
          }
          statusList={statusList}
        />
      </ScrollView>
    </View>
  );
}
