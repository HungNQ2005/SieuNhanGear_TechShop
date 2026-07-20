import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
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
        const savedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null;
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            // Redirect to home if not logged in
            navigate('/');
        }
    }, [navigate]);

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