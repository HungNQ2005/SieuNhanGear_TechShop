import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getFavorites, toggleFavorite } from '../../../utils/favorites';
import { API } from '../../../constants/apiURL';
import { useCart } from '../../../store/CartContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export default function FavoriteProduct() {
  const [favorites, setFavorites] = useState(() => getFavorites());
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshFavorites = () => {
      setFavorites(getFavorites());
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('favoritesUpdated', refreshFavorites);
      return () => window.removeEventListener('favoritesUpdated', refreshFavorites);
    }
  }, []);

  const handleRemove = (product) => {
    toggleFavorite(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sản phẩm yêu thích ({favorites.length})</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>♥</Text>
          <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
          <Text style={styles.emptyDesc}>
            Hãy bấm vào biểu tượng trái tim ở các sản phẩm bạn yêu thích để lưu lại tại đây!
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigate(ROUTES.HOME)}
          >
            <Text style={styles.shopBtnText}>Khám phá sản phẩm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.grid}>
          {favorites.map((product) => {
            const productId = product.id || product._id;
            const imgPath = product.img_URL || product.image || "";
            const imageUri = imgPath
              ? (imgPath.startsWith("http") ? imgPath : `${API.BASE_API_URL}${imgPath.startsWith('/') ? imgPath.slice(1) : imgPath}`)
              : "https://via.placeholder.com/150";

            return (
              <View key={productId} style={styles.card}>
                <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />

                <View style={styles.cardContent}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>
                    {(Number(product.price) || 0).toLocaleString('vi-VN')}đ
                  </Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.addCartBtn}
                      onPress={() => handleAddToCart(product)}
                    >
                      <Text style={styles.addCartText}>Thêm vào giỏ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => handleRemove(product)}
                    >
                      <Text style={styles.removeText}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    minHeight: 500,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 24,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    color: '#cbd5e1',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: 24,
  },
  shopBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shopBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: 240,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#f8fafc',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563eb',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addCartBtn: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addCartText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  removeBtn: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
});