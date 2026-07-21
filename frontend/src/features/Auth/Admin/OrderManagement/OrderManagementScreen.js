import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import DashboardCard from "./components/DashboardCard";
import OrderFilterTabs from "./components/OrderFilterTabs";
import OrderTable from "./components/OrderTable";
import { useLocalization } from "../../../../providers/LocalizationProvider";
import {
  getOrders,
  getOrderStatus,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../../../services/api";
import {
  TEXT_DASHBOARD_TOTAL_ORDERS,
  TEXT_DASHBOARD_PROCESSING,
  TEXT_DASHBOARD_SHIPPING,
  TEXT_DASHBOARD_DELIVERED,
  TEXT_DASHBOARD_CANCELLED,
} from "../../../../constants/i18nKeys";
import styles from "./OrderManagement.styles";

export default function OrderManagementScreen() {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [statusList, setStatusList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Orders");
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  // Modal State for Create / Edit Order
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [code, setCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState("35990000");
  const [statusId, setStatusId] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || (user.role !== "sales_staff" && user.role !== "system_admin" && user.role !== "admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const ordersRes = await getOrders().catch((err) => {
        console.error("getOrders failed:", err);
        return { data: [] };
      });
      const statusRes = await getOrderStatus().catch((err) => {
        console.error("getOrderStatus failed:", err);
        return { data: [] };
      });
      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      setStatusList(Array.isArray(statusRes.data) ? statusRes.data : []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingOrder(null);
    setCode("");
    setCustomerName("");
    setPhone("");
    setAddress("");
    setTotal("15000000");
    setStatusId(1);
    setPaymentMethod("COD");
    setPaymentStatus("Pending");
    setModalVisible(true);
  };

  const handleOpenEditModal = (order) => {
    setEditingOrder(order);
    setCode(order.code || "");
    setCustomerName(order.customerName || "");
    setPhone(order.phone || "");
    setAddress(order.address || "");
    setTotal(String(order.total || 0));
    setStatusId(order.statusId || 1);
    setPaymentMethod(order.paymentMethod || "COD");
    setPaymentStatus(order.paymentStatus || "Pending");
    setModalVisible(true);
  };

  const handleSaveOrder = async () => {
    if (!customerName.trim()) {
      alert("Vui lòng nhập tên khách hàng!");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        isMock: true,
        code: code.trim() || undefined,
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        total: Number(total) || 0,
        statusId: Number(statusId),
        paymentMethod,
        paymentStatus,
      };

      if (editingOrder) {
        await updateOrder(editingOrder.id, payload);
        alert("Cập nhật đơn hàng thành công!");
      } else {
        await createOrder(payload);
        alert("Tạo đơn hàng mới thành công!");
      }

      setModalVisible(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Không thể lưu đơn hàng!");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOrder = async (order) => {
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${order.code}?`);
      if (!confirmDelete) return;
    }

    try {
      await deleteOrder(order.id);
      alert("Đã xóa đơn hàng thành công!");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Xóa đơn hàng thất bại!");
    }
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
        {/* Header Action Row */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Quản lý đơn hàng</Text>

          <TouchableOpacity style={styles.createBtn} onPress={handleOpenCreateModal}>
            <Text style={styles.createBtnText}>+ Tạo đơn hàng mới (Mock)</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Stat Cards */}
        <View style={styles.dashboardRow}>
          <DashboardCard title={t(TEXT_DASHBOARD_TOTAL_ORDERS)} value={totalOrders} />
          <DashboardCard title={t(TEXT_DASHBOARD_PROCESSING)} value={processingCount} />
          <DashboardCard title={t(TEXT_DASHBOARD_SHIPPING)} value={shippingCount} />
          <DashboardCard title={t(TEXT_DASHBOARD_DELIVERED)} value={deliveredCount} />
          <DashboardCard title={t(TEXT_DASHBOARD_CANCELLED)} value={cancelledCount} />
        </View>

        {/* Status Filters */}
        <OrderFilterTabs
          statusList={statusList}
          selected={selectedStatus}
          onChange={setSelectedStatus}
        />

        {/* Order Table */}
        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={{ marginVertical: 30 }} />
        ) : (
          <OrderTable
            orders={
              selectedStatus === 0
                ? orders
                : orders.filter((order) => order.statusId === selectedStatus)
            }
            statusList={statusList}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteOrder}
          />
        )}
      </ScrollView>

      {/* Modal CRUD Đơn Hàng */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingOrder ? `Sửa đơn hàng #${editingOrder.code}` : "Tạo đơn hàng mới (Mock Data)"}
            </Text>

            {/* Field: Order Code */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Mã đơn hàng (Tùy chọn):</Text>
              <TextInput
                style={styles.input}
                placeholder="Ví dụ: ORD-20260701 (Để trống để tự động tạo)"
                value={code}
                onChangeText={setCode}
              />
            </View>

            {/* Field: Customer Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Tên khách hàng:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nguyễn Văn A"
                value={customerName}
                onChangeText={setCustomerName}
              />
            </View>

            {/* Field: Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Số điện thoại:</Text>
              <TextInput
                style={styles.input}
                placeholder="0901234567"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Field: Address */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Địa chỉ giao hàng:</Text>
              <TextInput
                style={styles.input}
                placeholder="123 Trần Duy Hưng, Hà Nội"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Field: Total */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Tổng giá trị (VNĐ):</Text>
              <TextInput
                style={styles.input}
                placeholder="15000000"
                keyboardType="numeric"
                value={total}
                onChangeText={setTotal}
              />
            </View>

            {/* Field: Order Status */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Trạng thái đơn hàng:</Text>
              <View style={styles.optionsRow}>
                {[
                  { id: 1, label: "Đang xử lý (Processing)" },
                  { id: 2, label: "Đang giao (Shipping)" },
                  { id: 3, label: "Đã giao (Delivered)" },
                  { id: 4, label: "Đã hủy (Cancelled)" },
                ].map((st) => (
                  <TouchableOpacity
                    key={st.id}
                    style={[
                      styles.optionChip,
                      statusId === st.id && styles.optionChipSelected,
                    ]}
                    onPress={() => setStatusId(st.id)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        statusId === st.id && styles.optionChipTextSelected,
                      ]}
                    >
                      {st.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Field: Payment Status */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Trạng thái thanh toán:</Text>
              <View style={styles.optionsRow}>
                {["Pending", "Paid", "Failed"].map((ps) => (
                  <TouchableOpacity
                    key={ps}
                    style={[
                      styles.optionChip,
                      paymentStatus === ps && styles.optionChipSelected,
                    ]}
                    onPress={() => setPaymentStatus(ps)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        paymentStatus === ps && styles.optionChipTextSelected,
                      ]}
                    >
                      {ps}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
                disabled={saving}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSaveOrder}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.saveBtnText}>Lưu đơn hàng</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
