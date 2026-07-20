// src/features/profileManagerment/components/OrderInformation.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/OrderInformation.styles';

export default function OrderInformation() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Information</Text>
            <Text>Order history will be displayed here.</Text>
        </View>
    );
}