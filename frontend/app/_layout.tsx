import { Stack, useSegments, useNavigation } from "expo-router";
import { Platform } from "react-native";
import { useEffect } from "react";
import CamyoWebNavBar from "./_components/CamyoNavBar";
import BottomBar from "./_components/BottomBar";

export default function RootLayout() {
  const segments = useSegments();
  const navigation = useNavigation();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      index: "Inicio",
      login: "Iniciar Sesión",
      registro: "Registro",
      miperfil: "Mi Perfil Camionero",
      miperfilempresa: "Mi Perfil Empresa",
      "oferta/crear": "Publicar Nueva Oferta",
    };

  const currentSegment = segments.join("/");
    document.title = pageTitles[currentSegment] || "Camyo";
  }, [segments]);

  return (
    <>
      {!isMobile && <CamyoWebNavBar />}
      {/*name es el nombre que se usa para navegar y hacer router.push(name)*/}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="login"/>
        <Stack.Screen name="registro"/>
        <Stack.Screen name="miperfil"/>
        <Stack.Screen name="miperfilempresa"/>
        <Stack.Screen name="oferta/crear"/>
      </Stack>
      {isMobile && <BottomBar />}
    </>

  );
}