import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import {
  getOrders,
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

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [shippingCompanies, setShippingCompanies] = useState([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Lay danh sach san pham va trang thai
      const [productRes, statusRes, companyRes] = await Promise.all([
        getProducts().catch(() => ({ data: [] })),
        getOrderStatus().catch(() => ({ data: [] })),
        getShippingCompanies().catch(() => ({ data: [] })),
      ]);

      const productsList = Array.isArray(productRes.data) ? productRes.data : [];
      const statuses = Array.isArray(statusRes.data) ? statusRes.data : [];
      const companies = Array.isArray(companyRes.data) ? companyRes.data : [];

      setStatusList(statuses);
      setShippingCompanies(companies);

      // Lay thong tin don hang
      let targetOrder = null;
      try {
        const orderRes = await getOrderById(id);
        targetOrder = orderRes.data || orderRes;
      } catch (_) {
        // Fallback neu api getById loi, lay danh sach va tim theo id hoac code
        const ordersRes = await getOrders().catch(() => ({ data: [] }));
        const allOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
        targetOrder = allOrders.find(
          (o) => String(o.id) === String(id) || String(o.code) === String(id)
        );
      }

      if (!targetOrder) {
        setLoading(false);
        return;
      }

      setOrder(targetOrder);

      // Lay danh sach chi tiet san pham trong don
      let rawItems = targetOrder.items || [];
      if (!rawItems.length) {
        try {
          const itemsRes = await getOrderItemsByOrder(targetOrder.id);
          rawItems = Array.isArray(itemsRes.data) ? itemsRes.data : [];
        } catch (_) {}
      }

      const mergedItems = rawItems.map((item) => {
        const matchedProd = productsList.find(
          (p) => String(p.id || p._id) === String(item.productId || item.product_id)
        );
        return {
          ...item,
          name: item.name || matchedProd?.name || "Sản phẩm",
          img_URL: item.img_URL || matchedProd?.img_URL || "",
          price: item.price ?? matchedProd?.price ?? 0,
          quantity: item.quantity || 1,
        };
      });

      setItems(mergedItems);
    } catch (err) {
      console.log("Failed to load order detail", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "sales_staff" && user.role !== "system_admin" && user.role !== "admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [loadData, navigate]);

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F3F4F6" }}>
      <Sidebar selected="Orders" />

      <ScrollView style={{ flex: 1, padding: 24 }} showsVerticalScrollIndicator={false}>
        {/* Top Header with Back button */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigate("/admin/orders")}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "700", color: "#374151" }}>
              ← Quay lại danh sách đơn hàng
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={{ padding: 60, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={{ color: "#64748B", marginTop: 12 }}>Đang tải chi tiết đơn hàng...</Text>
          </View>
        ) : !order ? (
          <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#1E293B" }}>
              Không tìm thấy thông tin đơn hàng #{id}
            </Text>
            <TouchableOpacity
              onPress={() => navigate("/admin/orders")}
              style={{ marginTop: 16, backgroundColor: "#2563EB", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Quay lại danh sách</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <OrderDetailHeader order={order} statusList={statusList} />

            <OrderTimelineCard order={order} />

            <View style={styles.content}>
              <View style={styles.left}>
                <OrderProductTable items={items} />
              </View>

              <View style={styles.right}>
                <CustomerInfoCard customer={order} />
                <View style={{ height: 20 }} />
                <PaymentSummaryCard order={order} items={items} />
              </View>
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
