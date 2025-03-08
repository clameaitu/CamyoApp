import React, { useEffect, useState } from 'react';
import { View, Text, Image, Platform, ScrollView, FlatList, TouchableOpacity, Linking } from 'react-native';
import frontendData from '../../assets/frontendData.json'; // Adjust the path if necessary
import styles from './css/UserProfileScreen'; // Adjust the path if necessary
import { FontAwesome } from '@expo/vector-icons';
import BottomBar from '../_components/BottomBar.jsx';
import CamyoWebNavBar from "../_components/CamyoNavBar.jsx";
import { useNavigation } from '@react-navigation/native';
import colors from '@/assets/styles/colors';
import defaultBanner from '../../assets/images/banner_default.jpg'; // Ensure this path is correct or update it accordingly


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

interface Review {
    id: number;
    reviewer: string;
    rating: number;
    text: string;
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

// Fake reviews data
const reviews: Review[] = [
    { id: 1, reviewer: 'John Doe', rating: 4, text: 'Great service!', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 2, reviewer: 'Jane Smith', rating: 5, text: 'Highly recommended!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, reviewer: 'Alice Johnson', rating: 3, text: 'Good, but could be better.', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, reviewer: 'Bob Brown', rating: 4, text: 'Very satisfied!', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, reviewer: 'Charlie Davis', rating: 5, text: 'Excellent experience!', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

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
            <View style={styles.bannerContainer}>
                <Image source={defaultBanner} style={styles.bannerImage} />
                <View style={isMobile ? styles.profileContainer : styles.desktopProfileContainer}>
                    <Image 
                        source={{ uri: user?.avatar }} 
                        style={isMobile ? styles.avatar : styles.desktopAvatar} 
                    />
                    <View style={styles.profileDetailsContainer}>
                        <Text style={isMobile ? styles.name : styles.desktopName}>{user?.nombre}</Text>
                        <View style={styles.detailsRow}>
                            <Text style={styles.infoText}>Tipo: {user?.tipo}</Text>
                            {user?.experiencia !== undefined && (
                                <Text style={styles.infoText}>{user.experiencia} años de experiencia</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={[isMobile ? styles.container : styles.desktopContainer, { paddingTop: isMobile ? 0 : 100, paddingLeft: 10 }]}>
                {isMobile && (
                    <View style={styles.infoContainer}>
                        <View style={styles.infoButton}>
                            <Text style={styles.infoText}>Tipo: {user?.tipo}</Text>
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
                                    <Text onPress={() => Linking.openURL(`mailto:${user?.email}`)}>{user?.email}</Text>
                                    </Text>  
                            </Text>
                        </View>
                        {user?.licencias && (
                            <View style={styles.detailItem}>
                                <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="id-card" size={20}/>{user.licencias.join(', ')}</Text>
                            </View>
                        )}
                        {user?.vehiculo_propio !== undefined && (
                            <View style={styles.detailItem}>
                                <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.truckIcon} name="truck" size={23}/>{user.vehiculo_propio ? 'Vehículo propio' : 'Sin vehículo propio'}</Text>
                            </View>
                        )}
                        <View style={styles.detailItem}>
                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="map" size={20}/>{user?.ubicacion}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}><FontAwesome style={styles.icon} name="phone" size={20}/>123 456 789</Text>
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
            </ScrollView>
        </>
    );
};

export default UserProfileScreen;