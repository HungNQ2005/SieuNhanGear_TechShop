// src/features/profileManagerment/screens/ProfileManagement.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ProfileInformation from '../components/ProfileInformation';
import OrderInformation from '../components/OrderInformation';
import FavoriteProduct from '../components/FavoriteProduct';
import { styles } from '../styles/ProfileManagerment.styles.js';

export default function ProfileManagement() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            // Redirect to home if not logged in
            navigate('/');
        }
    }, [navigate]);

    const renderContent = () => {
        if (!user) return null;
        switch (activeTab) {
            case 'profile':
                return <ProfileInformation accountId={user._id} />;
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