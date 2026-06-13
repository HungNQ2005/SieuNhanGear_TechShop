import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ActivityIndicator, } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { API } from '../constants/apiURL';
import TextIntl from './TextIntl';
import api from '../services/api';
import {
    TEXT_HOME_FLASH_SALE_TITLE,
    TEXT_HOME_FLASH_SALE_SUBTITLE,
    TEXT_HOME_FLASH_SALE_BUY_NOW,
    TEXT_HOME_FLASH_SALE_ALL_DEAL,
    TEXT_HOME_FLASH_SALE_SOLD,
} from '../constants/i18nKeys';
import {
    IconLightning,
} from '../constants/icons';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatPrice = (price) => price?.toLocaleString('vi-VN') + '₫';

const CountdownTimer = () => {
    const targetTime = useMemo(() => new Date().getTime() + 2 * 60 * 60 * 1000, []);
    const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetTime - now;
            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [targetTime]);

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <View style={styles.timerContainer}>
            {/* Timer giả định */}
            <View style={styles.timeBlock}><Text style={styles.timeText}>02</Text></View>
            <View style={styles.timeBlock}><Text style={styles.timeText}>{pad(timeLeft.hours)}</Text></View>
            <View style={styles.timeBlock}><Text style={styles.timeText}>{pad(timeLeft.minutes)}</Text></View>
            <View style={styles.timeBlock}><Text style={styles.timeText}>{pad(timeLeft.seconds)}</Text></View>
        </View>
    );
};

export default function FlashSale({ onAddToCart, onViewAll }) {
    const [flashProducts, setFlashProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                const allProducts = response.data;
                if (allProducts?.length) {
                    const shuffled = [...allProducts];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    const selected = shuffled.slice(0, 5);
                    const enriched = selected.map(product => {
                        const originalPrice = product.price || 15500000;
                        const discountPercent = randomInt(10, 25);
                        return {
                            ...product,
                            price: originalPrice,
                            flashPrice: Math.round(originalPrice * (1 - discountPercent / 100)), // Giá sale mới
                            sold: randomInt(100, 2000),
                            maxStock: 2500
                        };
                    });
                    setFlashProducts(enriched);
                }
            } catch (error) {
                console.error('Lỗi lấy sản phẩm flash sale:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0066ff" style={{ marginVertical: 40 }} />;
    if (!flashProducts.length) return null;

    return (
        <View style={styles.container}>
            {/* Banner Header chính */}
            <View style={styles.headerRow}>
                <View style={styles.headerLeft}>
                    <CountdownTimer />
                    <View style={styles.titleContainer}>
                        <View style={styles.titleLogo}>
                            <IconLightning />
                            <TextIntl tx={TEXT_HOME_FLASH_SALE_TITLE} style={styles.title} />
                        </View>
                        <TextIntl tx={TEXT_HOME_FLASH_SALE_SUBTITLE} style={styles.subtitle} />
                    </View>
                </View>
                <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
                    <TextIntl tx={TEXT_HOME_FLASH_SALE_ALL_DEAL} style={styles.viewAllText} />
                </TouchableOpacity>
            </View>

            {/* Danh sách sản phẩm cuộn ngang */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {flashProducts.map((item) => {
                    const progressWidth = Math.min((item.sold / item.maxStock) * 100, 100);

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.productCard}
                            onPress={() => navigate(ROUTES.PRODUCT_PAGE.replace(':id', item.id))}
                            activeOpacity={0.92}
                        >
                            {/* Khung ảnh & Badge Flash Sale */}
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={
                                        item.img_URL
                                            ? { uri: `${API.BASE_API_URL}${item.img_URL}` }
                                            : require('../../assets/placeholder.png')
                                    }
                                    style={styles.productImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.flashBadge}>
                                    <Text style={styles.flashBadgeText}>FLASH SALE</Text>
                                </View>
                            </View>

                            {/* Thông tin sản phẩm */}
                            <View style={styles.productInfo}>
                                <Text style={styles.productName} numberOfLines={2}>
                                    {item.name}
                                </Text>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.salePrice}>{formatPrice(item.flashPrice)}</Text>
                                    <Text style={styles.originalPrice}>{formatPrice(item.price)}</Text>
                                </View>

                                {/* Thanh Trạng thái Đã bán (Progress Bar) */}
                                <View style={styles.progressContainer}>
                                    <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
                                </View>

                                <View style={styles.soldText}>
                                    <TextIntl tx={TEXT_HOME_FLASH_SALE_SOLD} style={styles.soldText} />
                                    <Text style={styles.soldText}>{item.sold}</Text>
                                </View>
                                {/* Nút Mua Ngay */}
                                <TouchableOpacity
                                    style={styles.buyButton}
                                    onPress={() => onAddToCart?.(item)}
                                    activeOpacity={0.8}
                                >
                                    <TextIntl tx={TEXT_HOME_FLASH_SALE_BUY_NOW} style={styles.buyButtonText} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0066FF',
        marginHorizontal: 32,
        marginVertical: 12,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        gap: 10,
    },
    titleContainer: {
        marginTop: 4,
    },
    titleLogo: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 12,
        color: '#E0F2FE',
        opacity: 0.9,
        marginTop: 2,
    },
    timerContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 6,
    },
    timeBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        width: 54,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        color: '#0066FF',
        fontSize: 15,
        fontWeight: '800',
    },
    viewAllButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
    },
    viewAllText: {
        color: '#0066FF',
        fontWeight: '700',
        fontSize: 13,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    productCard: {
        backgroundColor: '#FFFFFF',
        width: 280,
        height: 320,
        borderRadius: 16,
        padding: 10,
        flexDirection: 'column',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F8FAFC',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    flashBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: '#EF4444',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
    flashBadgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '800',
    },
    productInfo: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1E293B',
        height: 36,
        lineHeight: 18,
    },
    priceContainer: {
        marginVertical: 6,
    },
    salePrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0066FF',
    },
    originalPrice: {
        fontSize: 11,
        color: '#94A3B8',
        textDecorationLine: 'line-through',
        marginTop: 1,
    },
    progressContainer: {
        height: 6,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        overflow: 'hidden',
        marginTop: 4,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#0066FF',
        borderRadius: 3,
    },
    soldText: {
        flexDirection: 'row',
        gap: 4,
        fontSize: 10,
        color: '#64748B',
        marginTop: 4,
        marginBottom: 8,
    },
    // Nút Mua ngay
    buyButton: {
        backgroundColor: '#0066FF',
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 12,
    },
});