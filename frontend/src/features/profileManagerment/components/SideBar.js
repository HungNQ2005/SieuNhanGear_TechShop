// src/features/profileManagerment/components/SideBar.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/SideBar.styles';
import { API } from '../../../constants/apiURL';
import { IconUser, IconShoppingCart, IconLogoutArrow, IconHeart } from '../../../constants/icons';


export default function SideBar({ user, activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    return (
        <View style={styles.sidebar}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: `${API.BASE_API_URL}${user.avatarURL}` }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            {/* Navigation Items */}
            <TouchableOpacity
                style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]}
                onPress={() => setActiveTab('profile')}
            >
                <IconUser color={activeTab === 'profile' ? '#2563EB' : '#6B7280'} />
                <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>
                    Profile Information
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navItem, activeTab === 'orders' && styles.navItemActive]}
                onPress={() => setActiveTab('orders')}
            >
                <IconShoppingCart color={activeTab === 'orders' ? '#2563EB' : '#6B7280'} />
                <Text style={[styles.navText, activeTab === 'orders' && styles.navTextActive]}>
                    Order Information
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navItem, activeTab === 'favorites' && styles.navItemActive]}
                onPress={() => setActiveTab('favorites')}
            >
                <IconHeart color={activeTab === 'favorites' ? '#2563EB' : '#6B7280'} />
                <Text style={[styles.navText, activeTab === 'favorites' && styles.navTextActive]}>
                    Favorite Product
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                <IconLogoutArrow color="#6B7280" />
                <Text style={styles.navText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}