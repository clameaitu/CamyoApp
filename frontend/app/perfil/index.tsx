import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserProfileScreen from '../miperfil/index';
import CompanyDetailScreen from '../miperfilempresa/index';
import { View, ActivityIndicator, Text } from 'react-native';
import { router } from 'expo-router';

const UnifiedUserProfileScreen: React.FC = () => {
    const { user, userToken } = useAuth();

    if (!userToken) {
        router.replace('/login');
    }

    if (!user) {
        router.replace('/login');
    }

    if (user && user.rol === 'CAMIONERO') {
        return <UserProfileScreen />;
    } else if (user && user.rol === 'EMPRESA') {
        return <CompanyDetailScreen />;
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No tienes permisos para acceder a esta página.</Text>
            </View>
        );
    }
};

export default UnifiedUserProfileScreen;