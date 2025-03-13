import { Stack, useSegments, useRouter, usePathname } from "expo-router";
import { Platform } from "react-native";
import { useState, useEffect } from 'react';
import CamyoWebNavBar from "./_components/CamyoNavBar";
import BottomBar from "./_components/BottomBar";
import { useAuth } from "../contexts/AuthContext"; // Importa useAuth
import withAuthProvider from './withAuthProvider'; // Importa el HOC

function RootLayout() {
  const segments = useSegments();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const router = useRouter();
  const pathname = usePathname();
  const { user, userToken } = useAuth(); // Usa useAuth
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === "web") {
      const pageTitles: Record<string, string> = {
        index: "Inicio",
        login: "Iniciar Sesión",
        registro: "Registro",
        miperfil: "Mi Perfil",
        miperfilempresa: "Mi Perfil Empresa",
        miperfilcamionero: "Mi Perfil Camionero",
        "oferta/crear": "Publicar Nueva Oferta",
        empresas: "Lista de Empresas",
        "oferta/[ofertaId]": "Detalles de la Oferta",
        "miperfilcamionero/editar": "Editar Perfil Camionero",
        "miperfilempresa/editar": "Editar Perfil Empresa",
        "oferta/editar/[ofertaId]": "Editar Oferta",
        workinprogress: "Trabajo en Progreso",
      };

      const currentSegment = segments.join("/");
      document.title = pageTitles[currentSegment] || "Camyo";
    }
  }, [segments]);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const authenticated = !!userToken;
      const inAuthGroup = ["miperfilempresa", "miperfilcamionero", "oferta/crear", "workinprogress","miperfilempresa/editar","oferta/editar/[ofertaId]","miperfilcamionero/editar"].includes(segments[0]);

      if (inAuthGroup) {
      if (authenticated && user) {
        switch (user.rol) {
          case 'EMPRESA':
            if (!["miperfilempresa", "oferta/crear","miperfilempresa/editar","oferta/editar/[ofertaId]","oferta/[ofertaId]"].includes(segments[0])) {
              if (pathname !== '/') {
                router.push('/');
              }
            }
            break;
          case 'CAMIONERO':
            if (!["miperfilcamionero", "miperfilcamionero/editar"].includes(segments[0])) {
              if (pathname !== '/') {
                router.push('/');
              }
            }
            break;
          case 'ADMIN':
            if (!["workinprogress"].includes(segments[0])) {
              if (pathname !== '/') {
                router.push('/');
              }
            }
            break;
          default:
            break;
        }
      }
    }
      setIsLoading(false);
    };

    checkAuthAndRedirect();
  }, [user, segments, userToken, pathname]);

  if (isLoading) {
    return null; // O un componente de carga
  }

  return (
    <>
      {!isMobile && <CamyoWebNavBar />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
        <Stack.Screen name="miperfil" />
        <Stack.Screen name="miperfilcamionero" />
        <Stack.Screen name="miperfilempresa" />
        <Stack.Screen name="miperfilcamionero/editar" />
        <Stack.Screen name="miperfilempresa/editar" />
        <Stack.Screen name="empresas" />
        <Stack.Screen name="oferta/crear" />
        <Stack.Screen name="oferta/editar/[ofertaId]" />
        <Stack.Screen name="oferta/[ofertaId]" />
        <Stack.Screen name="workinprogress" />
      </Stack>
      {isMobile && <BottomBar />}
    </>
  );
}

// Envuelve RootLayout con withAuthProvider antes de exportarlo
export default withAuthProvider(RootLayout);