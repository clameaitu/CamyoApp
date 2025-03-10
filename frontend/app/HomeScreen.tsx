import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Platform, Image, Animated, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import colors from "frontend/assets/styles/colors";
import React, { useEffect, useState, useRef } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
const ProyectoLogo = require('frontend/assets/images/camyo.png');
import BottomBar from './_components/BottomBar';
import CamyoWebNavBar from "./_components/CamyoNavBar";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user, userToken } = useAuth();

  return (
    <>
      {Platform.OS === 'web' ? (
        <CamyoWebNavBar/>

      ) : (
        <View style={styles.phone}>
          <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
          <View style={styles.searchView}>
            <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
            <View style={styles.barraSuperior}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar Ofertas"
                placeholderTextColor={colors.secondary}
              />
              <TouchableOpacity>  <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} /></TouchableOpacity>
            
            </View>
          </View>
          <BottomBar />
        </View>
      )}

      {/* Mostrar el perfil solo si estamos en la plataforma web y el usuario está logueado */}
      {Platform.OS === 'web' && user ? (
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => router.push("/ejemplo")}>
            <Text style={styles.profileLink}>Ejemplo de uso</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Mostrar un mensaje si no está logueado en web */}
      {Platform.OS === 'web' && !user ? (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Bienvenido, por favor inicia sesión para continuar.</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
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
  },
  logo: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  searchIcon: {
    color: colors.primary,
    marginRight: 10,
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "5%",
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 20,
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
    outlineStyle: "none",
  },
  // Estilos para el perfil
  profileContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  profileText: {
    fontSize: 18,
    color: colors.primary,
  },
  profileLink: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  // Estilos cuando el usuario no está logueado
  greetingContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  greetingText: {
    fontSize: 18,
    color: colors.primary,
  },
  loginLink: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});