import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import TextIntl from '../../common/TextIntl';
import Banner from '../../common/Banner';
import HotProductCard from '../../common/HotProductCard';
import ProductCard from '../../common/ProductCard';
import { useCart } from '../../store/CartContext';
import api from '../../services/api';
import {
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

export default function HomeScreen() {
  const { addToCart, totalItems } = useCart()
  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(true);
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const scrollViewRef = useRef(null);
  const productsSectionRef = useRef(null);
  const [productsSectionY, setProductsSectionY] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [error, setError] = useState(null);

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
    if (!selectedCategoryId) return products;
    return products.filter(p => String(p.category_id) === selectedCategoryId);
  }, [products, selectedCategoryId]);

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
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
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
          <View>
            <TextIntl tx={TEXT_HOME_CATEGORY} style={styles.categoryLine1} />
            <TextIntl tx={TEXT_HOME_EXPLORE_BY_CATEGORY} style={styles.categoryLine2} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {/* Nút "Tất cả" */}
            <TouchableOpacity
              style={[styles.categoryChip, !selectedCategoryId && styles.categoryChipActive]} onPress={() => handleSelectCategory(null)}>
              <TextIntl tx={TEXT_HOME_FEATURED_ALL_PRODUCTS} style={[styles.categoryChipText, !selectedCategoryId && styles.categoryChipTextActive]} />
            </TouchableOpacity>
            {/* Các category từ API */}
            {categories.map(cat => (
              <TouchableOpacity key={cat.id} style={[styles.categoryChip, selectedCategoryId === cat.id && styles.categoryChipActive]} onPress={() => handleSelectCategory(cat.id)}>
                <Text style={[styles.categoryChipText, selectedCategoryId === cat.id && styles.categoryChipTextActive]}>
                  {cat.name}
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

        <View>
          <Footer />
        </View>
      </ScrollView>
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
    marginVertical: 16,
    paddingHorizontal: 50,
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
  },
  categoryLine2: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
  },
});
