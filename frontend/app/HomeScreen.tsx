import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Platform, Image, Animated, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import colors from "frontend/assets/styles/colors";
import React, { useEffect, useState, useRef } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
const ProyectoLogo = require('frontend/assets/images/camyo.png');
import BottomBar from 'frontend/app/components/BottomBar.jsx';
import CamyoWebNavBar from "./components/CamyoNabBar";

export default function HomeScreen() {
  const router = useRouter();

  return (
<>
        {Platform.OS === 'web' ? (
         <CamyoWebNavBar/>
        ) : (
          <View>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            <View style={styles.searchView}>
              <Ionicons name="menu" size={30} color="black" style={styles.menuIcon} />
              <View style={styles.barraSuperior}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar Ofertas"
                  placeholderTextColor={colors.secondary}
                />
                <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
              </View>
              <BottomBar/>
            </View>
          </View>
        )}
     
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  logo: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  
  searchIcon:{
    color:colors.primary,
    marginRight:10
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "5%",
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  barraSuperior: {
    flexDirection: "row",
    alignItems: "center",
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
});
