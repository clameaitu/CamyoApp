import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    console.log("Iniciar sesión con:", { email, password });
    // Aquí iría la lógica para autenticación
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { justifyContent: "center", flexGrow: 1, alignItems: "center" }]}>
      
      <View style={globalStyles.formContainer}>
      <Text style={globalStyles.title}>Iniciar Sesión</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor={colors.secondary}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.secondary}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        
        <TouchableOpacity style={[globalStyles.button, { marginBottom: 10, borderRadius: 12, elevation: 5 }]}
           onPress={handleLogin}>
          <Text style={[globalStyles.buttonText, { fontSize: 30 }]}>Ingresar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={{ color: colors.primary, textAlign: "center", marginTop: 16 }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default LoginScreen;
