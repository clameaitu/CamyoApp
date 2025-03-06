import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform, StyleSheet, useWindowDimensions
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../../assets/styles/colors"; 
import { FontAwesome5 } from "@expo/vector-icons";
import Selector from "../_components/Selector";
import globalStyles from "@/assets/styles/globalStyles";


const licencias = ["AM", "A1", "A2", "A", "B", "C1", "C", "C1E", "CE", "D1", "DE", "D1E", "D"];

export default function PublishOfferScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const isWideScreen = width > 1074;  

  const [tipoOferta, setTipoOferta] = useState("TRABAJO");
  const [titulo, setTitulo] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [licencia, setLicencia] = useState("");
  const [notas, setNotas] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [formData, setFormData] = useState({
      //Oferta
      titulo: "",
      experiencia: "",
      licencia: "",
      notas: "",
      estado: "",
      sueldo: "",
      fechaPublicación: "",
      empresa: "",

      // Trabajo
      fechaIncorporación: "",
      jornada: "",

      // Carga
      mercancia: "",
      peso: "",
      origen: "",
      destino: "",
      distancia: "",
      inicio: "",
      finMinimo: "",
      finMaximo: "",
  
    });
  
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
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


  return (
    <ScrollView style={[globalStyles.container, { paddingTop: 100 }]}>
      <View style={{ flexDirection: isWideScreen ? "row" : "column", justifyContent: "center", alignItems: "center", width: "100%", marginTop: isWideScreen ? -25 : -100, marginBottom: isWideScreen ? -100 : 155 }}>
        <View style={[globalStyles.formContainerHalf, { marginRight: isWideScreen ? 20 : 0 }]}>
          <Text style={globalStyles.title}>Nueva oferta</Text>

            {renderInput("Titulo", "titulo", <FontAwesome5 size={20} color={colors.primary} />)}
            {renderInput("Experiencia", "experiencia", <FontAwesome5 size={20} color={colors.primary} />)}
            {renderInput("Licencia", "licencia", <FontAwesome5  size={20} color={colors.primary} />)}
            {renderInput("Descripcion", "notas", <FontAwesome5  size={20} color={colors.primary} />)}
            {renderInput("Estado ", "estado", <FontAwesome5  size={20} color={colors.primary} />)}
            {renderInput("Sueldo", "sueldo", <FontAwesome5  size={20} color={colors.primary} />)}
            {renderInput("Fecha Publicacion", "fechaPublicación", <FontAwesome5  size={20} color={colors.primary} />)}
            {renderInput("Empresa", "empresa", <FontAwesome5 size={20} color={colors.primary} />)}

        </View>

      <View style={[globalStyles.formContainerHalf, { marginLeft: isWideScreen ? 20 : 0 }]}> 

        <Text style={globalStyles.title}>¿Qué tipo de oferta quieres?</Text>

        {/* Selector de Usuario */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
          <TouchableOpacity
            style={[globalStyles.userTypeButton, tipoOferta === "TRABAJO" ? globalStyles.selectedUserType : globalStyles.unselectedUserType]}
            onPress={() => setTipoOferta("TRABAJO")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <FontAwesome5 name="truck" size={24} color={tipoOferta === "TRABAJO" ? colors.white : colors.secondary} style={{ marginRight: 10 }} />
              <Text style={[globalStyles.userTypeText, { color: tipoOferta === "TRABAJO" ? colors.white : colors.secondary }]}>
                Trabajo
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.userTypeButton, tipoOferta === "CARGA" ? globalStyles.selectedUserType : globalStyles.unselectedUserType]}
            onPress={() => setTipoOferta("CARGA")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="business" size={24} color={tipoOferta === "CARGA" ? colors.white : colors.secondary} style={{ marginRight: 10 }} />
              <Text style={[globalStyles.userTypeText, { color: tipoOferta === "CARGA" ? colors.white : colors.secondary }]}>
                De carga
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Campos dinámicos según usuario */}
        {tipoOferta === "TRABAJO" ? (
          <>
            {renderInput("Fecha Incorporacion", "fechaIncorporación", <FontAwesome5 size={20} color={colors.primary} />)}

            <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              Jornada:</Text>
            <Selector 
              value={formData.jornada} 
              onChange={(value) => handleInputChange("jornada", value)} 
              options={["REGULAR","FLEXIBLE","COMPLETA","NOCTURNA","RELEVOS","MIXTA"]} 
              colors={colors} 
              globalStyles={globalStyles} 
            />
          </>

        ) : (

          <>

          {renderInput("Mercancia", "mercancia", <FontAwesome5 size={20} color={colors.primary} />)}
          {renderInput("Peso", "peso", <FontAwesome5  size={20} color={colors.primary} />)}
          {renderInput("Origen", "origen", <FontAwesome5 size={20} color={colors.primary} />)}
          {renderInput("Destino", "destino", <FontAwesome5 size={20} color={colors.primary} />)}
          {renderInput("Distancia", "distancia", <FontAwesome5  size={20} color={colors.primary} />)}
          {renderInput("Inicio", "inicio", <FontAwesome5  size={20} color={colors.primary} />)}
          {renderInput("Fin Minimo", "finMinimo", <FontAwesome5  size={20} color={colors.primary} />)}
          {renderInput("Fin Maximo", "finMaximo", <FontAwesome5  size={20} color={colors.primary} />)}


          </>
        )}

        {/* Botón de registro */}
        <TouchableOpacity 
          style={[
            globalStyles.button, 
            { width: "100%", borderRadius: 12, elevation: 5 }
          ]}
        >
          <Text style={[globalStyles.buttonText, { fontSize: 30 }]}>Publicar oferta</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>

  );
}
