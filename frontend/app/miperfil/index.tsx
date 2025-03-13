import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter, usePathname } from 'expo-router';

const IndexPage = () => {
    const { userToken, user } = useAuth();
    const route = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('Ruta actual:', pathname);
        console.log('Token de usuario:', userToken);
        console.log('Datos de usuario:', user);

        if (!userToken) {
            console.log('No hay token de usuario, redirigiendo a /login');
            route.push('/login');
            return;
        }

        if (pathname.includes('/editar')) {
            console.log('Ruta incluye /editar');

            if (user?.rol === 'CAMIONERO') {
                console.log('Rol CAMIONERO, redirigiendo a /miperfilcamionero/editar');
                route.replace('/miperfilcamionero/editar');
            } else if (user?.rol === 'EMPRESA') {
                console.log('Rol EMPRESA, redirigiendo a /miperfilempresa/editar');
                route.replace('/miperfilempresa/editar');
            } else {
                console.log('Rol no válido, redirigiendo a la página de inicio');
                route.push('/');
            }
        } else {
            console.log('Ruta no incluye /editar');

            if (user?.rol === 'CAMIONERO') {
                console.log('Rol CAMIONERO, redirigiendo a /miperfilcamionero');
                route.replace('/miperfilcamionero');
            } else if (user?.rol === 'EMPRESA') {
                console.log('Rol EMPRESA, redirigiendo a /miperfilempresa');
                route.replace('/miperfilempresa');
            } else if (user?.rol === 'ADMIN') {
                console.log('Rol ADMIN, redirigiendo a /workinprogress');
                route.replace('/workinprogress');
            } else {
                console.log('Rol no válido, redirigiendo a la página de inicio');
                route.push('/');
            }
        }
    }, [userToken, user, pathname]);

    return null;
};

export default IndexPage;
