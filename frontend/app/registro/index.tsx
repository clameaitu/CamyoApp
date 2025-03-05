import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import BooleanSelector from "../_components/BooleanSelector";
import Selector from "../_components/Selector";
import defaultProfileImage from "../../assets/images/react-logo.png";

const RegisterScreen = () => {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 1074;  
  const [userType, setUserType] = useState("camionero");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    localizacion: "",
    descripcion: "",
    foto: null, // Guardará la URI de la imagen

    // Camionero
    dni: "",
    experiencia: "",
    licencias: "",
    disponibilidad: "",
    tieneCAP: null,
    expiracionCAP: "",
    vehiculoPropio: null,

    // Empresa
    empresaNombre: "",
    web: "",
    tipoId: "",
    numId: "",
 
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };  

  // Función para seleccionar una imagen desde la galería
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

  // Función para renderizar cada input del formulario
  const renderInput = (label, field, icon, keyboardType = "default", secureTextEntry = false, multiline = false) => (
    <View style={{ width: '90%', marginBottom: 15 }}>
      <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: 'flex-start', paddingHorizontal: 5, zIndex: 1 }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>      
        {icon}
        <TextInput
          style={{ flex: 1, height: multiline ? 80 : 40, paddingLeft: 8, outline:"none", textAlignVertical: multiline ? 'top' : 'center' }}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      </View>
    </View>
  );

  // Función específica para renderizar el input de contraseña con el ojito
  const renderPasswordInput = () => (
    <View style={{ width: "90%", marginBottom: 15 }}>
      <Text style={{ fontSize: 12, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: "flex-start", paddingHorizontal: 5, zIndex: 1 }}>Contraseña</Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, paddingHorizontal: 10, backgroundColor: colors.white }}>
        <Entypo name="lock" size={20} color={colors.primary} />
        <TextInput
          style={{ flex: 1, height: 40, paddingLeft: 8, outline: "none", textAlignVertical: "center" }}
          secureTextEntry={!passwordVisible}
          value={formData.password || ''}
          onChangeText={(value) => handleInputChange("password", value)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo name={passwordVisible ? "eye-with-line" : "eye"} size={18} color={colors.mediumGray} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={[globalStyles.container, { paddingTop: 100 }]}>
      <View style={{ flexDirection: isWideScreen ? "row" : "column", justifyContent: "center", alignItems: "center", width: "100%", marginTop: isWideScreen ? -25 : -100, marginBottom: isWideScreen ? -100 : 155 }}>
      <View style={[globalStyles.formContainerHalf, { marginRight: isWideScreen ? 20 : 0 }]}>

        <Text style={globalStyles.title}>Registro</Text>
        
        {/* Selector de Imagen */}
        <View style={{ alignItems: "center", marginBottom: 20, marginTop: 10 }}>
          <Image 
            source={formData.foto ? { uri: formData.foto } : defaultProfileImage}  
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8, borderWidth: 1, borderColor: colors.mediumGray }} 
          />

          {!formData.foto ? (
            <TouchableOpacity onPress={pickImage} style={[globalStyles.button, { backgroundColor: colors.secondary, flexDirection: "row", alignItems: "center", justifyContent: "center", width: 140, paddingHorizontal: 15 }]}>
              <MaterialIcons name="add-a-photo" size={20} color={colors.white} style={{ marginRight: 8 }} />
              <Text style={globalStyles.buttonText}>Añadir Foto</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={pickImage} style={[globalStyles.button, { backgroundColor: colors.green, marginRight: 7, flexDirection: "row", alignItems: "center", justifyContent: "center", width: 120, paddingHorizontal: 15 }]}>
                <MaterialIcons name="cached" size={20} color={colors.white} style={{ marginRight: 8 }} />
                <Text style={globalStyles.buttonText}>Cambiar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setFormData({ ...formData, foto: null })} style={[globalStyles.button, { backgroundColor: colors.red, flexDirection: "row", alignItems: "center", justifyContent: "center", width: 120, paddingHorizontal: 15 }]}>
                <FontAwesome5 name="trash" size={18} color={colors.white} style={{ marginRight: 8 }} />
                <Text style={globalStyles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>


        {renderInput("Nombre", "nombre", <FontAwesome5 name="user" size={20} color={colors.primary} />)}
        {renderInput("Apellidos", "apellido", <FontAwesome5 name="user-alt" size={20} color={colors.primary} />)}
        {renderInput("Email", "email", <MaterialIcons name="email" size={20} color={colors.primary} />, "email-address")}
        {renderPasswordInput()}
        {renderInput("Teléfono", "telefono", <MaterialIcons name="phone" size={20} color={colors.primary} />, "phone-pad")}
        {renderInput("Localización", "localizacion", <MaterialIcons name="location-pin" size={20} color={colors.primary} />)}
        {renderInput("Descripción (Opcional)", "descripcion", <FontAwesome5 name="align-left" size={20} color={colors.primary} />, "default", false, true)}

        </View>

      <View style={[globalStyles.formContainerHalf, { marginLeft: isWideScreen ? 20 : 0 }]}> 

        <Text style={globalStyles.title}>¿Qué tipo de usuario eres?</Text>

        {/* Selector de Usuario */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
          <TouchableOpacity
            style={[globalStyles.userTypeButton, userType === "camionero" ? globalStyles.selectedUserType : globalStyles.unselectedUserType]}
            onPress={() => setUserType("camionero")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <FontAwesome5 name="truck" size={24} color={userType === "camionero" ? colors.white : colors.secondary} style={{ marginRight: 10 }} />
              <Text style={[globalStyles.userTypeText, { color: userType === "camionero" ? colors.white : colors.secondary }]}>
                Camionero
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.userTypeButton, userType === "empresa" ? globalStyles.selectedUserType : globalStyles.unselectedUserType]}
            onPress={() => setUserType("empresa")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="business" size={24} color={userType === "empresa" ? colors.white : colors.secondary} style={{ marginRight: 10 }} />
              <Text style={[globalStyles.userTypeText, { color: userType === "empresa" ? colors.white : colors.secondary }]}>
                Empresa
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Campos dinámicos según usuario */}
        {userType === "camionero" ? (
          <>
            {renderInput("DNI", "dni", <FontAwesome5 name="address-card" size={20} color={colors.primary} />)}
            {renderInput("Años de experiencia", "experiencia", <FontAwesome5 name="briefcase" size={20} color={colors.primary} />, "phone-pad")}
            {renderInput("Licencia(s)", "licencias", <FontAwesome5 name="id-badge" size={20} color={colors.primary} />)}

            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              Disponibilidad:</Text>
            <Selector 
              value={formData.disponibilidad} 
              onChange={(value) => handleInputChange("disponibilidad", value)} 
              options={["Nacional", "Internacional"]} 
              colors={colors} 
              globalStyles={globalStyles} 
            />

            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              ¿Tiene CAP (Certificado de Aptitud Profesional)?:</Text>
            <BooleanSelector 
              value={formData.tieneCAP} 
              onChange={(value) => handleInputChange("tieneCAP", value)} 
              colors={colors} 
              globalStyles={globalStyles} 
            />

            {renderInput("Fecha de expiración del CAP (DD-MM-AAAA)", "expiracionCAP", <FontAwesome5 name="calendar" size={20} color={colors.primary} />)}

            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              ¿Tiene camión propio?</Text>
            <BooleanSelector 
              value={formData.vehiculoPropio} 
              onChange={(value) => handleInputChange("vehiculoPropio", value)} 
              colors={colors} 
              globalStyles={globalStyles} 
            />
          </>

        ) : (

          <>

          {renderInput("Nombre de la empresa", "empresaNombre", <FontAwesome5 name="building" size={20} color={colors.primary} />)}
          {renderInput("Página web (Opcional)", "web", <FontAwesome5 name="globe" size={20} color={colors.primary} />, "url")}

            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              Tipo de Identificación:</Text>
            <Selector 
              value={formData.tipoId} 
              onChange={(value) => handleInputChange("tipoId", value)} 
              options={["NIF", "CIF", "NIE", "REAT"]} 
              colors={colors} 
              globalStyles={globalStyles} 
            />

            {renderInput("Número de Identificación", "numId", <FontAwesome5 name="file-invoice" size={20} color={colors.primary} />, "phone-pad")}

          </>
        )}

        {/* Botón de registro */}
        <TouchableOpacity 
          style={[
            globalStyles.button, 
            { width: "100%", borderRadius: 12, elevation: 5 }
          ]}
        >
          <Text style={[globalStyles.buttonText, { fontSize: 30 }]}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
