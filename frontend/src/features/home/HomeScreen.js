import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import TextIntl from '../../common/TextIntl';
import Banner from '../../common/Banner';
import HotProductCard from '../../common/HotProductCard';
import ProductCard from '../../common/ProductCard';
import FlashSale from '../../common/FlashSale';
import News from '../../common/News';
import { useFilter } from '../../store/FilterContext';
import { useCart } from '../../store/CartContext';
import { useLocalization } from '../../providers/LocalizationProvider';
import { API } from '../../constants/apiURL';
import api from '../../services/api';
import { styles } from './HomeScreen.styles';
import {
  TEXT_HOME_PRODUCTS_COUNT,
  TEXT_HOME_FEATURED_ALL_PRODUCTS,
  TEXT_HOME_CATEGORY,
  TEXT_HOME_EXPLORE_BY_CATEGORY,
  TEXT_HOME_EMPTY_PRODUCTS,
  TEXT_HOME_HERO_STAMP,
  TEXT_HOME_HERO_TITLE,
  TEXT_HOME_HERO_SUBTITLE,
  TEXT_HOME_FEATURED_PRODUCTS,
  TEXT_PRODUCT_COUNT,
  TEXT_NO_PRODUCTS,
  TEXT_HOME_HERO_SHOPPING_BUTTON,
  TEXT_HOME_HERO_BUILD_CONFIG_BUTTON,
  TEXT_HOME_HERO_STATUS_1,
  TEXT_HOME_HERO_STATUS_2,
  TEXT_HOME_HERO_STATUS_3,
  TEXT_HOME_HERO_STATUS_4,
  TEXT_HOME_HERO_STATUS_5,
} from '../../constants/i18nKeys';
import {
  IconLightningBlue,
  IconPointToRight,
  IconSearchCannotFind,
} from '../../constants/icons';

export default function HomeScreen({ scrollViewRef }) {
  const { addToCart, totalItems } = useCart()
  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(true);
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const productsSectionRef = useRef(null);
  const [productsSectionY, setProductsSectionY] = useState(0);
  const { selectedCategoryId, setSelectedCategoryId, selectedManufacturerId } = useFilter();
  const [error, setError] = useState(null);
  const { locale, t } = useLocalization();

  useEffect(() => {
    setError(null);
    setLoadProducts(true);

    function validateProduct(product) {
      if (!product || typeof product !== 'object') return false;
      if (!product.id || !product.name) return false;
      if (typeof product.price !== 'number' || product.price < 0) return false;
      if (typeof product.rating !== 'number' || product.rating < 0 || product.rating > 5) return false;
      return true;
    }

    api.get(API.GET_PRODUCT)
      .then(res => {
        const validProducts = res.data.filter(validateProduct);
        setProducts(validProducts);
      })
      .catch(err => {
        setError('TEXT_HOME_ERROR_FETCH_PRODUCTS');
        logger.error('Failed to fetch products', err);
      })
      .finally(() => setLoadProducts(false));
  }, []);

  if (error) {
    return <View><TextIntl tx={error} /></View>;
  }

  useEffect(() => {
    api.get(API.GET_MANUFACTURER)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setManufacturers(data);
      })
      .catch(err => {
        logger.error('Failed to fetch manufacturers', err);
        setManufacturers([]);
      });
    api.get(API.GET_CATEGORY)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setCategories(data);
      })
      .catch(err => {
        logger.error('Failed to fetch categories', err);
        setCategories([]);
      });
  }, []);

  const scrollToProducts = () => {
    if (scrollViewRef.current && productsSectionY) {
      scrollViewRef.current.scrollTo({ y: productsSectionY, animated: true });
    } else if (scrollViewRef.current && productsSectionRef.current) {
      productsSectionRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current.scrollTo({ y: pageY, animated: true });
      });
    }
  };

  const onProductsLayout = (event) => {
    const { y } = event.nativeEvent.layout;
    setProductsSectionY(y);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
    setTimeout(() => {
    }, 100);
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategoryId) {
      result = result.filter(p => String(p.category_id) === String(selectedCategoryId));
    }

    if (selectedManufacturerId) {
      result = result.filter(p => String(p.manufacturer_id) === String(selectedManufacturerId));
    }

    return result;
  }, [products, selectedCategoryId, selectedManufacturerId]);

  const categoriesWithDetails = useMemo(() => {
    if (!categories.length || !products.length) return [];
    return categories.map(cat => {
      const productCount = products.filter(p => String(p.category_id) === String(cat.id)).length;
      const description = locale === 'vi' ? cat.description_vi : cat.description_en;
      return {
        ...cat,
        description: description || '',
        productCount,
      };
    });
  }, [categories, products, locale]);

  const getCategoryIcon = (categoryId, categoryName) => {
    // Trả về component SVG tương ứng
    // Dưới đây là một số icon mẫu, bạn có thể thay bằng icon phù hợp
    const iconProps = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "#0066ff", strokeWidth: 1.5 };
    switch (Number(categoryId)) {
      case 1:
        return <svg {...iconProps}><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></svg>;
      case 2:
        return <svg {...iconProps}><rect x="4" y="9" width="16" height="10" rx="1" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="12" y2="17" /></svg>;
      case 3:
        return <svg {...iconProps}><rect x="2" y="8" width="20" height="8" rx="1" /><line x1="6" y1="8" x2="6" y2="6" /><line x1="18" y1="8" x2="18" y2="6" /></svg>;
      case 4:
        return <svg {...iconProps}><rect x="4" y="6" width="16" height="12" rx="1" /><path d="M8 10h8M8 14h5" /></svg>;
      case 5:
        return <svg {...iconProps}><rect x="3" y="6" width="18" height="12" rx="1" /><circle cx="12" cy="12" r="1.5" /></svg>;
      default:
        return <svg {...iconProps}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    }
  };

  return (
    <View style={styles.page}>
      <Banner style={styles.banner}>
        <View style={styles.heroSection}>
          <View style={styles.badgeContainer}>
            <IconLightningBlue />
            <TextIntl tx={TEXT_HOME_HERO_STAMP} style={styles.heroStamp} />
          </View>
          <TextIntl tx={TEXT_HOME_HERO_TITLE} style={styles.heroTitle} />
          <TextIntl tx={TEXT_HOME_HERO_SUBTITLE} style={styles.heroSubtitle} />
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.shoppingButton1} onPress={scrollToProducts}>
              <TextIntl tx={TEXT_HOME_HERO_SHOPPING_BUTTON} style={styles.shoppingButton} />
              <IconPointToRight />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buildConfigButton1}>
              <TextIntl tx={TEXT_HOME_HERO_BUILD_CONFIG_BUTTON} style={styles.buildConfigButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.statusLine}>
            <View>
              <Text style={styles.statusLine2}>10K+</Text>
              <TextIntl tx={TEXT_HOME_HERO_STATUS_1} style={styles.statusLine3} />
            </View>
            <View>
              <Text style={styles.statusLine2}>50K+</Text>
              <TextIntl tx={TEXT_HOME_HERO_STATUS_2} style={styles.statusLine3} />
            </View>
            <View>
              <Text style={styles.statusLine2}>99%</Text>
              <TextIntl tx={TEXT_HOME_HERO_STATUS_3} style={styles.statusLine3} />
            </View>
            <View>
              <View style={styles.statusLine1}>
                <Text style={styles.statusLine2}>3</Text>
                <TextIntl tx={TEXT_HOME_HERO_STATUS_4} style={styles.statusLine2} />
              </View>
              <TextIntl tx={TEXT_HOME_HERO_STATUS_5} style={styles.statusLine3} />
            </View>
          </View>
        </View>
        <View style={styles.hotProductContainer}>
          <HotProductCard />
        </View>
      </Banner>

      <View style={styles.categoryLine}>
        <View style={styles.categoryHeader}>
          <TextIntl tx={TEXT_HOME_CATEGORY} style={styles.categoryLine1} />
          <TextIntl tx={TEXT_HOME_EXPLORE_BY_CATEGORY} style={styles.categoryLine2} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {/* Nút "Tất cả" */}
          <TouchableOpacity
            style={[styles.categoryCard, !selectedCategoryId && styles.categoryCardActive]}
            onPress={() => handleSelectCategory(null)}
            activeOpacity={0.8}
          >
            <View style={styles.categoryIconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </View>
            <Text style={styles.categoryCardTitle}>
              <TextIntl tx={TEXT_HOME_FEATURED_ALL_PRODUCTS} />
            </Text>
            <Text style={styles.categoryCardCount}>
              {products.length} <TextIntl tx={TEXT_HOME_PRODUCTS_COUNT} />
            </Text>
          </TouchableOpacity>

          {/* Các category từ API */}
          {categoriesWithDetails.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, selectedCategoryId === cat.id && styles.categoryCardActive]}
              onPress={() => handleSelectCategory(cat.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIconWrapper}>
                {getCategoryIcon(cat.id, cat.name)}
              </View>
              <Text style={styles.categoryCardTitle}>{cat.name}</Text>
              <Text style={styles.categoryCardDesc} numberOfLines={1}>
                {cat.description}
              </Text>
              <Text style={styles.categoryCardCount}>
                {cat.productCount} {cat.productCount === 1 ? '' : ''}
                <TextIntl tx={TEXT_HOME_PRODUCTS_COUNT} />
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View ref={productsSectionRef} onLayout={onProductsLayout}>
        <TextIntl tx={TEXT_HOME_FEATURED_PRODUCTS} style={styles.sectionTitle} />
        {loadProducts ? (
          <ActivityIndicator size="large" color="#0066ff" style={styles.loader} />
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <IconSearchCannotFind />
            <TextIntl tx={TEXT_HOME_EMPTY_PRODUCTS} style={styles.emptyText} />
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }} style={styles.productGrid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} manufacturers={manufacturers} categories={categories} onAddToCart={addToCart} />
            ))}
          </ScrollView>
        )}
      </View>

      <FlashSale
        onViewAll={() => {
        }}
        onAddToCart={(product) => {
          addToCart(product);
        }}
      />

      <News />
    </View>
  );
}