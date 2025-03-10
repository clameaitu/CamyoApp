import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Platform, Linking, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomBar from "../_components/BottomBar.jsx";
import CamyoWebNavBar from "../_components/CamyoNavBar.jsx";
import defaultBanner from "../../assets/images/empresa.jpg";

// Definir la interfaz para la empresa y usu
interface Usuario {
  id: number;
  nombre: string;
  telefono: string;
  username: string;
  email: string;
  localizacion: string;
  descripcion: string;
  foto?: string | null;
}

interface Empresa {
  id: number;
  web: string;
  nif: string;
  usuario: Usuario;
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const EmpresaPerfil = () => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/empresas/201`);
        if (!response.ok) throw new Error("Error al cargar datos de la empresa");
        const data: Empresa = await response.json();
        setEmpresa(data);
      } catch (err) {
        setError((err as Error)?.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresaData();
  }, []);

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  const isMobile = Platform.OS === "ios" || Platform.OS === "android";

  return (
    <>
      {isMobile ? <BottomBar /> : <CamyoWebNavBar />}
      <View style={styles.bannerContainer}>
        <Image source={defaultBanner} style={styles.bannerImage} />
        <View style={isMobile ? styles.profileContainer : styles.desktopProfileContainer}>
          <Image 
            source={empresa?.usuario?.foto ? { uri: empresa.usuario.foto } : defaultBanner} 
            style={isMobile ? styles.avatar : styles.desktopAvatar} 
          />
          <View style={styles.profileDetailsContainer}>
            <Text style={isMobile ? styles.name : styles.desktopName}>{empresa?.usuario?.nombre}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.infoText}>Tipo: {empresa?.usuario?.descripcion || "Empresa de transporte"}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={[isMobile ? styles.container : styles.desktopContainer]}>
        <View style={styles.detailsOuterContainer}>
          <View style={styles.detailsColumn}>
            <DetailItem icon="globe" text={empresa?.web} link />
            <DetailItem icon="building" text={empresa?.nif || "NIF no disponible"} />
            <DetailItem icon="map-marker" text={empresa?.usuario?.localizacion || "Ubicación no especificada"} />
            <DetailItem icon="phone" text={empresa?.usuario?.telefono || "Sin número de contacto"} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// Componente reutilizable para los detalles
const DetailItem = ({ icon, text, link = false }: { icon: string; text?: string; link?: boolean }) => (
  <View style={styles.detailItem}>
    <FontAwesome style={styles.icon} name={icon} size={20} />
    {link ? (
      <Text style={styles.linkText} onPress={() => text && Linking.openURL(text)}>
        {text || "No disponible"}
      </Text>
    ) : (
      <Text style={styles.detailsText}>{text}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  bannerContainer: { width: "100%", height: 200 },
  bannerImage: { width: "100%", height: "100%", resizeMode: "cover", position: "absolute" },
  profileContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50 },
  desktopProfileContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 100 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  desktopAvatar: { width: 150, height: 150, borderRadius: 75 },
  profileDetailsContainer: { marginLeft: 20 },
  name: { fontSize: 24, fontWeight: "bold" },
  desktopName: { fontSize: 30, fontWeight: "bold" },
  detailsOuterContainer: { padding: 20 },
  detailsColumn: { flexDirection: "column" },
  detailItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  detailsText: { fontSize: 16, color: "#333" },
  icon: { marginRight: 10, color: "#007BFF" },
  linkText: { color: "#007BFF", textDecorationLine: "underline" },
  loadingText: { textAlign: "center", fontSize: 18, color: "gray", marginTop: 50 },
  errorText: { textAlign: "center", fontSize: 18, color: "red", marginTop: 50 },
  detailsRow: { flexDirection: "row", alignItems: "center" },
  container: { flexGrow: 1, padding: 20 },
  desktopContainer: { flexGrow: 1, padding: 50 },
  infoText: { fontSize: 16, color: "#333" },

});

export default EmpresaPerfil;
