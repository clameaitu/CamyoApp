import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from "../../contexts/AuthContext";
import { Entypo } from '@expo/vector-icons';
import colors from "frontend/assets/styles/colors";
import { router, useRouter } from 'expo-router';
import axios from 'axios';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const ProfileDropdown = ({ user }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userToken, logout } = useAuth();

  return (
    <View style={styles.container}>
      {/* Foto de perfil */}
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Image
          source={{
            uri: user?.foto || 'https://ui-avatars.com/api/?name=' + user?.nombre,
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Dropdown */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <Entypo
            name="cross"
            size={20}
            color={colors.primary}
            style={styles.crossIcon}
            onPress={() => setDropdownVisible(false)}
          />
          <Image
            source={{
              uri: user?.foto || 'https://ui-avatars.com/api/?name=' + user?.nombre,
            }}
            style={styles.avatarDropdown}
          />
          <Text style={styles.dropdownHeader}>¡Hola, {user.nombre}!</Text>
          <Text style={styles.dropdownEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => router.replace('/miperfil')} >
            <Text style={styles.dropdownButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => logout()}>
            <Text style={styles.dropdownButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  avatar: {
    width: 50, // Aumenté el tamaño del avatar
    height: 50, // Aumenté el tamaño del avatar
    borderRadius: 25,
    marginLeft: 10, // Aumenté el margen inferior para más espacio
    borderWidth: 1,
    borderColor: '#ccc',
  },
  avatarDropdown: {
    width: 100, // Aumenté el tamaño del avatar
    height: 100, // Aumenté el tamaño del avatar
    borderRadius: 25,
    borderRadius: 60,
    marginBottom: 10, // Aumenté el margen inferior para más espacio
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdown: {
    position: 'absolute',
    top: 70, // Ajusté la posición para que esté debajo de la foto más grande
    right: 0,
    backgroundColor: 'white',
    padding: 20, // Aumenté el padding para hacer el dropdown más grande
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    display: 'flex',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 220, // Aumenté el ancho del dropdown
  },
  dropdownHeader: {
    fontSize: 18, // Aumenté el tamaño de la fuente del saludo
    fontWeight: '500',
    textAlign: 'center',
    color: '#202124',
    marginBottom: 2// Aumenté el margen inferior para más espacio
  },
  dropdownEmail: {
    fontSize: 10,
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: 15, // Aumenté el margen inferior para más espacio
  },
  dropdownButton: {
    paddingVertical: 10, // Aumenté el padding vertical para más espacio
  },
  dropdownButtonText: {
    fontSize: 14,
    backgroundColor: colors.secondary,
    color: colors.white,
    minWidth:150,
    padding:4,
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: 40,
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: 4,
  }
});

export default ProfileDropdown;