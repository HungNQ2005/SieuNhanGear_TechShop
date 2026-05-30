import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TextIntl from './TextIntl';
import { TEXT_PRICE_LABEL, TEXT_ADD_TO_CART } from '../constants/i18nKeys';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{product.category}</Text>
      </View>

      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.description}>{product.shortDescription}</Text>

      <View style={styles.row}>
        <TextIntl tx={TEXT_PRICE_LABEL} style={styles.label} />
        <Text style={styles.price}>{product.price}</Text>
      </View>

      <Pressable onPress={() => onAddToCart(product)} style={styles.button}>
        <TextIntl tx={TEXT_ADD_TO_CART} style={styles.buttonText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  badgeText: {
    color: '#0C4A6E',
    fontWeight: '700',
    fontSize: 11,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#64748B',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
