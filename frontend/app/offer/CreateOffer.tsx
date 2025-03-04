import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform, StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../../assets/styles/colors"; 

const licencias = ["AM", "A1", "A2", "A", "B", "C1", "C", "C1E", "CE", "D1", "DE", "D1E", "D"];

export default function PublishOfferScreen() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [licencia, setLicencia] = useState("");
  const [notas, setNotas] = useState("");
  const [sueldo, setSueldo] = useState("");

  const handleSubmit = () => {
    if (!titulo || !notas || !licencia) {
      alert("Completa todos los campos obligatorios");
      return;
    }
    const nuevaOferta = { titulo, experiencia, licencia, notas, sueldo };
    console.log("Oferta creada:", nuevaOferta);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Publicar nueva oferta</Text>
      </View>

      {/* Permite que el contenido se desplace con el botón */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            {/* Título */}
            <Text style={styles.label}>Título de la oferta<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput 
              style={styles.input} 
              value={titulo} 
              onChangeText={setTitulo}
              placeholder="Conductor C+E para ruta nacional"
              placeholderTextColor={colors.mediumGray}  
            />

            {/* Experiencia */}
            <Text style={styles.label}>Años de experiencia<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={experiencia}
              onChangeText={setExperiencia}
              keyboardType="numeric"
              placeholder="2"
              placeholderTextColor={colors.mediumGray} 
            />

            {/* Licencia requerida */}
            <Text style={styles.label}>Licencia requerida<Text style={{ color: 'red' }}>*</Text></Text>
            <View style={styles.licenciasContainer}>
              {licencias.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.licenciaButton,
                    licencia === item && styles.licenciaButtonSelected,
                  ]}
                  onPress={() => setLicencia(item)}
                >
                  <Text
                    style={[
                      styles.licenciaText,
                      licencia === item && styles.licenciaTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sueldo */}
            <Text style={styles.label}>Sueldo</Text>
            <TextInput
              style={styles.input}
              value={sueldo}
              onChangeText={setSueldo}
              keyboardType="numeric"
              placeholder="1000"
              placeholderTextColor={colors.mediumGray} 
            />

            {/* Notas */}
            <Text style={styles.label}>Descripción<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notas}
              onChangeText={setNotas}
              multiline={true}
              numberOfLines={4}
            />

            {/* Botón DENTRO del ScrollView */}
            <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
              <FontAwesome name="plus" size={18} color="white" />
              <Text style={styles.publishButtonText}> Publicar oferta</Text>
            </TouchableOpacity>

            {/* Espacio extra para evitar que el teclado lo tape */}
            <View style={{ height: 30 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#0C4A6E", padding: 15 },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 15 },
  scrollContent: { paddingBottom: 30 }, // Espacio extra para evitar que el teclado lo tape
  form: { padding: 15 },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  input: { backgroundColor: "white", padding: 10, borderRadius: 5, borderWidth: 1, borderColor: "gray" },
  textArea: { height: 80, textAlignVertical: "top" },
  licenciasContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  licenciaButton: { width: "30%", padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5, margin: 5, alignItems: "center" },
  licenciaButtonSelected: { backgroundColor: "#0C4A6E" },
  licenciaText: { fontSize: 14, color: "black" },
  licenciaTextSelected: { color: "white" },

  // Botón ahora dentro del ScrollView
  publishButton: { 
    flexDirection: "row", 
    backgroundColor: "#f15025", 
    padding: 12, 
    borderRadius: 5, 
    alignItems: "center", 
    justifyContent: "center", 
    width: "100%", 
    marginTop: 20 
  },
  publishButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});