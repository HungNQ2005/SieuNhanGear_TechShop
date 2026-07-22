import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/SideBar.styles';
import { IconAvatar, IconUser, IconShoppingCart, IconLogoutArrow, IconHeart } from '../../../constants/icons';
import { useLocalization } from '../../../providers/LocalizationProvider';
import {
    TEXT_PROFILE_INFO,
    TEXT_PROFILE_ORDER_HISTORY,
    TEXT_PROFILE_FAVORITES,
    TEXT_PROFILE_LOGOUT
} from '../../../constants/i18nKeys';
import { getAvatarUri } from '../../../utils/avatar';

export default function SideBar({ user, activeTab, setActiveTab }) {
    const navigate = useNavigate();
    const { t } = useLocalization();
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [user?.avatarURL]);

    const handleLogout = () => {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        navigate('/');
    };

    if (!user) return null;

    const avatarUri = imageError ? null : getAvatarUri(user.avatarURL);
    const initialLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <View style={styles.sidebar}>
            {/* User Info */}
            <View style={styles.userInfo}>
                {avatarUri ? (
                    <Image
                        source={{ uri: avatarUri }}
                        style={styles.avatar}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View style={styles.avatarFallback}>
                        <IconAvatar color="#fff" size={40} />
                    </View>
                )}

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
                    {t(TEXT_PROFILE_INFO)}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navItem, activeTab === 'orders' && styles.navItemActive]}
                onPress={() => setActiveTab('orders')}
            >
                <IconShoppingCart color={activeTab === 'orders' ? '#2563EB' : '#6B7280'} />
                <Text style={[styles.navText, activeTab === 'orders' && styles.navTextActive]}>
                    {t(TEXT_PROFILE_ORDER_HISTORY)}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navItem, activeTab === 'favorites' && styles.navItemActive]}
                onPress={() => setActiveTab('favorites')}
            >
                <IconHeart color={activeTab === 'favorites' ? '#2563EB' : '#6B7280'} />
                <Text style={[styles.navText, activeTab === 'favorites' && styles.navTextActive]}>
                    {t(TEXT_PROFILE_FAVORITES)}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                <IconLogoutArrow color="#6B7280" />
                <Text style={styles.navText}>{t(TEXT_PROFILE_LOGOUT)}</Text>
            </TouchableOpacity>
        </View>
    );
}