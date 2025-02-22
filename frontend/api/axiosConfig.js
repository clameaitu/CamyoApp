// services/axiosConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Configuración global de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // Reemplaza con la URL base de tu API
  timeout: 10000, // Tiempo máximo de espera para las solicitudes (10 segundos)
  headers: {
    'Content-Type': 'application/json',
    // Aquí puedes agregar headers comunes, como tokens de autenticación
  },
});

// Interceptores de solicitud (opcional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí puedes modificar la configuración de la solicitud antes de que se envíe
    // Por ejemplo, agregar un token de autenticación
    const token = localStorage.getItem('token'); // O usa AsyncStorage en React Native
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptores de respuesta (opcional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Aquí puedes manejar la respuesta antes de que llegue a tu código
    return response;
  },
  (error) => {
    // Aquí puedes manejar errores globales, como redireccionar a login si el token expira
    if (error.response.status === 401) {
      // Redireccionar a la pantalla de login
    }
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;