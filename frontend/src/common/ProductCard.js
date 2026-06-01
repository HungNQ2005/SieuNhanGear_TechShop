import React from 'react';
import TextIntl from '../common/TextIntl';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import {
  TEXT_HOME_ADD_TO_CART
} from '../constants/i18nKeys';

export default function ProductCard({ product, manufacturers = [], categories = [], onAddToCart }) {
  if (!product) return null;

  const manufacturer = manufacturers?.find(m => m && String(m.id) === String(product?.manufacturer_id)) || null;
  const category = categories?.find(c => c && String(c.id) === String(product?.category_id)) || null;

  const formatPrice = (price) =>
    price?.toLocaleString('vi-VN') + 'đ';

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < full) return '★';
      if (i === full && hasHalf) return '⯨';
      return '☆';
    });
  };

  const IconCart = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );

  return (
    <View style={styles.card}>
      {/* Product image */}
      <View style={styles.imageContainer}>
        {product.img_URL ? (
          <Image
            source={{ uri: `http://localhost:3521/${product.img_URL}` }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No Image</Text>
          </View>
        )}
        <TouchableOpacity style={styles.wishlistBtn} activeOpacity={0.7}>
          <Text style={styles.wishlistIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Manufacturer & Category badges */}
        <View style={styles.badgeRow}>
          {manufacturer && (
            <Text style={styles.manufacturerBadge}>
              {manufacturer.name.toUpperCase()}
            </Text>
          )}
          {category && (
            <Text style={styles.categoryBadge}>{category.name}</Text>
          )}
        </View>

        {/* Product name */}
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating row */}
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>
            {renderStars(product.rating).map((star, i) => (
              <Text
                key={i}
                style={[
                  styles.star,
                  star === '☆' ? styles.starEmpty : styles.starFilled,
                ]}
              >
                {star}
              </Text>
            ))}
          </View>
          <Text style={styles.ratingValue}>{product.rating}</Text>
          <Text style={styles.ratingCount}>(678)</Text>
        </View>

        {/* Price */}
        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        {/* Add to cart button */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={() => onAddToCart && onAddToCart(product)}
        >
          <IconCart />
          <TextIntl tx={TEXT_HOME_ADD_TO_CART} style={styles.addToCartText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    width: 300,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#f1f1f1',
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: '#aaa',
    fontSize: 13,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  wishlistIcon: {
    fontSize: 16,
    color: '#555',
  },
  content: {
    padding: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  manufacturerBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0066ff',
    letterSpacing: 0.5,
  },
  categoryBadge: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 20,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 13,
  },
  starFilled: {
    color: '#f59e0b',
  },
  starEmpty: {
    color: '#d1d5db',
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  ratingCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  soldCount: {
    fontSize: 11,
    color: '#9ca3af',
    marginLeft: 'auto',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066ff',
    marginBottom: 12,
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0066ff',
    paddingVertical: 11,
    borderRadius: 8,
  },
  cartIcon: {
    fontSize: 15,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});