import React, { useState, useEffect } from 'react';
import TextIntl from '../common/TextIntl';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { API } from '../constants/apiURL';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import {
  TEXT_HOME_ADD_TO_CART
} from '../constants/i18nKeys';
import {
  IconCart,
} from '../constants/icons';

export default function ProductCard({ product, manufacturers = [], categories = [], onAddToCart }) {
  if (!product) return null;

  const navigate = useNavigate();
  const productId = product.id || product._id;
  const [fav, setFav] = useState(() => isFavorite(productId));

  useEffect(() => {
    const handleFavUpdate = () => {
      setFav(isFavorite(productId));
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('favoritesUpdated', handleFavUpdate);
      return () => window.removeEventListener('favoritesUpdated', handleFavUpdate);
    }
  }, [productId]);

  const manufacturer = manufacturers?.find(m => m && String(m.id) === String(product?.manufacturer_id)) || null;
  const category = categories?.find(c => c && String(c.id) === String(product?.category_id)) || null;

  const formatPrice = (price) =>
    (Number(price) || 0).toLocaleString('vi-VN') + 'đ';

  const renderStars = (rating) => {
    const r = Number(rating) || 5;
    const full = Math.floor(r);
    const hasHalf = r % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < full) return '★';
      if (i === full && hasHalf) return '⯨';
      return '☆';
    });
  };

  const handleCardPress = () => {
    navigate(ROUTES.PRODUCT_PAGE.replace(':id', productId));
  };

  const handleToggleFav = (e) => {
    e?.stopPropagation?.();
    const isNowFav = toggleFavorite(product);
    setFav(isNowFav);
  };

  const getProductImageUri = (url) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const baseUrl = API.BASE_API_URL.endsWith('/')
      ? API.BASE_API_URL.slice(0, -1)
      : API.BASE_API_URL;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${path}`;
  };

  const imageUri = getProductImageUri(product.img_URL);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.92}
    >
      {/* Product image */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No Image</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.wishlistBtn, fav && styles.wishlistBtnActive]}
          activeOpacity={0.7}
          onPress={handleToggleFav}
        >
          <Text style={[styles.wishlistIcon, fav && styles.wishlistIconActive]}>
            {fav ? '♥' : '♡'}
          </Text>
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
          <Text style={styles.ratingValue}>{product.rating || 5}</Text>
          <Text style={styles.ratingCount}>(678)</Text>
        </View>

        {/* Price */}
        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        {/* Add to cart button — stop propagation để không trigger card click */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={(e) => {
            e?.stopPropagation?.();
            onAddToCart && onAddToCart(product);
          }}
        >
          <IconCart />
          <TextIntl tx={TEXT_HOME_ADD_TO_CART} style={styles.addToCartText} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    marginBottom: 16,
    width: 300,
    cursor: 'pointer',
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
  wishlistBtnActive: {
    backgroundColor: '#fee2e2',
  },
  wishlistIcon: {
    fontSize: 18,
    color: '#555',
  },
  wishlistIconActive: {
    color: '#ef4444',
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
  addToCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});