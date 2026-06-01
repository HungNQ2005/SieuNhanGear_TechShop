import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { getBanners } from '../services/api';

export default function Banner({ children, style }) {
    const [bannerUrl, setBannerUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await getBanners();
                const banner = response.data[0];
                if (banner && banner.img_URL) {
                    setBannerUrl(`http://localhost:3521/${banner.img_URL}`);
                }
            } catch (error) {
                console.error('Failed to load banner:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanner();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, style]}>
                <ActivityIndicator size="large" color="#0EA5E9" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={{ uri: bannerUrl }}
            style={[styles.container, style]}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 'auto',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(7, 21, 48, 0.6)',
    },
});