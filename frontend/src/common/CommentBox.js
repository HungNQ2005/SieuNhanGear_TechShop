import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommentBox({ comment }) {
    const { accountName, rating, content } = comment;

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        return Array.from({ length: 5 }, (_, i) => {
            if (i < full) return '★';
            if (i === full && hasHalf) return '⯨';
            return '☆';
        });
    };

    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <View style={styles.commentMeta}>
                    <Text style={styles.accountName}>{accountName}</Text>
                    <View style={styles.starsRow}>
                        {renderStars(rating).map((star, i) => (
                            <Text key={i} style={[styles.star, star === '☆' ? styles.starEmpty : styles.starFilled]}>
                                {star}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
            <Text style={styles.commentContent}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0066ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    commentMeta: {
        flex: 1,
    },
    accountName: {
        fontWeight: '700',
        fontSize: 16,
        color: '#0f172a',
        marginBottom: 4,
    },
    starsRow: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 14,
    },
    starFilled: {
        color: '#f59e0b',
    },
    starEmpty: {
        color: '#d1d5db',
    },
    commentContent: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 20,
    },
});