import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Platform, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomBar from "../_components/BottomBar.jsx";
import CamyoWebNavBar from "../_components/CamyoNavBar.jsx";
import defaultBanner from "../../assets/images/empresa.jpg";
import defaultImage from "../../assets/images/image_perfil_empresa.jpg";

import colors from '@/assets/styles/colors';
import { useAuth } from '../../contexts/AuthContext';
import { router, useNavigation } from "expo-router";
import axios from "axios";


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
  const { userToken, user } = useAuth();
  const navigation = useNavigation();
  const [offers, setOffers] = useState<any[]>([]);
  const [offerStatus, setOfferStatus] = useState<string>('ACEPTADA');

  useEffect(() => {
    if (!userToken) {
      router.push('/login');
    }

    if (!user || user.roles[0] !== "EMPRESA") {
      console.warn("Acceso denegado. Redirigiendo...")
      router.replace("/")
    }
    fetchEmpresaData();
    // Hide the default header
    navigation.setOptions({ headerShown: false });

  }, [userToken, user]);

  useEffect(() => {
    if (!userToken) {
      router.push('/login');
    }

    fetchOffers();
    // Hide the default header
    navigation.setOptions({ headerShown: false });

  }, [userToken, user, offerStatus]); // Add offerStatus to dependency array

  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/ofertas/aplicadas/${user.id}?estado=${offerStatus}`);
      console.log(response.data);
      setOffers(response.data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmpresaData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/empresas/${user.id}`);
      /*const data: Empresa = await response.json();*/
      setEmpresa(response.data);
    } catch (err) {
      setError((err as Error)?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  const isMobile = Platform.OS === "ios" || Platform.OS === "android";

  const getNoOffersMessage = () => {
    switch (offerStatus) {
      case 'ACEPTADA':
        return 'No hay ofertas aceptadas';
      case 'PENDIENTE':
        return 'No hay ofertas pendientes';
      case 'RECHAZADA':
        return 'No hay ofertas rechazadas';
      default:
        return '';
    }
  };

  return (
    <>
      {isMobile ? <BottomBar /> : <CamyoWebNavBar />}

      <ScrollView contentContainerStyle={[isMobile ? styles.container : styles.desktopContainer, { paddingTop: isMobile ? 0 : 100, paddingLeft: 10 }]}>
      <View style={styles.bannerContainer}>
        <Image source={defaultBanner} style={styles.bannerImage} />
        <View style={isMobile ? styles.profileContainer : styles.desktopProfileContainer}>
          <Image
            source={empresa?.usuario?.foto ? { uri: empresa.usuario.foto } : defaultImage}
            style={isMobile ? styles.avatar : styles.desktopAvatar}
          />
          <View style={styles.profileDetailsContainer}>
            <Text style={isMobile ? styles.name : styles.desktopName}>{empresa?.usuario?.nombre}</Text>
          </View>
        </View>
      </View>
        <View style={styles.detailsOuterContainer}>
          <View style={styles.detailsColumn}>
            <View style={styles.detailItem}>
              <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="globe" size={20} />{empresa?.web}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="building" size={20} />{empresa?.nif || "NIF no disponible"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="map-marker" size={20} />{empresa?.usuario?.localizacion || "Ubicación no especificada"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="phone" size={20} />{empresa?.usuario?.telefono || "Sin número de contacto"}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push(`/miperfilempresa/editar`)}
            >
              <Text style={styles.editButtonText}> Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push(`/oferta/crear`)}
            >
              <Text style={styles.editButtonText}>Publicar nueva oferta</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.offersContainer}>
          <View style={styles.offersButtonContainer}>
            <TouchableOpacity style={styles.offersButton} onPress={() => setOfferStatus('ACEPTADA')}>
              <Text style={styles.offersButtonText}>Ofertas aceptadas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offersButton} onPress={() => setOfferStatus('PENDIENTE')}>
              <Text style={styles.offersButtonText}>Ofertas pendientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offersButton} onPress={() => setOfferStatus('RECHAZADA')}>
              <Text style={styles.offersButtonText}>Ofertas rechazadas</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {offers.length === 0 ? (
                <Text style={styles.noOffersText}>{getNoOffersMessage()}</Text>
              ) : (
                offers.map((item) => (
                  <View key={item.id} style={styles.card}>
                    <Image source={defaultCompanyLogo} style={styles.companyLogo} />
                    <View style={{ width: "30%" }}>
                      <Text style={styles.offerTitle}>{item.titulo}</Text>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.offerDetailsTagExperience}>{">"}{item.experiencia} años</Text>
                        <Text style={styles.offerDetailsTagLicense}>{item.licencia}</Text>
                      </View>
                      <Text style={styles.offerInfo}>{item.notas}</Text>
                    </View>
                    <Text style={styles.offerSueldo}>{item.sueldo}€</Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.push(`/oferta/${item.id}`)}>
                      <MaterialCommunityIcons name="details" size={15} color="white" style={styles.detailsIcon} />
                      <Text style={styles.buttonText}>Ver Detalles</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'fixed',
    top: 50,
    width: '100%',
    left: 0,
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginLeft: '12.5%',
    position: 'relative',
    top: 100,
  },
  desktopProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: '12.5%',
    position: 'relative',
    top: 100,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    position: 'relative',
    left: 20,
    top: -40,
  },
  desktopAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    position: 'fixed',
    left: 350,
    top: 150,
  },
  profileDetailsContainer: {
    marginLeft: 50,
    marginTop: 40,
    position: 'fixed',
    top: 100,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  desktopName: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'fixed',
    left: 600,
    top: 260,
  },
  detailsOuterContainer: {
    alignItems: 'left',
    position: 'fixed',
    top: 370,
    bottom: 50,
    left: 350,
    width: '100%',
  },
  detailsColumn: {
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
    position: 'fixed',

  },
  detailItem: {
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
  },
  detailsText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',

  },
  icon: {
    fontSize: 20,
    color: colors.secondary,
    marginRight: 10,
    marginLeft: 10,
    position: 'relative',
    top: -2,
    right: 0,
    width: 30,
    textAlign: 'center',
    verticalAlign: 'bottom',
  },
  linkText: { color: "#007BFF", textDecorationLine: "underline" },
  loadingText: { textAlign: "center", fontSize: 18, color: "gray", marginTop: 50 },
  errorText: { textAlign: "center", fontSize: 18, color: "red", marginTop: 50 },
  detailsRow: { flexDirection: "row", alignItems: "center" },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 100,
    paddingLeft: 10,
},
  desktopContainer: { flexGrow: 1, padding: 50 },
  infoText: { fontSize: 16, color: "#333" },
  desktopDetailsText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 15,
    marginLeft: '1%',
    textAlign: 'left',
    width: '100%',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollview: {
    flex: 1,
    padding: 10,
    marginVertical: 40,
    position: 'absolute',
    top: 20, // Adjust this value based on the height of CamyoWebNavBar
    left: 0,
    right: 0,
    bottom: -40,
  },

  scrollviewIndicator: {
    backgroundColor: colors.primary,
    width: 3,
    borderRadius: 1.5,
  },

  offersContainer: {
    flex: 1,
    width: '65%',
    position: 'fixed',
    top: 350, // Adjusted to place the offers below the header
    left: 400,
    height: 1000,
    padding: 10,
    marginLeft: 20, // Adjust as needed to position next to the details column
    marginTop: 1, // Adjust to start at the height of the email
  },
  offersButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    position: 'absolute', // Match the position of the offers container
    top: 10, // Adjust as needed to match the offers container
    left: 210, // Adjust as needed to match the offers container
    right: 0, // Adjust as needed to match the offers container

  },

  offersButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },

  offersButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  noOffersText: {
    fontSize: 20,
    color: colors.secondary
  },
});

export default EmpresaPerfil;
