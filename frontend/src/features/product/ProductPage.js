import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../common/ProductCard';
import api from '../../services/api';
import { ROUTES } from '../../constants/routes';
import { API } from '../../constants/apiURL';
import { useCart } from '../../store/CartContext';
import { useLocalization } from '../../providers/LocalizationProvider';
import TextIntl from '../../common/TextIntl';
import { styles } from './ProductPage.styles';
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
            api.get(API.GET_PRODUCT_BY_ID(id)),
            api.get(API.GET_MANUFACTURER),
            api.get(API.GET_CATEGORY),
            api.get(API.GET_PRODUCT),
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
                            source={{ uri: `${API.BASE_API_URL}${product.img_URL}` }}
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