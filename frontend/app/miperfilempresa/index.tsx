import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function CompanyDetailScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi perfil</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name="cog" size={24} color="white" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableOpacity 
    style={styles.modalContainer} 
    activeOpacity={1} 
    onPress={() => setModalVisible(false)}
  >
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
        <FontAwesome name="pencil" size={18} color="#0C4A6E" style={styles.modalIcon} />
        <Text style={styles.modalText}>Editar mi perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
        <FontAwesome name="credit-card" size={18} color="#0C4A6E" style={styles.modalIcon} />
        <Text style={styles.modalText}>Gestionar mi plan</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>

      
      <ScrollView style={styles.content}>
        {/* Empresa Info */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>SEUR</Text>
          <Text style={styles.companyDescription}>SEUR es la compañía referente en transporte urgente y logística integral en España</Text>
          <Text style={styles.companyDetails}>Transporte terrestre en camión · Sevilla · Empleados +10 mil</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Publicar Nueva Oferta</Text>
          </TouchableOpacity>
        </View>

        {/* Resumen */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumen</Text>
          <Text style={styles.summaryText}>
            SEUR, compañía pionera en el transporte urgente en España, lidera el sector con tres grandes ejes de negocio: internacional, comercio electrónico y envíos a temperatura controlada. En el último año hemos realizado más de 120 millones de envíos a nivel nacional.
          </Text>
        </View>

        {/* Ofertas */}
        <Text style={styles.offersTitle}>Ofertas publicadas recientemente:</Text>
        <View style={styles.offersContainer}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={[styles.offerCard, index % 2 === 0 ? styles.redBorder : styles.greenBorder]}>
              <Text style={styles.offerTitle}>Conductor C+E</Text>
              <Text style={styles.offerDate}>hace {index + 2} días</Text>
              <Text style={styles.offerDetails}>Sevilla · SEUR · 1200€/mes</Text>
              <Text style={styles.offerInfo}>• Experiencia requerida: 2 años{"\n"}• Licencia requerida: C+E{"\n"}• ¿Cuándo?: Incorporación inmediata</Text>
            </View>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { 
    backgroundColor: "#0C4A6E", 
    padding: 20, 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    position: "relative"
  },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  settingsButton: {
    position: "absolute",
    right: 20,
  },
  content: { padding: 15 },
  companyInfo: { alignItems: "center", marginBottom: 20 },
  logo: { width: 120, height: 40, resizeMode: "contain" },
  companyName: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  companyDescription: { fontSize: 14, textAlign: "center", marginVertical: 5 },
  companyDetails: { fontSize: 12, color: "gray" },
  button: { backgroundColor: "#E74C3C", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "white", fontWeight: "bold" },
  summary: { backgroundColor: "white", padding: 15, borderRadius: 5, marginBottom: 20 },
  summaryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  summaryText: { fontSize: 14, color: "gray" },
  offersTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  offersContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  offerCard: { width: "48%", backgroundColor: "white", padding: 10, borderRadius: 5, marginBottom: 10 },
  redBorder: { borderLeftWidth: 4, borderColor: "red" },
  greenBorder: { borderLeftWidth: 4, borderColor: "green" },
  offerTitle: { fontSize: 16, fontWeight: "bold" },
  offerDate: { fontSize: 12, color: "gray" },
  offerDetails: { fontSize: 12, fontWeight: "bold" },
  offerInfo: { fontSize: 12, color: "gray", marginTop: 5 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#0C4A6E", padding: 15 },
  settingsIcon: { marginRight: 10 },
  modalContainer: { 
    flex: 1, 
    alignItems: "flex-end", 
    backgroundColor: "rgba(0,0,0,0.2)", 
    paddingRight: 15, 
    paddingTop: 150 
  },
  modalContent: { 
    backgroundColor: "white", 
    paddingVertical: 10, 
    borderRadius: 8, 
    width: 180, 
    elevation: 5 
  },
  modalOption: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 8, 
    paddingHorizontal: 10 
  },
  modalIcon: { 
    marginRight: 10 
  },
  modalText: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#333" 
  },
  
});
