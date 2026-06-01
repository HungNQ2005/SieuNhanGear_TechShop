import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Text, } from 'react-native';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import ProductCard from '../../common/ProductCard';
import TextIntl from '../../common/TextIntl';
import Banner from '../../common/Banner';
import HotProductCard from '../../common/HotProductCard';
import { featuredProducts } from '../../services/mockProducts';
import { useCart } from '../../store/CartContext';
import {
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
  const { addToCart, totalItems } = useCart();

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

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <Banner style={styles.banner}>
          <View style={styles.heroSection}>
            <View style={styles.badgeContainer}>
              <IconLightning />
              <TextIntl tx={TEXT_HOME_HERO_STAMP} style={styles.heroStamp} />
            </View>
            <TextIntl tx={TEXT_HOME_HERO_TITLE} style={styles.heroTitle} />
            <TextIntl tx={TEXT_HOME_HERO_SUBTITLE} style={styles.heroSubtitle} />
            <View style={styles.buttonBox}>
              <TouchableOpacity style={styles.shoppingButton1}>
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

        <TextIntl tx={TEXT_HOME_FEATURED_PRODUCTS} style={styles.sectionTitle} />

        <View style={styles.productList}>
          {featuredProducts.length === 0 ? (
            <TextIntl tx={TEXT_NO_PRODUCTS} style={styles.emptyText} />
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))
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
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 16,
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
  productList: {
    flexDirection: 'row',
  },
});
