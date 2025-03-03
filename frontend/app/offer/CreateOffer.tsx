import React, { useState } from "react";
import { Keyboard, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../assets/styles/colors"; 

const licencias = ["AM", "A1", "A2", "A", "B", "C1", "C", "C1E", "CE", "D1", "DE", "D1E", "D"];

export default function CreateOfferScreen() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [licencia, setLicencia] = useState("");
  const [notas, setNotas] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [fechaPublicacion] = useState(new Date().toISOString());

    // Estados para los mensajes de error
    const [errorTitulo, setErrorTitulo] = useState("");
    const [errorNotas, setErrorNotas] = useState("");
    const [errorExperiencia, setErrorExperiencia] = useState("");
    const [errorSueldo, setErrorSueldo] = useState("");
    const [errorLicencia, setErrorLicencia] = useState("");

  const handleSubmit = () => {
    console.log("handleSubmit se ha ejecutado");
    // Limpiar errores previos
    setErrorTitulo("");
    setErrorNotas("");
    setErrorExperiencia("");
    setErrorSueldo("");
    setErrorLicencia("");

    let valid = true;

    if (!titulo) {
        setErrorTitulo("Este campo es obligatorio");
        valid = false;
      }
      if (!notas) {
        setErrorNotas("Este campo es obligatorio");
        valid = false;
      }
      if (!licencia) {
        setErrorLicencia("Debes seleccionar una licencia requerida");
        valid = false;
      }
  
      if (!experiencia) {
        setErrorExperiencia("Este campo es obligatorio");
        valid = false;
      }
      if (isNaN(Number(experiencia)) || Number(experiencia) < 0) {
        console.log("La experiencia no es un número válido");
        setErrorExperiencia("La experiencia debe ser un número válido");
        valid = false;
      }
    
      if (sueldo && isNaN(Number(sueldo))) {
        console.log("El sueldo no es un número válido");
        setErrorSueldo("El sueldo debe ser un número válido");
        valid = false;
      }
      if (!valid) return;
  

    const nuevaOferta = { titulo, experiencia, licencia, notas, fechaPublicacion, sueldo };
    console.log("Oferta creada:", nuevaOferta);

    router.replace("/");

  };

  return (

    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Publicar nueva oferta</Text>

        <Text style={styles.label}>Título de la oferta<Text style={{ color: 'red' }}>*</Text></Text>
        <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={(text) => {
                setTitulo(text);
                if (text) setErrorTitulo(""); // Limpiar error al escribir
              }}
            placeholder="Conductor C+E para ruta nacional"
            placeholderTextColor={colors.mediumGray} 

        />
        {errorTitulo ? <Text>{errorTitulo}</Text> : null}


        <Text style={styles.label}>Licencia requerida<Text style={{ color: 'red' }}>*</Text></Text>
        <View style={styles.optionsContainer}>
            {licencias.map((item) => (
            <TouchableOpacity
                key={item}
                style={[styles.optionButton, licencia === item && styles.selectedOption]}
                onPress={() => {
                    setLicencia(item);
                    if (item) setErrorLicencia("");
                  }}            >
                <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
            ))}
        </View>
        {errorLicencia ? <Text>{errorLicencia}</Text> : null}

        <View style={styles.rowContainer}>
            <View style={styles.column}>
                <Text style={styles.label}>Experiencia requerida en años<Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="3"
                    value={experiencia}
                    onChangeText={(text) => {
                        setExperiencia(text);
                        if (text) setErrorExperiencia("");
                      }}
                      placeholderTextColor={colors.mediumGray} 
                    />
                {errorExperiencia ? <Text>{errorExperiencia}</Text> : null}
                 

            </View>

            <View style={styles.column}>
                <Text style={styles.label}>Salario</Text>
                <TextInput
                    style={styles.input}
                    placeholder="1000.00"
                    keyboardType="numeric"
                    value={sueldo}
                    onChangeText={(text) => {
                        setSueldo(text);
                        if (text) setErrorSueldo("");
                      }}
                      placeholderTextColor={colors.mediumGray} 
                    />
                    {errorSueldo ? <Text>{errorSueldo}</Text> : null}
                 
            </View>
        </View>

        <Text style={styles.label}>Detalles de la oferta</Text>
        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notas adicionales"
            value={notas}
            onChangeText={(text) => {
                setNotas(text);
                if (text) setErrorNotas("");
              }}
              placeholderTextColor={colors.mediumGray}
              multiline={true}
              numberOfLines={4}
            />
            {errorNotas ? <Text>{errorNotas}</Text> : null}
    
        <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
            console.log("Botón presionado");
            Keyboard.dismiss();

            handleSubmit();
        }}>
        <Text style={styles.buttonText}>Publicar Oferta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    margin: 60,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.secondary,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.secondary,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#004B80",
    alignItems: "center",
    marginHorizontal: 5,
  },
  toggleText: {
    color: "#004B80",
    fontWeight: "bold",
  },
  selectedToggle: {
    backgroundColor: "#004B80",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: colors.mediumGray,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: "white",
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  
});