import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const resolveImageUri = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.replace(/\\/g, "/");
  const formatted = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `http://localhost:3521${formatted}`;
};

export default function OrderInformation() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchMyOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/api/orders/my');
            const list = res.data?.data || res.data || [];
            
            // Enrich orders with item details if missing
            const enrichedOrders = await Promise.all(
              (Array.isArray(list) ? list : []).map(async (order) => {
                if (order.items && order.items.length > 0) return order;
                try {
                  const itemRes = await api.get(`/api/orderItems?orderId=${order.id || order._id}`);
                  const items = itemRes.data || [];
                  return { ...order, items };
                } catch (e) {
                  return order;
                }
              })
            );

            setOrders(enrichedOrders);
        } catch (err) {
            console.error("Fetch orders failed:", err);
            setError("Không thể tải lịch sử đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const getStatusText = (statusId) => {
        switch (Number(statusId)) {
          case 1: return "Chờ xử lý";
          case 2: return "Đang giao hàng";
          case 3: return "Đã giao hàng";
          case 4: return "Đã hủy";
          default: return "Chờ xử lý";
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lịch sử đơn hàng ({orders.length})</Text>

            {orders.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyIcon}>📦</Text>
                    <Text style={styles.emptyTitle}>Chưa có đơn hàng nào</Text>
                    <Text style={styles.emptyDesc}>
                        Bạn chưa đặt mua đơn hàng nào. Hãy khám phá ngay hàng ngàn sản phẩm công nghệ hot!
                    </Text>
                    <TouchableOpacity style={styles.shopBtn} onPress={() => navigate(ROUTES.HOME)}>
                        <Text style={styles.shopBtnText}>Mua sắm ngay</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.list}>
                    {orders.map((order) => {
                        const orderId = order.id || order._id;
                        const code = order.code || `ORD-${orderId}`;
                        const total = (Number(order.totalPrice) || Number(order.total) || 0).toLocaleString('vi-VN') + 'đ';
                        const statusName = getStatusText(order.statusId || order.status);
                        const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : '';
                        const items = order.items || [];

                        return (
                            <View key={orderId} style={styles.card}>
                                {/* Header */}
                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.orderCode}>Mã đơn: #{code}</Text>
                                        <Text style={styles.orderDate}>Ngày đặt: {dateStr}</Text>
                                    </View>
                                    
                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{statusName}</Text>
                                    </View>
                                </View>

                                {/* Delivery Info */}
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoText}>📍 Địa chỉ: {order.address || 'N/A'}</Text>
                                    <Text style={styles.infoText}>📞 SĐT: {order.phone || 'N/A'}</Text>
                                    <Text style={styles.infoText}>💳 Thanh toán: {order.paymentMethod || 'COD'}</Text>
                                </View>

                                {/* Products List */}
                                {items.length > 0 && (
                                    <View style={styles.productsBox}>
                                        <Text style={styles.productsBoxTitle}>Sản phẩm trong đơn ({items.length}):</Text>
                                        {items.map((item, idx) => (
                                            <View key={idx} style={styles.productRow}>
                                                <Image 
                                                    source={{ uri: resolveImageUri(item.image || item.img_URL) }} 
                                                    style={styles.productImg} 
                                                />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.productName} numberOfLines={2}>
                                                        {item.productName || item.name || "Sản phẩm công nghệ"}
                                                    </Text>
                                                    <Text style={styles.productQty}>Số lượng: x{item.quantity || 1}</Text>
                                                </View>
                                                <Text style={styles.productPrice}>
                                                    {(Number(item.price) || 0).toLocaleString('vi-VN')}đ
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {/* Footer & Action */}
                                <View style={styles.cardFooter}>
                                    <View>
                                        <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                                        <Text style={styles.totalPrice}>{total}</Text>
                                    </View>

                                    <TouchableOpacity 
                                        style={styles.detailBtn} 
                                        onPress={() => navigate(`/order?code=${code}`)}
                                    >
                                        <Text style={styles.detailBtnText}>Chi tiết hành trình ➔</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        minHeight: 500,
    },
    center: {
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 24,
    },
    emptyBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
        color: '#cbd5e1',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 8,
    },
    emptyDesc: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        maxWidth: 400,
        marginBottom: 24,
    },
    shopBtn: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
    },
    shopBtnText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 15,
    },
    list: {
        gap: 20,
    },
    card: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 16,
        padding: 18,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        marginBottom: 12,
    },
    orderCode: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563eb',
    },
    orderDate: {
        fontSize: 13,
        color: '#64748b',
        marginTop: 2,
    },
    statusBadge: {
        backgroundColor: '#eff6ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#bfdbfe',
    },
    statusText: {
        color: '#2563eb',
        fontWeight: '700',
        fontSize: 13,
    },
    infoRow: {
        gap: 4,
        marginBottom: 16,
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 10,
    },
    infoText: {
        fontSize: 13,
        color: '#475569',
    },
    productsBox: {
        marginBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 12,
    },
    productsBoxTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 10,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    productImg: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f8fafc',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
    },
    productQty: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563eb',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    totalLabel: {
        fontSize: 12,
        color: '#64748b',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
    },
    detailBtn: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },
    detailBtnText: {
        color: '#2563eb',
        fontWeight: '700',
        fontSize: 13,
    },
});