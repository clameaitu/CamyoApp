import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface AuthContextType {
  user: any | null;
  userToken: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
  validateToken: (token: string) => Promise<boolean>;
  getUserData: (userRole: string, userId: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  login: () => {},
  logout: () => {},
  validateToken: async () => false,
  getUserData: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  /*
  useEffect(() => {
    const loadAuthData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("userToken");
  
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setUserToken(storedToken);
      }
    };
  
    loadAuthData(); 
  }, []);*/
  

  const login = async (userData: any, token: string) => {

    setUser(userData);
    setUserToken(token);
    
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("userToken", token);

    const rol = userData.roles[0] === "EMPRESA" ? "empresas" : 
            userData.roles[0] === "ADMIN" ? "admin" : 
            "camioneros";

    getUserData(rol, userData.id);
  };

  const logout = async () => {
    setUser(null);
    setUserToken(null);

    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userToken");

    router.replace("/login");
  };

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // true or false
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };

  const unifyUserData = (data: any) => {
    const unifiedData: any = {
      id: data.id, // el id es el del rol (camioneroId o empresaId)
      rol: data.usuario.authority.authority,  // El rol de usuario (CAMIONERO o EMPRESA)
    };
  
    // Si el usuario es un CAMIONERO
    if (data.usuario.authority.authority === 'CAMIONERO') {
      unifiedData.experiencia = data.experiencia;
      unifiedData.dni = data.dni;
      unifiedData.licencias = data.licencias;
      unifiedData.disponibilidad = data.disponibilidad;
      unifiedData.tieneCAP = data.tieneCAP;
      unifiedData.expiracionCAP = data.expiracionCAP;
      unifiedData.userId = data.usuario.id;
      unifiedData.nombre = data.usuario.nombre;
      unifiedData.telefono = data.usuario.telefono;
      unifiedData.username = data.usuario.username;
      unifiedData.email = data.usuario.email;
      unifiedData.localizacion = data.usuario.localizacion;
      unifiedData.descripcion = data.usuario.descripcion;
      unifiedData.foto = data.usuario.foto;
    } 
  
    // Si el usuario es una EMPRESA
    else if (data.usuario.authority.authority === 'EMPRESA') {
      unifiedData.nif = data.nif;
      unifiedData.descripcion = data.descripcion;
      unifiedData.web = data.web;
      unifiedData.userId = data.usuario.id;
      unifiedData.nombre = data.usuario.nombre;
      unifiedData.telefono = data.usuario.telefono;
      unifiedData.username = data.usuario.username;
      unifiedData.email = data.usuario.email;
      unifiedData.localizacion = data.usuario.localizacion;
      unifiedData.foto = data.usuario.foto;
    } 

    // Si el usuario es un ADMIN
    else if (data.usuario.authority.authority === 'ADMIN') {
      unifiedData.userId = data.usuario.id;
      unifiedData.nombre = data.usuario.nombre;
      unifiedData.telefono = data.usuario.telefono;
      unifiedData.username = data.usuario.username;
      unifiedData.email = data.usuario.email;
      unifiedData.localizacion = data.usuario.localizacion;
      unifiedData.foto = data.usuario.foto;
    }
  
    return unifiedData;
  };  
  

  const getUserData = async (userRole: string, userId: number) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/${userRole}/por_usuario/${userId}`);

      const unifiedUser = unifyUserData(response.data);
      setUser(unifiedUser);
      await AsyncStorage.setItem("user", JSON.stringify(unifiedUser));

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userToken, login, logout, validateToken, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
