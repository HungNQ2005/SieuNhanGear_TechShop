import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrderById,
  getOrderItemsByOrder,
  getProducts,
  getOrderStatus,
  getShippingCompanies,
} from "../../../../../services/api";

import styles from "./OrderDetail.styles";

import OrderDetailHeader from "./components/OrderDetailHeader";
import OrderTimelineCard from "./components/OrderTimelineCard";
import OrderProductTable from "./components/OrderProductTable";
import CustomerInfoCard from "./components/CustomerInfoCard";
import PaymentSummaryCard from "./components/PaymentSummaryCard";

export default function OrderDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [shippingCompanies, setShippingCompanies] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "sales_staff" && user.role !== "system_admin" && user.role !== "admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [id, navigate]);

  async function loadData() {
    try {
      const [orderRes, itemRes, productRes, statusRes, companyRes] =
        await Promise.all([
          getOrderById(id),
          getOrderItemsByOrder(id),
          getProducts(),
          getOrderStatus(),
          getShippingCompanies(),
        ]);

      const mergeItems = itemRes.data.map((item) => {
        const product = productRes.data.find((p) => p.id === item.productId);

        return {
          ...item,

          ...product,
        };
      });

      setOrder(orderRes.data);

      setItems(mergeItems);

      setStatusList(statusRes.data);

      setShippingCompanies(companyRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!order) return null;

  return (
    <View style={styles.container}>
      <OrderDetailHeader order={order} statusList={statusList} />

      <OrderTimelineCard order={order} />

      <View style={styles.content}>
        <View style={styles.left}>
          <OrderProductTable items={items} />
        </View>

        <View style={styles.right}>
          <CustomerInfoCard customer={order} />

          <PaymentSummaryCard order={order} items={items} />
        </View>
      </View>
    </View>
  );
}
