import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import TextIntl from './TextIntl';
import {
    TEXT_HOME_NEWS_SUBTITLE,
} from '../constants/i18nKeys';
// Mảng dữ liệu mẫu dựa theo hình ảnh bạn cung cấp
const NEWS_DATA = [
    {
        id: '1',
        tag: 'GPU',
        date: '29/05/2026',
        title: 'RTX 5090 có gì mới?',
        image: 'http://localhost:3521/images/news/news_1.avif',
    },
    {
        id: '2',
        tag: 'LAPTOP',
        date: '28/05/2026',
        title: 'Top laptop gaming đáng mua 2026',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: '3',
        tag: 'BUILD PC',
        date: '27/05/2026',
        title: 'Build PC gaming 30 triệu',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop', 
    },
];

export default function News() {
    return (
        <View style={styles.container}>
            {/* Header của mục Tin tức */}
            <View style={styles.headerRow}>
                <View>
                    <TextIntl tx={TEXT_HOME_NEWS_SUBTITLE} style={styles.subTitle} />
                    <Text style={styles.mainTitle}>Blog & Gaming News</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {NEWS_DATA.map((item) => (
                    <View key={item.id} style={styles.card}>
                        {/* Ảnh bài viết */}
                        <Image source={{ uri: item.image }} style={styles.cardImage} />

                        {/* Nội dung bài viết */}
                        <View style={styles.cardBody}>
                            <Text style={styles.cardMeta}>
                                <Text style={styles.cardTag}>{item.tag}</Text>
                                <Text style={styles.cardDot}>  •  </Text>
                                <Text style={styles.cardDate}>{item.date}</Text>
                            </Text>

                            <Text style={styles.cardTitle} numberOfLines={2}>
                                {item.title}
                            </Text>

                            {/* Nút Đọc thêm */}
                            <TouchableOpacity style={styles.readMoreBtn} activeOpacity={0.6}>
                                <Text style={styles.readMoreText}>Đọc thêm →</Text>
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