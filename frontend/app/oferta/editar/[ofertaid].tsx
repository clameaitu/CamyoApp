import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet 
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../assets/styles/colors"; 
import globalStyles from "../../../assets/styles/globalStyles";
import Selector from "../../_components/Selector";
import MultiSelector from "../../_components/MultiSelector";
import { useRouter, useLocalSearchParams } from "expo-router";


const EditarOfertaScreen = () => {
  const [tipoOferta, setTipoOferta] = useState("");
  const BACKEND_URL = "http://localhost:8080";
  const router = useRouter();
  const { ofertaid } = useLocalSearchParams();
/****************************************************************/
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
      tipoAnterior: "", // Nuevo: Guarda el tipo original al cargar

  });


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
  
        if (!data || Object.keys(data).length === 0) {
          console.error("❌ Error: La oferta no tiene datos.");
          return;
        }
  
        let licencia = data.licencia || ""; // Asegurar que no sea undefined o null
  
        let tipoOfertaCargado = "";
        let detallesOferta = {};
  
        // Intentar obtener datos de carga
        const cargaResponse = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/carga`);
        if (cargaResponse.ok) {
          const text = await cargaResponse.text();
          if (text) {
            const cargaData = JSON.parse(text);
            if (cargaData && Object.keys(cargaData).length > 1) {
              tipoOfertaCargado = "CARGA";
              detallesOferta = cargaData;
            }
          }
        }
  
        // Intentar obtener datos de trabajo
        const trabajoResponse = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/trabajo`);
        if (trabajoResponse.ok) {
          const text = await trabajoResponse.text();
          if (text) {
            const trabajoData = JSON.parse(text);
            if (trabajoData && Object.keys(trabajoData).length > 1) {
              tipoOfertaCargado = "TRABAJO";
              detallesOferta = trabajoData;
            }
          }
        }
  
        setTipoOferta(tipoOfertaCargado);
        setFormData(prevState => ({
          ...prevState,
          ...data,
          ...detallesOferta,
          licencia, // Ahora es siempre un string
          tipoAnterior: tipoOfertaCargado, // Guardamos el tipo original
        }));
  
      } catch (error) {
        console.error("❌ Error en fetchOferta:", error);
      }
    };
  
    fetchOferta();
  }, []);
  
  
  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: String(value) }));
  };

  const validateForm = () => {
    if (!formData.titulo) {
      alert("El título es obligatorio.");
      return false;
    }
    if (tipoOferta === "TRABAJO" && (formData.mercancia || formData.peso || formData.origen || formData.destino)) {
      alert("No puedes mezclar datos de CARGA y TRABAJO. Por favor, elige solo un tipo.");
      return false;
    }
    if (tipoOferta === "CARGA" && (formData.fechaIncorporacion || formData.jornada)) {
        alert("No puedes mezclar datos de CARGA y TRABAJO. Por favor, elige solo un tipo.");
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
    if (!validateForm()) return;
  
    try {
      // 🚀 Verificar si el tipo de oferta ha cambiado
      const tipoCambiado = tipoOferta !== formData.tipoAnterior;
  
      let ofertaData: {
        tipoOferta: string;
        oferta: {
          titulo: string;
          experiencia: number;
          licencia: string;
          notas: string;
          estado: string;
          sueldo: string;
          fechaPublicacion: string;
          empresa: { id: number };
        };
        carga?: {
          mercancia: string;
          peso: number;
          origen: string;
          destino: string;
          distancia: number;
          inicio?: string | null;
          finMinimo?: string | null;
          finMaximo?: string | null;
        };
        trabajo?: {
          fechaIncorporacion: string;
          jornada: string;
        };
      } = {
        tipoOferta,
        oferta: {
          titulo: formData.titulo,
          experiencia: Number(formData.experiencia),
          licencia: Array.isArray(formData.licencia) ? formData.licencia.join(", ") : formData.licencia,
          notas: formData.notas,
          estado: formData.estado || "PENDIENTE",
          sueldo: parseFloat(formData.sueldo).toFixed(2),
          fechaPublicacion: formatDate(new Date()),
          empresa: { id: 201 },
        },
      };
  
      // 🔥 Si el tipo de oferta cambió, primero eliminar el tipo anterior
      if (tipoCambiado) {
        if (formData.tipoAnterior === "TRABAJO") {
          console.log("🗑 Eliminando datos de TRABAJO...");
          await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/trabajo`, { method: "DELETE" });
        } else if (formData.tipoAnterior === "CARGA") {
          console.log("🗑 Eliminando datos de CARGA...");
          await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/carga`, { method: "DELETE" });
        }
      }
  
    // 🔥 2️⃣ **Crear el nuevo tipo de oferta si ha cambiado**
    if (tipoCambiado) {
      if (tipoOferta === "TRABAJO") {
        console.log("🚀 Creando nueva oferta de TRABAJO...");
        await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/trabajo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fechaIncorporacion: formatDate(formData.fechaIncorporacion),
            jornada: formData.jornada,
          }),
        });
      } else if (tipoOferta === "CARGA") {
        console.log("🚀 Creando nueva oferta de CARGA...");
        await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/carga`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mercancia: formData.mercancia,
            peso: Number(formData.peso),
            origen: formData.origen,
            destino: formData.destino,
            distancia: Number(formData.distancia),
            inicio: formData.inicio ? formatDate(formData.inicio) : null,
            finMinimo: formData.finMinimo ? formatDate(formData.finMinimo) : null,
            finMaximo: formData.finMaximo ? formatDate(formData.finMaximo) : null,
          }),
        });
      }
    } else {
      // 🔥 3️⃣ **Si el tipo NO ha cambiado, solo actualizarlo**
      if (tipoOferta === "TRABAJO") {
        console.log("🔄 Actualizando oferta de TRABAJO...");
        await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/trabajo`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fechaIncorporacion: formatDate(formData.fechaIncorporacion),
            jornada: formData.jornada,
          }),
        });
      } else if (tipoOferta === "CARGA") {
        console.log("🔄 Actualizando oferta de CARGA...");
        await fetch(`${BACKEND_URL}/ofertas/${ofertaid}/carga`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mercancia: formData.mercancia,
            peso: Number(formData.peso),
            origen: formData.origen,
            destino: formData.destino,
            distancia: Number(formData.distancia),
            inicio: formData.inicio ? formatDate(formData.inicio) : null,
            finMinimo: formData.finMinimo ? formatDate(formData.finMinimo) : null,
            finMaximo: formData.finMaximo ? formatDate(formData.finMaximo) : null,
          }),
        });
      }
    }
  
      console.log("📩 Publicando oferta:", JSON.stringify(ofertaData, null, 2));
  
      const response = await fetch(`${BACKEND_URL}/ofertas/${ofertaid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ofertaData),
      });
  
      if (!response.ok) throw new Error(`Error al editar la oferta: ${response.statusText}`);
  
      console.log("✅ Oferta editada con éxito.");
      router.push("/miperfilempresa");
  
    } catch (error) {
      console.error("❌ Error al enviar la oferta:", error);
      alert("Hubo un error al editar la oferta.");
    }
  };
  
  // Función para renderizar cada input del formulario
  const renderInput = (label, field, icon, keyboardType = "default", secureTextEntry = false, multiline = false, placeholder = "") => (
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
          placeholder={placeholder}
          placeholderTextColor={colors.mediumGray}
          value={formData[field]}  // <-- Se asigna el valor aquí
          onChangeText={(value) => handleInputChange(field, value)}
        />
      </View>
    </View>
  );

  const handleTipoOfertaChange = (nuevoTipo) => {
    if (tipoOferta === nuevoTipo) return;
  
    setTipoOferta(nuevoTipo);
  
    // Limpiamos solo el estado local, sin afectar el backend todavía
    setFormData((prevState) => ({
      ...prevState,
      fechaIncorporacion: nuevoTipo === "TRABAJO" ? "" : prevState.fechaIncorporacion,
      jornada: nuevoTipo === "TRABAJO" ? "" : prevState.jornada,
      mercancia: nuevoTipo === "CARGA" ? "" : prevState.mercancia,
      peso: nuevoTipo === "CARGA" ? "" : prevState.peso,
      origen: nuevoTipo === "CARGA" ? "" : prevState.origen,
      destino: nuevoTipo === "CARGA" ? "" : prevState.destino,
      distancia: nuevoTipo === "CARGA" ? "" : prevState.distancia,
      inicio: nuevoTipo === "CARGA" ? "" : prevState.inicio,
      finMinimo: nuevoTipo === "CARGA" ? "" : prevState.finMinimo,
      finMaximo: nuevoTipo === "CARGA" ? "" : prevState.finMaximo,
    }));
  };
  


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Editar oferta</Text>

          {/* Campos generales */}
          {renderInput("Título", "titulo", <FontAwesome5 name="tag" size={20} color={colors.primary} />)}
          {renderInput("Experiencia (años)", "experiencia", <FontAwesome5 name="briefcase" size={20} color={colors.primary} />)}
          <View style={styles.inputContainer}>
              <Text style={{ color: colors.secondary, fontSize: 16, marginBottom: 10 }}>
                Licencia:
              </Text>
              <View style={styles.licenciaContainer}>
               {["AM", "A1", "A2", "A", "B", "C1", "C", "C1+E", "C+E", "D1", "D+E", "E", "D"].map((licencia) => (
                 <TouchableOpacity
                   key={licencia}
                   style={[
                     styles.licenciaButton,
                     formData.licencia === licencia && styles.licenciaButtonSelected
                   ]}
                   onPress={() => handleInputChange("licencia", licencia)}
                 >
                   <Text style={[
                     styles.licenciaText,
                     formData.licencia === licencia && styles.licenciaTextSelected
                   ]}>
                     {licencia}
                   </Text>
                 </TouchableOpacity>
               ))}
             </View>
            </View>

          {renderInput("Descripción", "notas", <FontAwesome5 name="align-left" size={20} color={colors.primary} />)}
          {renderInput("Sueldo (€)", "sueldo", <FontAwesome5 name="money-bill-wave" size={20} color={colors.primary} />)}

          {/* Selector de tipo de oferta */}
          <Text style={styles.title}>¿Qué tipo de oferta quieres publicar?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, tipoOferta === "TRABAJO" ? styles.selectedButton : styles.unselectedButton]}
              onPress={() => handleTipoOfertaChange("TRABAJO")}
              >
              <FontAwesome5 size={24} color={tipoOferta === "TRABAJO" ? colors.white : colors.secondary} />
              <Text style={[styles.userTypeText, tipoOferta === "TRABAJO" ? styles.selectedText : styles.unselectedText]}>
                TRABAJO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.userTypeButton, tipoOferta === "CARGA" ? styles.selectedButton : styles.unselectedButton]}
              onPress={() => handleTipoOfertaChange("CARGA")}
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
              {renderInput("Fecha de incorporación", "fechaIncorporacion", <FontAwesome5 name="calendar-check" size={20} color={colors.primary} />, "defaul", false, false, "YYYY-mm-dd")}

              <View style={styles.inputContainer}>
                <Text style={{ color: colors.secondary, fontSize: 16, marginBottom: 10 }}>
                  Jornada:
                </Text>              
                <View style={styles.jornadaContainer}>
                   {["REGULAR", "FLEXIBLE", "COMPLETA", "NOCTURNA", "RELEVOS", "MIXTA"].map((jornada) => (
                     <TouchableOpacity
                       key={jornada}
                       style={[
                         styles.jornadaButton,
                         formData.jornada === jornada && styles.jornadaButtonSelected
                       ]}
                       onPress={() => handleInputChange("jornada", jornada)}
                     >
                       <Text style={[
                         styles.jornadaText,
                         formData.jornada === jornada && styles.jornadaTextSelected
                       ]}>
                         {jornada}
                       </Text>
                     </TouchableOpacity>
                   ))}
                 </View>
              </View>
            </>
          ) : (
            <>
              {renderInput("Mercancía", "mercancia", <FontAwesome5 name="box" size={20} color={colors.primary} />)}
              {renderInput("Peso (kg)", "peso", <FontAwesome5 name="weight" size={20} color={colors.primary} />)}
              {renderInput("Origen", "origen", <FontAwesome5 name="map-marker-alt" size={20} color={colors.primary} />)}
              {renderInput("Destino", "destino", <FontAwesome5 name="map-marker" size={20} color={colors.primary} />)}
              {renderInput("Distancia (km)", "distancia", <FontAwesome5 name="road" size={20} color={colors.primary} />)}
              {renderInput("Inicio", "inicio", <FontAwesome5 name="clock" size={20} color={colors.primary} />, "defaul", false, false, "YYYY-mm-dd")}
              {renderInput("Fin mínimo", "finMinimo", <FontAwesome5 name="calendar-minus" size={20} color={colors.primary} />, "defaul", false, false, "YYYY-mm-dd")}
              {renderInput("Fin máximo", "finMaximo", <FontAwesome5 name="calendar-plus" size={20} color={colors.primary} />, "defaul", false, false, "YYYY-mm-dd")}
            </>
          )}

          {/* Botón de publicación */}
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
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
  licenciaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",  
    justifyContent: "center", 
    gap: 10, 
    width: "100%", 
  },
  licenciaButton: {
    width: "30%", 
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: "transparent",
  },
  licenciaButtonSelected: {
    backgroundColor: colors.primary, 
    borderColor: colors.primary,
  },
  licenciaText: {
    color: colors.secondary,
    fontSize: 16,
  },
  licenciaTextSelected: {
    color: colors.white, 
  },
  jornadaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",  
    justifyContent: "center", 
    gap: 10, 
    width: "100%", 
  },
  jornadaButton: {
    width: "30%", 
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: "transparent",
  },
  jornadaButtonSelected: {
    backgroundColor: colors.primary, 
    borderColor: colors.primary,
  },
  jornadaText: {
    color: colors.secondary,
    fontSize: 16,
    textAlign: "center",
  },
  jornadaTextSelected: {
    color: colors.white, 
  },
});

export default EditarOfertaScreen;
