import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useParams } from "react-router-dom";
import axios from "axios";

import { API } from "../../../../../constants/apiURL";

import styles from "./OrderDetail.styles";

import OrderDetailHeader from "./components/OrderDetailHeader";
import OrderTimelineCard from "./components/OrderTimelineCard";
import OrderProductTable from "./components/OrderProductTable";
import CustomerInfoCard from "./components/CustomerInfoCard";
import PaymentSummaryCard from "./components/PaymentSummaryCard";

export default function OrderDetailScreen() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [shippingCompanies, setShippingCompanies] = useState([]);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      const [orderRes, itemRes, productRes, statusRes, companyRes] =
        await Promise.all([
          axios.get(`${API.BASE_API_URL}${API.GET_ORDER_BY_ID(id)}`),
          axios.get(`${API.BASE_API_URL}${API.GET_ORDER_ITEMS_BY_ORDER(id)}`),
          axios.get(`${API.BASE_API_URL}${API.GET_PRODUCT}`),
          axios.get(`${API.BASE_API_URL}${API.GET_ORDER_STATUS}`),
          axios.get(`${API.BASE_API_URL}${API.GET_SHIPPING_COMPANIES}`),
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
