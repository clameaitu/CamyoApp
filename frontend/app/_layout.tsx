import { Stack, useSegments } from "expo-router";
import { Platform } from "react-native";
import { useEffect } from "react";
import CamyoWebNavBar from "./_components/CamyoNavBar";
import BottomBar from "./_components/BottomBar";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  const segments = useSegments();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  useEffect(() => {
    if (Platform.OS === "web") {
      const pageTitles: Record<string, string> = {
        index: "Inicio",
        login: "Iniciar Sesión",
        registro: "Registro",
        miperfil: "Mi Perfil Camionero",
        miperfilempresa: "Mi Perfil Empresa",
        "oferta/crear": "Publicar Nueva Oferta",
        "oferta/[ofertaId]": "Detalles de la Oferta",
      };

      const currentSegment = segments.join("/");
      document.title = pageTitles[currentSegment] || "Camyo";
    }
  }, [segments]);

  return (
    <AuthProvider>
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
          <Stack.Screen name="oferta/[ofertaId]" />

          <Stack.Screen name="ejemplo"/>
          <Stack.Screen name="oferta/[ofertaid]" />
        </Stack>
        {isMobile && <BottomBar />}
      </>
    </AuthProvider>
  );
}