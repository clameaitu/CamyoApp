import React, { useEffect, useState } from 'react';
import { View, Text, Image, Platform, ScrollView } from 'react-native';
import frontendData from '../../assets/frontendData.json'; // Adjust the path if necessary
import styles from './css/UserProfileScreen'; // Adjust the path if necessary
import { FontAwesome } from '@expo/vector-icons';
import BottomBar from '../_components/BottomBar';
import CamyoWebNavBar from "../_components/CamyoNavBar";
import { useNavigation } from '@react-navigation/native';

interface UserProfile {
    id: number;
    nombre: string;
    email: string;
    tipo: string;
    experiencia?: number;
    licencias?: string[];
    vehiculo_propio?: boolean;
    ubicacion: string;
    avatar: string;
}

// Get the first user from the JSON data
const placeholderUser: UserProfile = {
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

const UserProfileScreen: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(placeholderUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        // Hide the default header
        navigation.setOptions({ headerShown: false });

        // Simulate fetching user profile
        const fetchUserProfile = async () => {
            try {
                // Simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Set the placeholder user data
                setUser(placeholderUser);
            } catch (err) {
                setError('Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

    return (
        <>
            {isMobile ? <BottomBar /> : <CamyoWebNavBar />}
            <ScrollView contentContainerStyle={[isMobile ? styles.container : styles.desktopContainer, { paddingTop: isMobile ? 0 : 60 }]}>
                <View style={isMobile ? styles.profileContainer : styles.desktopProfileContainer}>
                    <Image 
                        source={{ uri: user?.avatar }} 
                        style={isMobile ? styles.avatar : styles.desktopAvatar} 
                    />
                    <View>
                        <Text style={isMobile ? styles.name : styles.desktopName}>{user?.nombre}</Text>
                        <View style={isMobile ? styles.infoContainer : styles.desktopInfoContainer}>
                            <View style={isMobile ? styles.infoButton : styles.desktopInfoButton}>
                                <Text style={isMobile ? styles.infoText : styles.desktopInfoText}>Tipo: {user?.tipo}</Text>
                            </View>
                            {user?.experiencia !== undefined && (
                                <View style={isMobile ? styles.infoButton2 : styles.desktopInfoButton2}>
                                    <Text style={isMobile ? styles.infoText : styles.desktopInfoText}>{user.experiencia} años de experiencia</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={isMobile ? styles.phoneContainer : styles.desktopPhoneContainer}>
                    <FontAwesome name="phone" style={isMobile ? styles.phoneIcon : styles.desktopPhoneIcon} />
                    <Text style={isMobile ? styles.phoneText : styles.desktopPhoneText}>+1 (234) 567-890</Text>
                </View>
                <View style={isMobile ? styles.detailsContainer : styles.desktopDetailsContainer}>
                    <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Email: {user?.email}</Text>
                    {user?.licencias && (
                        <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Licencias: {user.licencias.join(', ')}</Text>
                    )}
                    {user?.vehiculo_propio !== undefined && (
                        <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Vehículo propio: {user.vehiculo_propio ? 'Sí' : 'No'}</Text>
                    )}
                    <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Ubicación: {user?.ubicacion}</Text>
                </View>
            </ScrollView>
        </>
    );
};

export default UserProfileScreen;