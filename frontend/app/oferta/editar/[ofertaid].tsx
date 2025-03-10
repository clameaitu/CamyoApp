import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet 
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../assets/styles/colors"; 
import globalStyles from "../../../assets/styles/globalStyles";
import Selector from "../../_components/Selector";
import MultiSelector from "../../_components/MultiSelector";
import { useLocalSearchParams, useRouter } from "expo-router";

const EditarOfertaScreen = () => {
  const [tipoOferta, setTipoOferta] = useState("TRABAJO");
  const [formData, setFormData] = useState({
    titulo: "",
    experiencia: "",
    licencia: "",
    notas: "",
    estado: "",
    sueldo: "",
    fechaPublicacion: "",
    empresa: "",

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

  const { ofertaid } = useLocalSearchParams();
  const router = useRouter();
  const BACKEND_URL = "http://localhost:8080"; //http://ip:8080 para conectar al móvil

  useEffect(() => {
    if (!ofertaid) {
      console.error("❌ Error: ofertaid no está definido.");
      return;
    }
  
    const fetchOferta = async () => {
      try {
        console.log("🔍 Obteniendo oferta general...");
        const response = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}`);
        const data = await response.json();
        console.log("📩 Oferta general recibida:", data);
  
        if (!data || Object.keys(data).length === 0) {
          console.error("❌ Error: La oferta no tiene datos.");
          return;
        }
  
        let licencia = data.licencia;

        // Si licencia es un string separado por comas, lo convertimos en array
        if (licencia && typeof licencia === "string") {
          licencia = licencia.split(",").map(l => l.trim()); // Asegurar que no haya espacios extra
        }
  
        setFormData((prevState) => ({
          ...prevState,
          ...data,
          licencia: licencia || [], // Asegurar que siempre sea un array
        }));
  
        console.log("📊 Licencia en formData después de conversión:", licencia);  
        // Intentamos primero obtener los datos de carga
        console.log("🔍 Intentando obtener datos de carga...");
        const cargaResponse = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/carga`);


        if (cargaResponse.ok) {
          const text = await cargaResponse.text(); // Primero leemos el contenido como texto
  
          if (text) { // Si hay contenido, intentamos parsearlo como JSON
            const cargaData = JSON.parse(text);
            console.log("📩 Datos de carga recibidos:", cargaData);
  
            if (cargaData && Object.keys(cargaData).length > 1) { // Verificamos que tenga contenido
              setTipoOferta("CARGA");
              setFormData((prevState) => ({
                ...prevState,
                ...cargaData,
              }));
              return;
            }
          }
        }
  
  
        // Si no es carga (o cargaData estaba vacío), intentamos obtener datos de trabajo
      console.log("🔍 Intentando obtener datos de trabajo...");
      const trabajoResponse = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/trabajo`);

      if (trabajoResponse.ok) {
        const text = await trabajoResponse.text(); // Primero leemos el contenido como texto

        if (text) { // Si hay contenido, intentamos parsearlo como JSON
          const trabajoData = JSON.parse(text);
          console.log("📩 Datos de trabajo recibidos:", trabajoData);

          if (trabajoData && Object.keys(trabajoData).length > 1) {
            setTipoOferta("TRABAJO");
            setFormData((prevState) => ({
              ...prevState,
              ...trabajoData,
            }));
          }
        }
      }

      } catch (error) {
        console.error("❌ Error en fetchOferta:", error);
      }
      
    };
  
    fetchOferta();
  }, []);
  

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.titulo || !formData.empresa) {
      alert("Los campos obligatorios deben completarse.");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      try {
        console.log("📤 Datos enviados al backend:", JSON.stringify(formData)); // <-- Verifica qué se envía

        if (!formData.empresa || !formData.empresa.id) {
          alert("❌ Error: La empresa no puede ser nula.");
          return;
        }

        // 🚀 Log para verificar qué datos se están enviando
        console.log("🚀 Datos finales antes de enviar el PUT:", JSON.stringify(formData, null, 2));


        const response = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const responseText = await response.text(); // <-- Leer respuesta del backend
        console.log("📩 Respuesta del backend:", response.status, responseText);
  
        if (response.ok) {
          console.log("📊 Estado final de formData:", formData);

                // 🔄 Recargar la página manualmente después de actualizar
          router.replace(`/oferta/${ofertaid}`); 
        } else {
          alert("Error al actualizar la oferta");
        }
      } catch (error) {
        console.error("Error al actualizar la oferta:", error);
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
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Editar oferta</Text>

          {/* Campos generales */}
          {renderInput("Título", "titulo", <FontAwesome5 name="tag" size={20} color={colors.primary} />)}
          {renderInput("Experiencia", "experiencia", <FontAwesome5 name="briefcase" size={20} color={colors.primary} />)}
          <View style={styles.inputContainer}>
              <Text style={{ color: colors.secondary, fontSize: 16, marginRight: 10, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                Licencia:
              </Text>
              <MultiSelector 
                value={Array.isArray(formData.licencia) ? formData.licencia : []}  
                onChange={(value) => handleInputChange("licencia", value)}
                options={["AM","A1","A2","A","B","C1","C","C1+E","C+E","D1","D+E","E","D"]}
                colors={colors} 
              />
            </View>

          {renderInput("Descripción", "notas", <FontAwesome5 name="align-left" size={20} color={colors.primary} />)}
          {renderInput("Estado", "estado", <FontAwesome5 name="flag" size={20} color={colors.primary} />)}
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
                  options={["REGULAR","FLEXIBLE","COMPLETA","NOCTURNA","RELEVOS","MIXTA"]} 
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

          {/* Botón de actualización */}
          <TouchableOpacity style={styles.publishButton} onPress={handleUpdate}>
            <Text style={styles.publishButtonText}>Actualizar oferta</Text>
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

export default EditarOfertaScreen;