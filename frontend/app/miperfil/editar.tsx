import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import BooleanSelector from "../_components/BooleanSelector";
import Selector from "../_components/Selector";
import defaultProfileImage from "../../assets/images/react-logo.png";
import { useAuth } from "../../contexts/AuthContext";

const EditProfileScreen = () => {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 1074;  
  const { user } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    localizacion: "",
    descripcion: "",
    foto: null,
    dni: "",
    experiencia: "",
    licencias: "",
    disponibilidad: "",
    tieneCAP: null,
    expiracionCAP: "",
    vehiculoPropio: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        telefono: user.telefono || "",
        localizacion: user.localizacion || "",
        descripcion: user.descripcion || "",
        foto: user.foto || null,
        dni: user.dni || "",
        experiencia: user.experiencia || "",
        licencias: user.licencias || "",
        disponibilidad: user.disponibilidad || "",
        tieneCAP: user.tieneCAP || null,
        expiracionCAP: user.expiracionCAP || "",
        vehiculoPropio: user.vehiculoPropio || null,
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, foto: result.assets[0].uri });
    }
  };

  const renderInput = (label, field, icon, keyboardType = "default", multiline = false) => (
    <View style={{ width: '90%', marginBottom: 15 }}>
      <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: 'flex-start', paddingHorizontal: 5, zIndex: 1 }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>      
        {icon}
        <TextInput
          style={{ flex: 1, height: multiline ? 80 : 40, paddingLeft: 8, outline:"none", textAlignVertical: multiline ? 'top' : 'center' }}
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

        <View style={{ alignItems: "center", marginBottom: 20, marginTop: 10 }}>
          <Image 
            source={formData.foto ? { uri: formData.foto } : defaultProfileImage}  
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8, borderWidth: 1, borderColor: colors.mediumGray }} 
          />

          <TouchableOpacity onPress={pickImage} style={[globalStyles.button, { backgroundColor: colors.secondary, flexDirection: "row", alignItems: "center", justifyContent: "center", width: 140, paddingHorizontal: 15 }]}>
            <MaterialIcons name="add-a-photo" size={20} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={globalStyles.buttonText}>Cambiar Foto</Text>
          </TouchableOpacity>
        </View>

        {renderInput("Nombre", "nombre", <FontAwesome5 name="user" size={20} color={colors.primary} />)}
        {renderInput("Email", "email", <MaterialIcons name="email" size={20} color={colors.primary} />, "email-address")}
        {renderInput("Teléfono", "telefono", <MaterialIcons name="phone" size={20} color={colors.primary} />, "phone-pad")}
        {renderInput("Localización", "localizacion", <MaterialIcons name="location-pin" size={20} color={colors.primary} />)}
        {renderInput("Descripción", "descripcion", <FontAwesome5 name="align-left" size={20} color={colors.primary} />, "default", true)}
        {renderInput("DNI", "dni", <FontAwesome5 name="address-card" size={20} color={colors.primary} />)}
        {renderInput("Años de experiencia", "experiencia", <FontAwesome5 name="briefcase" size={20} color={colors.primary} />, "phone-pad")}
        {renderInput("Licencia(s)", "licencias", <FontAwesome5 name="id-badge" size={20} color={colors.primary} />)}
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;