import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { getBanners } from '../services/api';
import { API } from '../constants/apiURL';
 
export default function Banner({ children, style }) {
    const [bannerUrl, setBannerUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchBanner = async () => {
            try {
                const response = await getBanners();
                if (isMounted) { // Check before state update
                    setBannerUrl(`${API.BASE_API_URL}${response.data[0].img_URL}`);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchBanner();

        return () => {
            isMounted = false;
        };
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
        backgroundColor: 'rgba(7, 21, 48, 0.7)',
    },
});