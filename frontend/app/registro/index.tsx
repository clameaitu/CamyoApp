import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image  } from "react-native";
import * as ImagePicker from "expo-image-picker";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import BooleanSelector from "../_components/BooleanSelector";
import Selector from "../_components/Selector";

const RegisterScreen = () => {
  const [userType, setUserType] = useState("camionero");
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

  return (
    <ScrollView style={[globalStyles.container, { paddingTop: 100 }]}>
      <View style={globalStyles.formContainer}>
        <Text style={globalStyles.title}>Registro de Nuevo Usuario</Text>

        <View style={{ borderBottomWidth: 1, borderBottomColor: colors.mediumGray, paddingBottom: 10, marginBottom: 20 }}>
          <TextInput
            style={globalStyles.input}
            placeholder="Nombre"
            placeholderTextColor={colors.secondary}
            onChangeText={(value) => handleInputChange("nombre", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Apellido"
            placeholderTextColor={colors.secondary}
            onChangeText={(value) => handleInputChange("apellido", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Contraseña"
            placeholderTextColor={colors.secondary}
            secureTextEntry
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Número de teléfono"
            placeholderTextColor={colors.secondary}
            keyboardType="phone-pad"
            onChangeText={(value) => handleInputChange("telefono", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Localización"
            placeholderTextColor={colors.secondary}
            onChangeText={(value) => handleInputChange("localizacion", value)}
          />

          <TextInput
            style={[globalStyles.input, { height: 120 }]}
            placeholder="Descripción (Opcional)"
            placeholderTextColor={colors.secondary}
            multiline
            numberOfLines={3}
            onChangeText={(value) => handleInputChange("descripcion", value)}
          />

          {/* Selector de Imagen */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
            <TouchableOpacity onPress={pickImage} style={[globalStyles.button, { backgroundColor: colors.lightBlue, flex: 1, marginRight: 5 }]}>
              {formData.foto && <Text style={globalStyles.buttonText}>Cambiar Foto</Text>}
              {!formData.foto && <Text style={globalStyles.buttonText}>Seleccionar Foto</Text>}
              
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFormData({ ...formData, foto: null })} style={[globalStyles.button, { backgroundColor: colors.red, flex: 1, marginLeft: 5 }]}>
              <Text style={globalStyles.buttonText}>Eliminar Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Mostrar la imagen seleccionada */}
          {formData.foto && (
            <Image source={{ uri: formData.foto }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />
          )}
        </View>

        {/* =================== CAMPOS ESPECÍFICOS SEGÚN TIPO DE USUARIO ================= */}

        <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.secondary, textAlign: "center", marginBottom: 12 }}>
          Selecciona qué tipo de usuario eres:
        </Text>

        {/* Selector de Usuario */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
          <TouchableOpacity
            style={[
              globalStyles.userTypeButton,
              userType === "camionero" ? globalStyles.selectedUserType : { backgroundColor: colors.lightGray, borderWidth: 1, borderColor: colors.mediumGray },
            ]}
            onPress={() => setUserType("camionero")}
          >
            <Text style={[globalStyles.userTypeText, { color: userType === "camionero" ? colors.white : colors.secondary, fontSize: 18 }]}>
              Camionero</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.userTypeButton,
              userType === "empresa" ? globalStyles.selectedUserType : { backgroundColor: colors.lightGray, borderWidth: 1, borderColor: colors.mediumGray },
            ]}
            onPress={() => setUserType("empresa")}
          >
            <Text style={[globalStyles.userTypeText, { color: userType === "empresa" ? colors.white : colors.secondary, fontSize: 18 }]}>
              Empresa</Text>
          </TouchableOpacity>
        </View>

        {/* Campos dinámicos según usuario */}
        {userType === "camionero" ? (
          <>
            <TextInput
              style={globalStyles.input}
              placeholder="DNI"
              placeholderTextColor={colors.secondary}
              onChangeText={(value) => handleInputChange("dni", value)}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Experiencia (años)"
              placeholderTextColor={colors.secondary}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange("experiencia", value)}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Licencia(s) (AM, A1, A2, A, B, C1, C+E, D1+E...)"
              placeholderTextColor={colors.secondary}
              onChangeText={(value) => handleInputChange("licencias", value)}
            />

            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              Disponibilidad:</Text>
            <Selector 
              value={formData.disponibilidad} 
              onChange={(value) => handleInputChange("disponibilidad", value)} 
              options={["Nacional", "Internacional"]} 
              colors={colors} 
              globalStyles={globalStyles} 
            />




            {/* CAP */}
            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              ¿Tiene CAP (Certificado de Aptitud Profesional)?:</Text>
            <BooleanSelector 
              value={formData.tieneCAP} 
              onChange={(value) => handleInputChange("tieneCAP", value)} 
              colors={colors} 
              globalStyles={globalStyles} 
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Fecha de expiración del CAP (DD-MM-YYYY)"
              placeholderTextColor={colors.secondary}
              onChangeText={(value) => handleInputChange("expiracionCAP", value)}
            />

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
            <TextInput
              style={globalStyles.input}
              placeholder="Nombre de la empresa"
              placeholderTextColor={colors.secondary}
              onChangeText={(value) => handleInputChange("empresaNombre", value)}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Página web (Opcional)"
              placeholderTextColor={colors.secondary}
              onChangeText={(value) => handleInputChange("web", value)}
            />
            
            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              Tipo de Identificación:</Text>
            <Selector 
              value={formData.tipoId} 
              onChange={(value) => handleInputChange("tipoId", value)} 
              options={["NIF", "CIF", "NIE", "REAT"]} 
              colors={colors} 
              globalStyles={globalStyles} 
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Número de Identificación"
              placeholderTextColor={colors.secondary}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange("numId", value)}
            />
          </>
        )}

        {/* Botón de registro */}
        <TouchableOpacity 
          style={[
            globalStyles.button, 
            { borderRadius: 12, elevation: 5 }
          ]}
        >
          <Text style={[globalStyles.buttonText, { fontSize: 30 }]}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
