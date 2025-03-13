import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Platform, Image, Animated, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import colors from "frontend/assets/styles/colors";
import React, { useEffect, useState, useRef } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
const ProyectoLogo = require('frontend/assets/images/camyo.png');
import BottomBar from '../_components/BottomBar';
import CamyoWebNavBar from "../_components/CamyoNavBar";
import { useAuth } from "../../contexts/AuthContext";

export default function Ejemplo() {
  const router = useRouter();
  const { user, userToken, login, logout } = useAuth();

  return (
    <>
      {Platform.OS === 'web' ? (
        <CamyoWebNavBar />
      ) : (
        <View style={styles.phone}>
          <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
          
          {/* Barra de búsqueda */}
          <View style={styles.searchView}>
            <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
            <View style={styles.barraSuperior}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar Ofertas"
                placeholderTextColor={colors.secondary}
              />
              <TouchableOpacity>
                <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <BottomBar />
        </View>
      )}

      {/* Mostrar perfil en web si el usuario está logueado */}
      {Platform.OS === 'web' && user ? (
        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>Bienvenido, {user.username}</Text>
          <Text style={styles.profileText}>ID: {user.id}</Text>
          <Text style={styles.profileText}>Nombre: {user.nombre}</Text>
          <Text style={styles.profileText}>Email: {user.email}</Text>
          <Text style={styles.profileText}>Teléfono: {user.telefono}</Text>
          <Text style={styles.profileText}>Localización: {user.localizacion}</Text>
          <Text style={styles.profileText}>Descripción: {user.descripcion}</Text>
          <Text style={styles.profileText}>Rol: {user.rol}</Text>
          
          {/* Mostrar el objeto completo de usuario */}
          <Text style={styles.profileText}>USER: {JSON.stringify(user)}</Text>

          <TouchableOpacity onPress={() => logout()}>
            <Text style={styles.profileLink}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Mostrar mensaje si no está logueado */}
      {Platform.OS === 'web' && !user ? (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Bienvenido, por favor inicia sesión para continuar.</Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={styles.loginLink}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  phone: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 100, 
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  barraSuperior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lightGray,
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 50,
    borderColor: "transparent",
    marginRight: 3,
    flex: 1,
  },
  searchIcon: {
    color: colors.primary,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 100,
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    width: "90%",
  },
  profileText: {
    fontSize: 18,
    color: colors.primary,
    marginVertical: 5,
    textAlign: "center",
    width: "100%", 
    overflow: "hidden", 
    flexWrap: "wrap", 
  },  
  profileLink: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 10,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  greetingContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    width: "90%",
  },
  greetingText: {
    fontSize: 18,
    color: colors.primary,
    textAlign: "center",
  },
  loginLink: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 10,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
