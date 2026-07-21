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
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#E2E8F0',
        marginBottom: 12,
    },
    avatarFallback: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatarFallbackText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
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