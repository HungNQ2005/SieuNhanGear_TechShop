// src/features/profileManagerment/styles/SideBar.styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    sidebar: {
        width: 280,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    userEmail: {
        fontSize: 14,
        color: '#6B7280',
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 4,
    },
    navItemActive: {
        backgroundColor: '#EFF6FF',
    },
    navText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginLeft: 12,
    },
    navTextActive: {
        color: '#2563EB',
        fontWeight: '600',
    },
});