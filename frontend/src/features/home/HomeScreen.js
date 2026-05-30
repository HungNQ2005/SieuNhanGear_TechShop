import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import ProductCard from '../../common/ProductCard';
import TextIntl from '../../common/TextIntl';
import { featuredProducts } from '../../services/mockProducts';
import { useCart } from '../../store/CartContext';
import {
  TEXT_HOME_HERO_TITLE,
  TEXT_HOME_HERO_SUBTITLE,
  TEXT_HOME_FEATURED_PRODUCTS,
  TEXT_PRODUCT_COUNT,
  TEXT_NO_PRODUCTS,
} from '../../constants/i18nKeys';

export default function HomeScreen() {
  const { addToCart, totalItems } = useCart();

  return (
    <View style={styles.page}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <TextIntl tx={TEXT_HOME_HERO_TITLE} style={styles.heroTitle} />
          <TextIntl tx={TEXT_HOME_HERO_SUBTITLE} style={styles.heroSubtitle} />
          <TextIntl
            tx={TEXT_PRODUCT_COUNT}
            params={{ count: totalItems }}
            style={styles.productCount}
          />
        </View>

        <TextIntl tx={TEXT_HOME_FEATURED_PRODUCTS} style={styles.sectionTitle} />

        {featuredProducts.length === 0 ? (
          <TextIntl tx={TEXT_NO_PRODUCTS} style={styles.emptyText} />
        ) : (
          featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroSection: {
    paddingVertical: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#475569',
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
});
