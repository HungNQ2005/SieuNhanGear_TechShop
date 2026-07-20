// src/features/profileManagerment/components/FavoriteProduct.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/FavoriteProduct.styles';

export default function FavoriteProduct() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Product</Text>
            <Text>Your favorite products will be listed here.</Text>
        </View>
    );
}