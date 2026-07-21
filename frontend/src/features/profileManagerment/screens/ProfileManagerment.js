import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ProfileInformation from '../components/ProfileInformation';
import OrderInformation from '../components/OrderInformation';
import FavoriteProduct from '../components/FavoriteProduct';
import { styles } from '../styles/ProfileManagerment.styles.js';
import api from '../../../services/api';

export default function ProfileManagement() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    const loadUser = async () => {
        let parsedUser = null;
        if (typeof localStorage !== 'undefined') {
            const savedUser = localStorage.getItem('user');
            if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
                try {
                    parsedUser = JSON.parse(savedUser);
                } catch (e) {
                    console.error("Failed to parse user in ProfileManagement", e);
                }
            }
        }

        if (parsedUser) {
            setUser(parsedUser);
            setLoading(false);
            return;
        }

        // Fallback: fetch from /api/auth/me if token exists
        try {
            const res = await api.get('/api/auth/me');
            const fetched = res.data?.account || res.data?.data || res.data;
            if (fetched && typeof fetched === 'object') {
                setUser(fetched);
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(fetched));
                }
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error("Failed to fetch user from /api/auth/me", err);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();

        if (typeof window !== 'undefined') {
            const handleUpdate = () => loadUser();
            window.addEventListener('userUpdated', handleUpdate);
            window.addEventListener('storage', handleUpdate);
            return () => {
                window.removeEventListener('userUpdated', handleUpdate);
                window.removeEventListener('storage', handleUpdate);
            };
        }
    }, [navigate]);

    if (loading) {
        return (
            <View style={localStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (!user) {
        return null;
    }

    const renderContent = () => {
        const userId = user?.id || user?._id;
        switch (activeTab) {
            case 'profile':
                return <ProfileInformation accountId={userId} />;
            case 'orders':
                return <OrderInformation />;
            case 'favorites':
                return <FavoriteProduct />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <SideBar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
            <View style={styles.content}>
                {renderContent()}
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
});