import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log("Iniciar sesión con:", { email, password });
  };

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { justifyContent: "center", flexGrow: 1, alignItems: "center" }]}>  
      <View style={globalStyles.formContainerHalf}>
        <Text style={globalStyles.title}>Iniciar Sesión</Text>
        
        <View style={{ width: "90%", marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: "flex-start", paddingHorizontal: 5, zIndex: 1 }}>Correo Electrónico</Text>
          <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>
            <MaterialIcons name="email" size={20} color={colors.primary} />
            <TextInput
              style={{ flex: 1, height: 40, paddingLeft: 8 }}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
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

        <TouchableOpacity style={[globalStyles.button, { marginBottom: 10, borderRadius: 12, elevation: 5 }]} onPress={handleLogin}>
          <Text style={[globalStyles.buttonText, { fontSize: 30 }]}>Ingresar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/")}> 
          <Text style={{ color: colors.secondary, textAlign: "center", marginTop: 16, marginBottom: 9 }}>He olvidado mi contraseña</Text>
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
