import React, { useEffect, useState } from 'react';
import { View, Text, Image, Platform, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import frontendData from '../../assets/frontendData.json'; // Adjust the path if necessary
import styles from './css/UserProfileScreen'; // Adjust the path if necessary
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomBar from '../_components/BottomBar.jsx';
import CamyoWebNavBar from "../_components/CamyoNavBar.jsx";
import { useNavigation } from '@react-navigation/native';
import colors from '@/assets/styles/colors';
import defaultBanner from '../../assets/images/banner_default.jpg'; // Ensure this path is correct or update it accordingly
import defaultCompanyLogo from '../../assets/images/defaultCompImg.png'; // Ensure this path is correct or update it accordingly
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { router } from 'expo-router';

interface Camionero {
    id: number;
    nombre: string;
    email: string;
    disponibilidad: string;
    experiencia?: number;
    licencias?: string[];
    vehiculo_propio?: boolean;
    localizacion: string;
    avatar: string;
    telefono: string;
    foto: string;
    descripcion: string;
}

interface Review {
    id: number;
    reviewer: string;
    rating: number;
    text: string;
    avatar: string;
}

// Get the first user from the JSON data
const placeholderUser: Camionero = {
    id: frontendData.usuarios[0].id,
    nombre: frontendData.usuarios[0].nombre,
    email: frontendData.usuarios[0].email,
    tipo: frontendData.usuarios[0].tipo,
    experiencia: frontendData.usuarios[0].experiencia,
    licencias: frontendData.usuarios[0].licencias,
    vehiculo_propio: frontendData.usuarios[0].vehiculo_propio,
    ubicacion: frontendData.usuarios[0].ubicacion,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder image URL of a person
};

// Fake reviews data
const reviews: Review[] = [
    { id: 1, reviewer: 'John Doe', rating: 4, text: 'Great service!', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 2, reviewer: 'Jane Smith', rating: 5, text: 'Highly recommended!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, reviewer: 'Alice Johnson', rating: 3, text: 'Good, but could be better.', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, reviewer: 'Bob Brown', rating: 4, text: 'Very satisfied!', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, reviewer: 'Charlie Davis', rating: 5, text: 'Excellent experience!', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

const UserProfileScreen: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [camionero,setCamionero] = useState<Camionero| null>(null);
    const navigation = useNavigation();
    const { userToken, user,getUserData } = useAuth();
    const [offers, setOffers] = useState<any[]>([]);
    const [offerStatus, setOfferStatus] = useState<string>('ACEPTADA'); // State to track selected offer status
    const placeholderAvatar = 'https://ui-avatars.com/api/?name='
    const PlaceHolderLicencias = 'No tiene licencias'
    const [licencias,setLicencias] = useState<string[]>([]);
    const [disp,setDisp] = useState<string>('');
    const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
    var data;
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const normalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    useEffect(() => {
        if (!userToken) {
            router.push('/login');
        }
        /*if (!user || user.usuario.authority.authority !== "CAMIONERO") {
            console.warn("Acceso denegado. Redirigiendo...")
            router.replace("/")
          }
            */
        fetchCamioneroData(); 
        fetchOffers();
        // Hide the default header
        navigation.setOptions({ headerShown: false });

    }, [userToken, user, offerStatus]); // Add offerStatus to dependency array

    const fetchCamioneroData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/camioneros/${user.id}`);
          setCamionero(response.data.usuario);
          setLicencias(response.data.licencias);
          setDisp(response.data.disponibilidad);
          console.log(response.data);
          console.log(response.data.licencias);
        } catch (err) {
          setError((err as Error)?.message || "Error desconocido");
        } finally {
          setLoading(false);
        }
      };

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

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    console.log(userToken)
    console.log("id" + user.id )
    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

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
                            source={{ uri: camionero?.foto || 'https://ui-avatars.com/api/?name=' + camionero?.nombre }} 
                            style={isMobile ? styles.avatar : styles.desktopAvatar} 
                        />
                        <View style={styles.profileDetailsContainer}>
                        <TouchableOpacity
              style = {styles.editButton}
              onPress={() => router.push(`/miperfilempresa/editar`)}
            >
              <Text style = {styles.editButtonText}> Editar Perfil</Text>
            </TouchableOpacity>

                            <Text style={isMobile ? styles.name : styles.desktopName}>{camionero?.nombre}</Text>
                            <View style={styles.detailsRow}>
                                <Text style={styles.infoText}>DIsponibilidad: {normalizeFirstLetter(disp || '')}</Text>
                                {user?.experiencia !== undefined && (
                                    <Text style={styles.infoText}>{camionero.experiencia} años de experiencia</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                
                {isMobile && (
                    <View style={styles.infoContainer}>
                        <View style={styles.infoButton}>
                            <Text style={styles.infoText}>Descripción: {user?.descripcion}</Text>
                        </View>
                        {user?.experiencia !== undefined && (
                            <View style={styles.infoButton2}>
                                <Text style={styles.infoText}>{user.experiencia} años de experiencia</Text>
                            </View>
                        )}
                    </View>
                )}
                <View style={styles.detailsOuterContainer}>
                    <View style={styles.detailsColumn}>
                        <View style={styles.detailItem}>
                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>
                                <FontAwesome style={styles.envelopeIcon} name="envelope" size={20}/>
                                <Text style={styles.linkText}>
                                    <Text onPress={() => Linking.openURL(`mailto:${camionero?.email}`)}>{camionero?.email}</Text>
                                </Text>  
                            </Text>
                        </View>
                        
                            <View style={styles.detailItem}>
                                <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="id-card" size={20}/>{licencias.join(', ') || PlaceHolderLicencias}</Text>
                            </View>
                        
                        {user?.vehiculo_propio !== undefined && (
                            <View style={styles.detailItem}>
                                <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.truckIcon} name="truck" size={23}/>{camionero?.vehiculo_propio ? 'Vehículo propio' : 'Sin vehículo propio'}</Text>
                            </View>
                        )}
                        <View style={styles.detailItem}>
                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="map" size={20}/>{camionero?.localizacion}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="phone" size={20}/>{camionero?.telefono}</Text>
                        </View>
                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionText}>{capitalizeFirstLetter(camionero?.descripcion || '')}</Text>
                        </View>
                    </View>
                </View>
                {/* <FlatList
                    data={reviews}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.reviewCard, !isMobile && styles.desktopReviewCard]}>
                            <Image source={{ uri: item.avatar }} style={styles.reviewerAvatar} />
                            <Text style={styles.reviewerName}>{item.reviewer}</Text>
                            <View style={styles.ratingContainer}>
                                {[...Array(5)].map((_, index) => (
                                    <FontAwesome
                                        key={index}
                                        name="star"
                                        size={20}
                                        color={index < item.rating ? colors.primary : colors.lightGray}
                                    />
                                ))}
                            </View>
                            <Text style={styles.reviewText}>{item.text}</Text>
                        </View>
                    )}
                
                    contentContainerStyle={isMobile ? styles.reviewsContainer : styles.desktopReviewsContainer}
                /> */}
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

export default UserProfileScreen;