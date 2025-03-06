import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    };

    loadToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
