import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { router, useRouter } from 'expo-router';

const IndexPage = () => {
    const { userToken, user, loading } = useAuth();
    const route = useRouter();

    if (loading) {
        return (<div>Loading...</div>
        ); // Mostrar un indicador de carga si aún no se ha cargado el usuario
      }
    
    if (!user) {
        router.replace("/login");
    }

    useEffect(() => {
        if (!userToken) {
            route.push('/login');
            return;
        }

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

export default IndexPage;
