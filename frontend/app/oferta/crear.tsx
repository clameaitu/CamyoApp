import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet 
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/styles/colors"; 
import globalStyles from "../../assets/styles/globalStyles";
import Selector from "../_components/Selector";
import MultiSelector from "../_components/MultiSelector";
import { useNavigation } from "@react-navigation/native";


const CrearOfertaScreen = () => {
  const [tipoOferta, setTipoOferta] = useState("TRABAJO");
  const navigation = useNavigation();
  const BACKEND_URL = "http://localhost:8080";
  const [formData, setFormData] = useState({
    titulo: "",
    experiencia: "",
    licencia: "",
    notas: "",
    estado: "PENDIENTE",
    sueldo: "",
    fechaPublicacion: new Date().toISOString(), // Fecha actual del sistema
    empresa: { id: 201 }, // Empresa fija con ID 201

    // Trabajo
    fechaIncorporacion: "",
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

  const validateForm = () => {
    if (!formData.titulo) {
      alert("El título es obligatorio.");
      return false;
    }
    return true;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };
  

  const handlePublish = async () => {
    if (validateForm()) {
      // Construcción del objeto base de la oferta
      let ofertaData: any = {
        tipoOferta,
        oferta: {
          titulo: formData.titulo,
          experiencia: Number(formData.experiencia), // Convertir a número
          licencia: Array.isArray(formData.licencia) ? formData.licencia[0] : formData.licencia, // Convertir a string
          notas: formData.notas,
          estado: formData.estado || "PENDIENTE",
          sueldo: parseFloat(formData.sueldo).toFixed(2), // Convertir a float con 2 decimal
          fechaPublicacion: formatDate(new Date()), // Fecha en formato correcto sin Z y sin decimales
          empresa: { id: 201 }
        }
      };
  
      // Agregar detalles según el tipo de oferta
      if (tipoOferta === "TRABAJO" && formData.fechaIncorporacion && formData.jornada) {
        ofertaData = {
          ...ofertaData,
          trabajo: {
            fechaIncorporacion: formatDate(formData.fechaIncorporacion), // Aplicar formato correcto
            jornada: formData.jornada
          }
        };
      } else if (tipoOferta === "CARGA" && formData.mercancia && formData.origen && formData.destino) {
        ofertaData = {
          ...ofertaData,
          carga: {
            mercancia: formData.mercancia,
            peso: Number(formData.peso), // Convertir a número
            origen: formData.origen,
            destino: formData.destino,
            distancia: Number(formData.distancia), // Convertir a número
            inicio: formData.inicio ? formatDate(formData.inicio) : null,
            finMinimo: formData.finMinimo ? formatDate(formData.finMinimo) : null,
            finMaximo: formData.finMaximo ? formatDate(formData.finMaximo) : null
          }
        };
      } else {
        alert("Faltan datos obligatorios para este tipo de oferta.");
        return;
      }
  
      console.log("Publicando oferta:", JSON.stringify(ofertaData, null, 2));


      try {
        const response = await fetch(`${BACKEND_URL}/ofertas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ofertaData),
        });
  
        if (!response.ok) {
          throw new Error(`Error al crear la oferta: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Oferta creada con éxito:", data);
        alert("Oferta publicada exitosamente.");
  
        navigation.navigate("miperfilempresa");
      } catch (error) {
        console.error("Error al enviar la oferta:", error);
        alert("Hubo un error al publicar la oferta.");
      }
    }

    

  };
  

  // Función para renderizar cada input del formulario
  const renderInput = (label, field, icon, keyboardType = "default", secureTextEntry = false, multiline = false) => (
    <View style={{ width: '90%', marginBottom: 15 }}>
      <Text style={{ fontSize: 16, color: colors.secondary, marginLeft: 8, marginBottom: -6, backgroundColor: colors.white, alignSelf: 'flex-start', paddingHorizontal: 5, zIndex: 1 }}>{label}</Text>
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Crear nueva oferta</Text>

          {/* Campos generales */}
          {renderInput("Título", "titulo", <FontAwesome5 name="tag" size={20} color={colors.primary} />)}
          {renderInput("Experiencia", "experiencia", <FontAwesome5 name="briefcase" size={20} color={colors.primary} />)}
          <View style={styles.inputContainer}>
              <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                Licencia:
              </Text>
              <MultiSelector 
                value={formData.licencia}
                onChange={(value) => handleInputChange("licencia", value)}
                options={["AM","A1","A2","A","B","C1","C","C1+E","C+E","D1","D+E","E","D"]}
                colors={colors} 
              />
            </View>

          {renderInput("Descripción", "notas", <FontAwesome5 name="align-left" size={20} color={colors.primary} />)}
          {renderInput("Sueldo", "sueldo", <FontAwesome5 name="money-bill-wave" size={20} color={colors.primary} />)}

          {/* Selector de tipo de oferta */}
          <Text style={styles.title}>¿Qué tipo de oferta quieres publicar?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, tipoOferta === "TRABAJO" ? styles.selectedButton : styles.unselectedButton]}
              onPress={() => setTipoOferta("TRABAJO")}
            >
              <FontAwesome5 size={24} color={tipoOferta === "TRABAJO" ? colors.white : colors.secondary} />
              <Text style={[styles.userTypeText, tipoOferta === "TRABAJO" ? styles.selectedText : styles.unselectedText]}>
                TRABAJO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.userTypeButton, tipoOferta === "CARGA" ? styles.selectedButton : styles.unselectedButton]}
              onPress={() => setTipoOferta("CARGA")}
            >
              <FontAwesome5 size={24} color={tipoOferta === "CARGA" ? colors.white : colors.secondary} />
              <Text style={[styles.userTypeText, tipoOferta === "CARGA" ? styles.selectedText : styles.unselectedText]}>
                CARGA
              </Text>
            </TouchableOpacity>
          </View>

          {/* Campos dinámicos según el tipo de oferta */}
          {tipoOferta === "TRABAJO" ? (
            <>
              {renderInput("Fecha de incorporación", "fechaIncorporacion", <FontAwesome5 name="calendar-check" size={20} color={colors.primary} />)}

              <View style={styles.inputContainer}>
                <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                  Jornada:
                </Text>              
                <Selector 
                  value={formData.jornada} 
                  onChange={(value) => handleInputChange("jornada", value)} 
                  options={["REGULAR", "FLEXIBLE", "COMPLETA", "NOCTURNA", "RELEVOS", "MIXTA"]} 
                  colors={colors} 
                  globalStyles={globalStyles} 
                  />
              </View>
            </>
          ) : (
            <>
              {renderInput("Mercancía", "mercancia", <FontAwesome5 name="box" size={20} color={colors.primary} />)}
              {renderInput("Peso", "peso", <FontAwesome5 name="weight" size={20} color={colors.primary} />)}
              {renderInput("Origen", "origen", <FontAwesome5 name="map-marker-alt" size={20} color={colors.primary} />)}
              {renderInput("Destino", "destino", <FontAwesome5 name="map-marker" size={20} color={colors.primary} />)}
              {renderInput("Distancia", "distancia", <FontAwesome5 name="road" size={20} color={colors.primary} />)}
              {renderInput("Inicio", "inicio", <FontAwesome5 name="clock" size={20} color={colors.primary} />)}
              {renderInput("Fin mínimo", "finMinimo", <FontAwesome5 name="calendar-minus" size={20} color={colors.primary} />)}
              {renderInput("Fin máximo", "finMaximo", <FontAwesome5 name="calendar-plus" size={20} color={colors.primary} />)}
            </>
          )}

          {/* Botón de publicación */}
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publicar oferta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    paddingVertical: 20,
    paddingTop: 80,
  },
  container: {
    width: "100%",
    maxWidth: 600,
    paddingHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: colors.white,
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
  publishButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: "100%",
    alignItems: "center",
  },
  publishButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 600,
  },
  userTypeButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userTypeText: {
    fontSize: 16,
    color: colors.white,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  unselectedButton: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  selectedText: {
    color: colors.white,
  },
  unselectedText: {
    color: colors.secondary,
  },
});

export default CrearOfertaScreen;
