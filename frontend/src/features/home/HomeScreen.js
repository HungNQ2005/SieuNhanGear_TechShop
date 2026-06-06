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
import api from '../../services/api';
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

    api.get('/products')
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
    api.get('/manufacturers')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setManufacturers(data);
      })
      .catch(err => {
        logger.error('Failed to fetch manufacturers', err);
        setManufacturers([]);
      });
    api.get('/categories')
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

  const IconLightning = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" />
    </svg>
  );

  const IconPointToRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );

  const IconSearch = () => (
    <svg width="50" height="auto" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  return (
    <View style={styles.page}>
      <Banner style={styles.banner}>
        <View style={styles.heroSection}>
          <View style={styles.badgeContainer}>
            <IconLightning />
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
            <IconSearch />
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  banner: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '100%',
    marginTop: 30,
  },
  heroStamp: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#0066ff'
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#0066ff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  heroSection: {
    flex: 8,
    paddingVertical: '10%',
    paddingHorizontal: 0,
  },
  hotProductContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '4%',
  },
  heroTitle: {
    fontSize: 50,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#c2c2c2',
    marginBottom: 16,
  },
  productCount: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  sectionTitle: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    fontSize: 25,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  emptyText: {
    color: '#7d7d7d',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 15,
  },
  shoppingButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  shoppingButton1: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#0066ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#0066ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 5,
  },
  buildConfigButton: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buildConfigButton1: {
  },
  statusLine: {
    flexDirection: 'row',
    gap: 25,
    paddingVertical: 15,
  },
  statusLine1: {
    flexDirection: 'row',
    gap: 4,
  },
  statusLine2: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
  },
  statusLine3: {
    fontSize: 14,
    color: '#c2c2c2',
  },
  productGrid: {
    paddingHorizontal: 30,
    paddingVertical: 0,
  },
  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 30,
  },
  categoryLine: {
    marginVertical: 24,
    paddingHorizontal: 45,
  },
  categoryHeader: {
    marginBottom: 16,
  },
  categoryScroll: {
    gap: 12,
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryChipActive: {
    backgroundColor: '#0066ff',
    borderColor: '#0066ff',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  categoryLine1: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#0066ff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryLine2: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  categoryScrollContainer: {
    gap: 16,
    paddingVertical: 8,
    paddingRight: 16,
  },
  categoryCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eef2f6',
    alignItems: 'center',
  },
  categoryCardActive: {
    borderColor: '#0066ff',
    backgroundColor: '#f0f7ff',
    shadowOpacity: 0.1,
  },
  categoryIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCardDesc: {
    fontSize: 12,
    color: '#5b677b',
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryCardCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0066ff',
  },
});
