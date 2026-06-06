import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ROUTES } from '../../constants/routes';
import { useCart } from '../../store/CartContext';
import { useLocalization } from '../../providers/LocalizationProvider';
import TextIntl from '../../common/TextIntl';
import {
    TEXT_PRODUCT_PAGE_BACK,
    TEXT_PRODUCT_PAGE_ADD_TO_CART,
    TEXT_PRODUCT_PAGE_BUY_NOW,
    TEXT_PRODUCT_PAGE_DESCRIPTION,
    TEXT_PRODUCT_PAGE_SPECS,
    TEXT_PRODUCT_PAGE_MANUFACTURER,
    TEXT_PRODUCT_PAGE_CATEGORY,
    TEXT_PRODUCT_PAGE_RATING,
    TEXT_PRODUCT_PAGE_NOT_FOUND,
    TEXT_PRODUCT_PAGE_ERROR,
    TEXT_PRODUCT_PAGE_IN_STOCK,
    TEXT_PRODUCT_PAGE_WARRANTY,
    TEXT_PRODUCT_PAGE_FREE_SHIP,
} from '../../constants/i18nKeys';

// ─── Icon helpers ────────────────────────────────────────────────────────────

const IconBack = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);

const IconCart = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const IconShield = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const IconTruck = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

const IconCheck = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating }) {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return (
        <View style={styles.starsRow}>
            {Array.from({ length: 5 }, (_, i) => {
                let star = '☆';
                if (i < full) star = '★';
                else if (i === full && hasHalf) star = '⯨';
                return (
                    <Text key={i} style={[styles.star, star !== '☆' ? styles.starFilled : styles.starEmpty]}>
                        {star}
                    </Text>
                );
            })}
            <Text style={styles.ratingNum}>{rating}/5</Text>
        </View>
    );
}

// ─── Spec Row ────────────────────────────────────────────────────────────────

function SpecRow({ label, value, last }) {
    return (
        <View style={[styles.specRow, last && styles.specRowLast]}>
            <Text style={styles.specLabel}>{label}</Text>
            <Text style={styles.specValue}>{value}</Text>
        </View>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { locale } = useLocalization();

    const [product, setProduct] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);

        Promise.all([
            api.get(`/products/${id}`),
            api.get(ROUTES.GET_MANUFACTURER),
            api.get(ROUTES.GET_CATEGORY),
        ])
            .then(([prodRes, manRes, catRes]) => {
                const prod = prodRes.data;
                setProduct(prod);

                const mans = Array.isArray(manRes.data) ? manRes.data : [];
                const cats = Array.isArray(catRes.data) ? catRes.data : [];

                setManufacturer(mans.find(m => String(m.id) === String(prod.manufacturer_id)) || null);
                setCategory(cats.find(c => String(c.id) === String(prod.category_id)) || null);
            })
            .catch(() => setError('error'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const formatPrice = (price) =>
        price?.toLocaleString('vi-VN') + 'đ';

    // ── Loading ──
    if (loading) {
        return (
            <View style={styles.centerScreen}>
                <ActivityIndicator size="large" color="#0066ff" />
            </View>
        );
    }

    // ── Error ──
    if (error || !product) {
        return (
            <View style={styles.centerScreen}>
                <Text style={styles.errorText}>
                    {error ? <TextIntl tx={TEXT_PRODUCT_PAGE_ERROR} /> : <TextIntl tx={TEXT_PRODUCT_PAGE_NOT_FOUND} />}
                </Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigate(ROUTES.HOME)}>
                    <TextIntl tx={TEXT_PRODUCT_PAGE_BACK} style={styles.backBtnText} />
                </TouchableOpacity>
            </View>
        );
    }

    const categoryDescription = locale === 'vi'
        ? category?.description_vi
        : category?.description_en;

    const manufacturerDescription = locale === 'vi'
        ? manufacturer?.description_vi
        : manufacturer?.description_en;

    return (
        <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>

            {/* ── Breadcrumb / Back ── */}
            <View style={styles.breadcrumbRow}>
                <TouchableOpacity style={styles.backLink} onPress={() => navigate(-1)}>
                    <IconBack />
                    <TextIntl tx={TEXT_PRODUCT_PAGE_BACK} style={styles.backLinkText} />
                </TouchableOpacity>
                {category && (
                    <Text style={styles.breadcrumbCategory}>/ {category.name}</Text>
                )}
            </View>

            {/* ── Main Product Section ── */}
            <View style={styles.productSection}>

                {/* Left: Image */}
                <View style={styles.imageWrapper}>
                    {product.img_URL ? (
                        <Image
                            source={{ uri: `${ROUTES.BASE_API_URL}${product.img_URL}` }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>No Image</Text>
                        </View>
                    )}

                    {/* Badges over image */}
                    {manufacturer && (
                        <View style={styles.brandBadge}>
                            <Text style={styles.brandBadgeText}>{manufacturer.name.toUpperCase()}</Text>
                        </View>
                    )}
                </View>

                {/* Right: Info */}
                <View style={styles.infoWrapper}>

                    {/* Manufacturer + Category tags */}
                    <View style={styles.tagRow}>
                        {manufacturer && (
                            <Text style={styles.tagManufacturer}>{manufacturer.name}</Text>
                        )}
                        {category && (
                            <Text style={styles.tagCategory}>{category.name}</Text>
                        )}
                    </View>

                    {/* Product name */}
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                        <StarRating rating={product.rating} />
                        <Text style={styles.ratingLabel}>
                            <TextIntl tx={TEXT_PRODUCT_PAGE_RATING} />
                        </Text>
                    </View>

                    {/* Price */}
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>

                    {/* Trust badges */}
                    <View style={styles.trustRow}>
                        <View style={styles.trustItem}>
                            <IconCheck />
                            <TextIntl tx={TEXT_PRODUCT_PAGE_IN_STOCK} style={styles.trustText} />
                        </View>
                        <View style={styles.trustItem}>
                            <IconShield />
                            <TextIntl tx={TEXT_PRODUCT_PAGE_WARRANTY} style={styles.trustText} />
                        </View>
                        <View style={styles.trustItem}>
                            <IconTruck />
                            <TextIntl tx={TEXT_PRODUCT_PAGE_FREE_SHIP} style={styles.trustText} />
                        </View>
                    </View>

                    {/* Description */}
                    {product.description && (
                        <View style={styles.descBlock}>
                            <TextIntl tx={TEXT_PRODUCT_PAGE_DESCRIPTION} style={styles.descTitle} />
                            <Text style={styles.descText}>{product.description}</Text>
                        </View>
                    )}

                    {/* Action buttons */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={[styles.addToCartBtn, addedToCart && styles.addedBtn]}
                            onPress={handleAddToCart}
                            activeOpacity={0.85}
                        >
                            <IconCart />
                            <Text style={styles.addToCartText}>
                                <TextIntl tx={TEXT_PRODUCT_PAGE_ADD_TO_CART} />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buyNowBtn}
                            onPress={() => {
                                addToCart(product);
                                navigate(ROUTES.HOME); // Sau này chỉnh lại đến trang mua hàng chứ giờ nó dẫn về homepage
                            }}
                            activeOpacity={0.85}
                        >
                            <TextIntl tx={TEXT_PRODUCT_PAGE_BUY_NOW} style={styles.buyNowText} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ── Specs Table ── */}
            <View style={styles.specsSection}>
                <TextIntl tx={TEXT_PRODUCT_PAGE_SPECS} style={styles.specsTitle} />
                <View style={styles.specsTable}>
                    {manufacturer && (
                        <SpecRow
                            label={<TextIntl tx={TEXT_PRODUCT_PAGE_MANUFACTURER} />}
                            value={`${manufacturer.name}${manufacturerDescription ? ' — ' + manufacturerDescription : ''}`}
                        />
                    )}
                    {category && (
                        <SpecRow
                            label={<TextIntl tx={TEXT_PRODUCT_PAGE_CATEGORY} />}
                            value={`${category.name}${categoryDescription ? ' — ' + categoryDescription : ''}`}
                        />
                    )}
                    <SpecRow label="Rating" value={`${product.rating} / 5 ★`} />
                </View>
            </View>

        </ScrollView>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    pageContent: {
        maxWidth: 1100,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 60,
    },

    // Center screen (loading / error)
    centerScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
        gap: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        textAlign: 'center',
    },
    backBtn: {
        backgroundColor: '#0066ff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backBtnText: {
        color: '#fff',
        fontWeight: '600',
    },

    // Breadcrumb
    breadcrumbRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    backLinkText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    breadcrumbCategory: {
        fontSize: 14,
        color: '#9ca3af',
    },

    // Product section
    productSection: {
        flexDirection: 'row',
        gap: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 4,
        marginBottom: 24,
        flexWrap: 'wrap',
    },

    // Image
    imageWrapper: {
        flex: 1,
        minWidth: 280,
        position: 'relative',
        backgroundColor: '#F1F5F9',
        borderRadius: 14,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 320,
    },
    productImage: {
        width: '100%',
        height: 340,
    },
    imagePlaceholder: {
        width: '100%',
        height: 340,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8ecf0',
    },
    imagePlaceholderText: {
        color: '#9ca3af',
        fontSize: 16,
    },
    brandBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#0066ff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    brandBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    // Info
    infoWrapper: {
        flex: 1,
        minWidth: 280,
        gap: 14,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    tagManufacturer: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0066ff',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        backgroundColor: '#eff6ff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    tagCategory: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64748b',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    productName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0f172a',
        lineHeight: 34,
    },

    // Rating
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    star: {
        fontSize: 16,
    },
    starFilled: {
        color: '#f59e0b',
    },
    starEmpty: {
        color: '#d1d5db',
    },
    ratingNum: {
        fontSize: 14,
        fontWeight: '700',
        color: '#374151',
        marginLeft: 4,
    },
    ratingLabel: {
        fontSize: 13,
        color: '#9ca3af',
    },

    // Price
    price: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0066ff',
    },

    // Trust badges
    trustRow: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f1f5f9',
    },
    trustItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    trustText: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '500',
    },

    // Description
    descBlock: {
        gap: 6,
    },
    descTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    descText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 22,
    },

    // Actions
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
        marginTop: 6,
    },
    addToCartBtn: {
        flex: 1,
        minWidth: 160,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#0066ff',
        paddingVertical: 14,
        borderRadius: 10,
    },
    addedBtn: {
        backgroundColor: '#10b981',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    buyNowBtn: {
        flex: 1,
        minWidth: 140,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0066ff',
        backgroundColor: '#fff',
    },
    buyNowText: {
        color: '#0066ff',
        fontSize: 15,
        fontWeight: '700',
    },

    // Specs
    specsSection: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 4,
    },
    specsTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 20,
    },
    specsTable: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        overflow: 'hidden',
    },
    specRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    specRowLast: {
        borderBottomWidth: 0,
    },
    specLabel: {
        width: 200,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 13,
        fontWeight: '600',
        color: '#6b7280',
        backgroundColor: '#f8fafc',
    },
    specValue: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#1e293b',
        lineHeight: 20,
    },
});