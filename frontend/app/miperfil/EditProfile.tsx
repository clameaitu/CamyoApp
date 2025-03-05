import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Platform, ScrollView } from 'react-native';
import styles from './css/UserProfileScreen'; // Usamos los mismos estilos
import BottomBar from '../_components/BottomBar';
import CamyoWebNavBar from "../_components/CamyoNavBar";
import frontendData from '../../assets/frontendData.json'; // Adjust the path if necessary

const placeholderUser = {
    id: frontendData.usuarios[0].id,
    nombre: frontendData.usuarios[0].nombre,
    email: frontendData.usuarios[0].email,
    tipo: frontendData.usuarios[0].tipo,
    experiencia: frontendData.usuarios[0].experiencia ?? 0,
    licencias: frontendData.usuarios[0].licencias ?? [],
    vehiculo_propio: frontendData.usuarios[0].vehiculo_propio,
    ubicacion: frontendData.usuarios[0].ubicacion,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder image URL of a person
};

const EditProfileScreen: React.FC = () => {
    const [user, setUser] = useState(placeholderUser);

    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

    const handleChange = (key: string, value: string | number | string[]) => {
        setUser({ ...user, [key]: value });
    };

    return (
        <>
            {isMobile ? <BottomBar /> : <CamyoWebNavBar />}
            <ScrollView contentContainerStyle={[isMobile ? styles.container : styles.desktopContainer, { paddingTop: isMobile ? 0 : 60 }]}>
                
                <View style={isMobile ? styles.profileContainer : styles.desktopProfileContainer}>
                    <Image source={{ uri: user.avatar }} style={isMobile ? styles.avatar : styles.desktopAvatar} />
                    <Text style={isMobile ? styles.name : styles.desktopName}>Editar Perfil</Text>
                </View>

                <View style={isMobile ? styles.detailsContainer : styles.desktopDetailsContainer}>
                    
                    <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={user.nombre}
                        onChangeText={(text) => handleChange("nombre", text)}
                    />

                    <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={user.email}
                        keyboardType="email-address"
                        onChangeText={(text) => handleChange("email", text)}
                    />

                    <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Ubicación:</Text>
                    <TextInput
                        style={styles.input}
                        value={user.ubicacion}
                        onChangeText={(text) => handleChange("ubicacion", text)}
                    />

                    {user.tipo === "autónomo" || user.tipo === "asalariado" ?  (
                        <>
                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Experiencia (años):</Text>
                            <TextInput
                                style={styles.input}
                                value={user.experiencia.toString()}
                                keyboardType="numeric"
                                onChangeText={(text) => 
                                    handleChange("experiencia", text.trim() === "" ? 0 : Number(text))
                                }                            
                            />

                            <Text style={isMobile ? styles.detailsText : styles.desktopDetailsText}>Licencias:</Text>
                            <TextInput
                                style={styles.input}
                                value={user.licencias ? user.licencias.join(", ") : ""}
                                onChangeText={(text) => handleChange("licencias", text ? text.split(", ") : [])}
                            />
                        </>
                    ) : null}

                    <Button title="Guardar Cambios" onPress={() => alert("Perfil actualizado")} />
                </View>
            </ScrollView>
        </>
    );
};

export default EditProfileScreen;
