import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { BACKEND_URL } from '@env';

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      if (!username.trim()) {
        setErrorMessage("Por favor ingresa tu nombre de usuario.");
        return;
      } else if (!password.trim()) {
        setErrorMessage("Por favor ingresa tu contraseña.");
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/auth/signin`, {
        username,
        password,
      });
      const { token, userData } = response.data;
      login(response.data, token);

      // Redirigir al usuario a la pantalla principal de ofertas
      router.replace("/");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data || 'Error desconocido');
      } else {
        setErrorMessage('Error desconocido');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { justifyContent: "center", flexGrow: 1, alignItems: "center" }]}>  
      <View style={globalStyles.formContainerHalf}>
        <Text style={globalStyles.title}>Iniciar Sesión</Text>
        
        <View style={{ width: "90%", marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: "flex-start", paddingHorizontal: 5, zIndex: 1 }}>Nombre de Usuario</Text>
          <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>
            <MaterialIcons name="person" size={20} color={colors.primary} />
            <TextInput
              style={{ flex: 1, height: 40, paddingLeft: 8, outline:"none" }}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        
        <View style={{ width: "90%", marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: "flex-start", paddingHorizontal: 5, zIndex: 1 }}>Contraseña</Text>
          <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>
            <Entypo name="lock" size={20} color={colors.primary} />
            <TextInput
              style={{ flex: 1, height: 40, paddingLeft: 8, outline:"none" }}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Entypo name={passwordVisible ? "eye-with-line" : "eye"} size={18} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage ? (
          <Text style={{ color: "red", fontSize: 18, marginBottom: 10 }}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity style={[globalStyles.button, { marginBottom: 10, borderRadius: 12, elevation: 5 }]} onPress={handleLogin}>
          <Text style={[globalStyles.buttonText, { fontSize: 25 }]}>Ingresar</Text>
        </TouchableOpacity>

        <View style={globalStyles.separatorContainer}>
          <View style={globalStyles.separator} />
          <Text style={globalStyles.separatorText}>¿Eres nuevo?</Text>
          <View style={globalStyles.separator} />
        </View>
        
        <TouchableOpacity style={globalStyles.buttonOrange} onPress={() => router.push("/registro")}>
          <Text style={globalStyles.buttonText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
