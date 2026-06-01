import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import TextIntl from '../common/TextIntl';
import {
  TEXT_HOME_ADD_TO_CART,
} from '../constants/i18nKeys';

import api from '../services/api';

const ProductCard = ({ product, onAddToCart }) => {
  const formattedPrice = product.price.toLocaleString('vi-VN') + ' ₫';

  const IconCart = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: product.img_URL
            ? `http://localhost:3521/${product.img_URL}`
            : 'https://via.placeholder.com/150'
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <View style={styles.manufacturerRow}>
          <Text style={styles.manufacturer}>{product.manufacturer_name}</Text>
          {product.category_name && (
            <Text style={styles.specs} numberOfLines={1}>
              {product.category_name}
            </Text>
          )}
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingValue}>{product.rating}/5</Text>
        </View>
        <Text style={styles.price}>{formattedPrice}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart && onAddToCart(product)}>
          <IconCart />
          <TextIntl tx={TEXT_HOME_ADD_TO_CART} style={styles.addButtonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, manufacturersRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/manufacturers'),
        ]);

        const productsData = productsRes.data;
        const categoriesData = categoriesRes.data;
        const manufacturersData = manufacturersRes.data;

        const categoryMap = new Map();
        categoriesData.forEach(cat => categoryMap.set(cat.id, cat.name));

        const manufacturerMap = new Map();
        manufacturersData.forEach(man => manufacturerMap.set(man.id, man.name));

        const enrichedProducts = productsData.map(product => ({
          ...product,
          category_name: categoryMap.get(product.category_id?.toString()) || 'Unknown',
          manufacturer_name: manufacturerMap.get(product.manufacturer_id?.toString()) || 'Unknown',
        }));

        setProducts(enrichedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Không thể tải danh sách sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onAddToCart={(product) => console.log('Add to cart:', product.name)}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    width: '100%',
  },
  image: {
    width: 'auto',
    height: 400,
    borderRadius: 12,
    marginBottom: 12,
  },
  info: {
    width: '100%',
  },
  manufacturerRow: {
    flexDirection: 'row',
    gap: 8
  },
  manufacturer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
    marginBottom: 4,
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  specs: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingStar: {
    fontSize: 14,
    color: '#f5b042',
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0066ff',
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',  
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ProductList;