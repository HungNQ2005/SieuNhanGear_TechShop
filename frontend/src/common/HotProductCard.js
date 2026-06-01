// HotProductCard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getProducts } from '../services/api'; // API giả định, sau này sẽ thay đổi dựa vào backend chính thức
import TextIntl from '../common/TextIntl';
import {
    TEXT_HOME_HOT_PRODUCT,
} from '../constants/i18nKeys';

export default function HotProductCard() {
    const [hotProduct, setHotProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const IconLightning = () => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff443b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" />
        </svg>
    );

    useEffect(() => {
        const fetchHotProduct = async () => {
            try {
                const response = await getProducts();
                const products = response.data;
                if (products && products.length > 0) {
                    const maxRating = Math.max(...products.map(p => p.rating));
                    const topRatedProducts = products.filter(p => p.rating === maxRating);
                    const randomIndex = Math.floor(Math.random() * topRatedProducts.length);
                    setHotProduct(topRatedProducts[randomIndex]);
                }
            } catch (error) {
                console.error('Failed to fetch hot product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotProduct();
    }, []);

    if (loading) {
        return (
            <View style={styles.card}>
                <ActivityIndicator size="small" color="#999" />
            </View>
        );
    }

    if (!hotProduct) {
        return (
            <View style={styles.card}>
                <Text style={styles.errorText}>No products available</Text>
            </View>
        );
    }

    const formattedPrice = hotProduct.price.toLocaleString('vi-VN') + ' ₫';

    return (
        <View style={styles.card}>
            <View style={styles.hotProduct1}>
                <IconLightning />
                <TextIntl tx={TEXT_HOME_HOT_PRODUCT} style={styles.hotProduct} />
            </View>
            <Text style={styles.productName} numberOfLines={2}>
                {hotProduct.name}
            </Text>
            <Text style={styles.productPrice}>{formattedPrice}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingValue}>{hotProduct.rating}/5</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    hotProduct: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#c7c7c7',
        marginBottom: 4,
    },
    hotProduct1: {
        flexDirection: 'row',
        gap: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0066ff',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingStar: {
        fontSize: 16,
        color: '#f5b042',
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#c2c2c2',
    },
    errorText: {
        color: '#ef4444',
        textAlign: 'center',
    },
});