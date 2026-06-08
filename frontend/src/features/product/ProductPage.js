import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../common/ProductCard';
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
    TEXT_PRODUCT_PAGE_RELATED,
} from '../../constants/i18nKeys';
import {
    IconCart,
    IconBack,
    IconShield,
    IconTruck,
    IconCheck,
} from '../../constants/icons';

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

function SpecRow({ label, value, last }) {
    return (
        <View style={[styles.specRow, last && styles.specRowLast]}>
            <Text style={styles.specLabel}>{label}</Text>
            <Text style={styles.specValue}>{value}</Text>
        </View>
    );
}

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { locale } = useLocalization();

    const [product, setProduct] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [category, setCategory] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [allManufacturers, setAllManufacturers] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);

        Promise.all([
            api.get(ROUTES.GET_PRODUCT_BY_ID(id)),
            api.get(ROUTES.GET_MANUFACTURER),
            api.get(ROUTES.GET_CATEGORY),
            api.get(ROUTES.GET_PRODUCT),
        ])
            .then(([prodRes, manRes, catRes, allProdRes]) => {
                const prod = prodRes.data;
                setProduct(prod);

                const mans = Array.isArray(manRes.data) ? manRes.data : [];
                const cats = Array.isArray(catRes.data) ? catRes.data : [];
                const allProds = Array.isArray(allProdRes.data) ? allProdRes.data : [];

                setAllManufacturers(mans);
                setAllCategories(cats);
                setAllProducts(allProds);

                setManufacturer(mans.find(m => String(m.id) === String(prod.manufacturer_id)) || null);
                setCategory(cats.find(c => String(c.id) === String(prod.category_id)) || null);

                const related = allProds.filter(p =>
                    p.id !== prod.id && (
                        String(p.category_id) === String(prod.category_id) ||
                        String(p.manufacturer_id) === String(prod.manufacturer_id)
                    )
                ).slice(0, 6); //Load tối đa 6 sản phẩm, lag problem <(")
                setRelatedProducts(related);
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

    if (loading) {
        return (
            <View style={styles.centerScreen}>
                <ActivityIndicator size="large" color="#0066ff" />
            </View>
        );
    }

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
                <TouchableOpacity style={styles.backLink} onPress={() => navigate(ROUTES.HOME)}>
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
                    <SpecRow label={<TextIntl tx={TEXT_PRODUCT_PAGE_RATING} />} value={`${product.rating} / 5 ★`} last={true} />
                </View>
            </View>

            {/* ── Related Products Section ── */}
            {relatedProducts.length > 0 && (
                <View style={styles.relatedSection}>
                    <TextIntl tx={TEXT_PRODUCT_PAGE_RELATED} style={styles.relatedTitle} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.relatedScroll}
                    >
                        {relatedProducts.map(relProd => (
                            <ProductCard
                                key={relProd.id}
                                product={relProd}
                                manufacturers={allManufacturers}
                                categories={allCategories}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    pageContent: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
        paddingHorizontal: 32,
        paddingVertical: 32,
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
        cursor: 'pointer',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
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
        gap: 48,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 40,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 20,
        elevation: 4,
        marginBottom: 32,
        flexWrap: 'wrap',
    },

    // Image
    imageWrapper: {
        flex: 1.2,
        minWidth: 400,
        position: 'relative',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: 480,
    },
    productImage: {
        width: '100%',
        height: '100%',
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
        flex: 1.5,
        minWidth: 400,
        gap: 18,
        justifyContent: 'center',
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
        fontSize: 30,
        fontWeight: '800',
        color: '#0f172a',
        lineHeight: 40,
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
        fontSize: 18,
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
        fontSize: 38,
        fontWeight: '900',
        color: '#0066ff',
        marginVertical: 4,
    },

    // Trust badges
    trustRow: {
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
        paddingVertical: 16,
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
        fontSize: 15,
        color: '#334155',
        lineHeight: 24,
    },

    // Actions
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
        marginTop: 6,
    },
    addToCartBtn: {
        flex: 1.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#0066ff',
        paddingVertical: 16,
        borderRadius: 12,
        cursor: 'pointer',
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
        fontSize: 20,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 24,
    },
    specLabel: {
        width: 260,
        paddingHorizontal: 24,
        paddingVertical: 18,
        fontSize: 14,
        fontWeight: '650',
        color: '#475569',
        backgroundColor: '#f8fafc',
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

    //Related
    relatedSection: {
        marginTop: 48,
        paddingHorizontal: 4,
    },
    relatedTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 20,
        paddingLeft: 8,
    },
    relatedScroll: {
        gap: 16,
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
});