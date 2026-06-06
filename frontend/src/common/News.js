import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import TextIntl from './TextIntl';
import api from '../services/api';
import { ROUTES } from '../constants/routes';
import {
    TEXT_HOME_NEWS_SUBTITLE,
    TEXT_HOME_NEWS_VIEW_ALL,
    TEXT_HOME_NEWS_READ_MORE,
} from '../constants/i18nKeys';

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await api.get(ROUTES.GET_NEWS);
            setNews(response.data);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0066ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View>
                    <TextIntl tx={TEXT_HOME_NEWS_SUBTITLE} style={styles.subTitle} />
                    <Text style={styles.mainTitle}>Blog & Gaming News</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <TextIntl tx={TEXT_HOME_NEWS_VIEW_ALL} style={styles.viewAllText} />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {news.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={{ uri: `${ROUTES.BASE_API_URL}${item.image}` }} style={styles.cardImage} />

                        <View style={styles.cardBody}>
                            <Text style={styles.cardMeta}>
                                <Text style={styles.cardTag}>{item.tag}</Text>
                                <Text style={styles.cardDot}>  •  </Text>
                                <Text style={styles.cardDate}>{item.date}</Text>
                            </Text>

                            <Text style={styles.cardTitle} numberOfLines={2}>
                                {item.title}
                            </Text>

                            <TouchableOpacity style={styles.readMoreBtn} activeOpacity={0.6}>
                                <TextIntl tx={TEXT_HOME_NEWS_READ_MORE} style={styles.readMoreText} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 45,
    },
    loaderContainer: {
        marginVertical: 20,
        paddingHorizontal: 45,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0066ff',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 4,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    scrollContent: {
        gap: 20,
        paddingVertical: 10,
    },
    card: {
        width: 280,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eef2f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cardBody: {
        padding: 16,
    },
    cardMeta: {
        fontSize: 12,
        marginBottom: 8,
    },
    cardTag: {
        fontWeight: '700',
        color: '#0066ff',
    },
    cardDot: {
        color: '#94a3b8',
    },
    cardDate: {
        color: '#64748b',
        fontWeight: '500',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        lineHeight: 22,
        height: 44,
        marginBottom: 16,
    },
    readMoreBtn: {
        alignSelf: 'flex-start',
    },
    readMoreText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0066ff',
    },
});