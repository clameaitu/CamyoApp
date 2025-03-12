import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
};

const EditProfileScreen = () => {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 1074;
  const router = useRouter();
  const { user, userToken } = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    localizacion: "",
    descripcion: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const usuario = await getUserById(user.userId);
      if (!usuario) return;

      setFormData({
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        telefono: usuario.telefono || "",
        localizacion: usuario.localizacion || "",
        descripcion: usuario.descripcion || "",
      });
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSaveChanges = async (updatedFormData) => {
    try {
      const usuarioData = {
        id: user.userId,
        nombre: updatedFormData.nombre || "",
        email: updatedFormData.email || "",
        telefono: updatedFormData.telefono || "000000000",
        username: user.username, // Mantener el username original
        localizacion: updatedFormData.localizacion || "",
        descripcion: updatedFormData.descripcion || "",
        authority: user.authority || { id: 201, authority: "CAMIONERO" },
      };

      const headers = {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };

      const userResponse = await axios.put(`${BACKEND_URL}/usuarios/${user.userId}`, usuarioData, { headers });

      if (userResponse.status === 200) {
        console.log("✅ Perfil de usuario actualizado correctamente.");
        alert("Perfil actualizado con éxito.");
        router.push("/miperfil");
      }
    } catch (error) {
      if (error.response) {
        console.error("❌ Error en la respuesta del servidor:", JSON.stringify(error.response.data, null, 2));
        alert(`Error: ${error.response.data.message || "Error desconocido"}`);
      } else if (error.request) {
        console.error("❌ No se recibió respuesta del servidor:", error.request);
        alert("No se recibió respuesta del servidor.");
      } else {
        console.error("❌ Error al realizar la solicitud:", error.message);
        alert("Hubo un problema con la solicitud.");
      }
    }
  };

  const renderInput = (label, field, icon, keyboardType = "default", multiline = false) => (
    <View style={{ width: "90%", marginBottom: 15 }}>
      <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: "flex-start", paddingHorizontal: 5, zIndex: 1 }}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>
        {icon}
        <TextInput
          style={{ flex: 1, height: multiline ? 80 : 40, paddingLeft: 8, outline: "none", textAlignVertical: multiline ? "top" : "center" }}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          onChangeText={(value) => handleInputChange(field, value)}
          value={formData[field]}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={[globalStyles.container, { paddingTop: 100 }]}>
      <View style={globalStyles.formContainerHalf}>
        <Text style={globalStyles.title}>Editar Perfil</Text>

        {renderInput("Nombre", "nombre", <FontAwesome5 name="user" size={20} color={colors.primary} />)}
        {renderInput("Email", "email", <MaterialIcons name="email" size={20} color={colors.primary} />, "email-address")}
        {renderInput("Teléfono", "telefono", <MaterialIcons name="phone" size={20} color={colors.primary} />, "phone-pad")}
        {renderInput("Localización", "localizacion", <MaterialIcons name="location-pin" size={20} color={colors.primary} />)}
        {renderInput("Descripción", "descripcion", <FontAwesome5 name="align-left" size={20} color={colors.primary} />, "default", true)}

        <TouchableOpacity style={[globalStyles.button, { width: "100%", borderRadius: 12, elevation: 5 }]} onPress={() => handleSaveChanges(formData)}>
          <Text style={[globalStyles.buttonText, { fontSize: 30 }]}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
