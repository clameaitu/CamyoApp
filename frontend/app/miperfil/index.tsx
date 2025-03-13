import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { router, useRouter } from 'expo-router';

const MyProfile = () => {
    const { userToken, user } = useAuth();
    const route = useRouter();

    useEffect(() => {
        if (user?.rol === 'CAMIONERO') {
            route.replace('/miperfilcamionero');
        } else if (user?.rol === 'EMPRESA') {
            route.replace('/miperfilempresa');
        } else if (user?.rol === 'ADMIN') {
            route.replace('/workinprogress');
        } else {
            route.push('/');
        }
    }, [userToken, user, route]);

    return null;
};

export default MyProfile;
