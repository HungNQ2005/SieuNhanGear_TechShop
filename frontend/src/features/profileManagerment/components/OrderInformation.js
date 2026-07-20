import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

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
            setOrders(Array.isArray(list) ? list : []);
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

    const getStatusText = (status) => {
        if (!status) return "Chờ xử lý";
        if (typeof status === "object") return status.name || "Chờ xử lý";
        return status;
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
                        const statusName = getStatusText(order.status);
                        const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : '';

                        return (
                            <View key={orderId} style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.orderCode}>Mã đơn: #{code}</Text>
                                    <Text style={styles.orderDate}>{dateStr}</Text>
                                </View>

                                <View style={styles.cardBody}>
                                    <Text style={styles.infoText}>Địa chỉ: {order.address || 'N/A'}</Text>
                                    <Text style={styles.infoText}>SĐT: {order.phone || 'N/A'}</Text>
                                    <Text style={styles.infoText}>Thanh toán: {order.paymentMethod || 'COD'}</Text>
                                </View>

                                <View style={styles.cardFooter}>
                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{statusName}</Text>
                                    </View>
                                    <Text style={styles.totalPrice}>Tổng tiền: {total}</Text>
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
        gap: 16,
    },
    card: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
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
    },
    cardBody: {
        gap: 6,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 14,
        color: '#334155',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    statusBadge: {
        backgroundColor: '#eff6ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: 13,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0f172a',
    },
});