import { Stack, useSegments, useRouter, usePathname } from "expo-router";
import { Platform } from "react-native";
import { useState, useEffect } from 'react';
import CamyoWebNavBar from "./_components/CamyoNavBar";
import BottomBar from "./_components/BottomBar";
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";


export default function RootLayout() {
  const segments = useSegments();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth(); // Obtén la función isAuthenticated del contexto
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

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
      const authenticated = await isAuthenticated(); // Verifica si el usuario está autenticado
      const inAuthGroup = ["miperfilempresa", "miperfilcamionero", "oferta/crear"].includes(segments[0]);
      console.log(authenticated)

      if (!authenticated && inAuthGroup) {
        // Si el usuario no está autenticado pero intenta acceder a una ruta protegida
        router.push('/');
      } else if (authenticated && user) {
        // Redirigir según el rol del usuario
        switch (user.rol) { // Cambia user.role a user.rol según tu estructura de datos
          case 'EMPRESA':
            if (!["miperfilempresa", "oferta/crear", "empresas"].includes(segments[0])) {
              router.push('/');
            }
            break;
          case 'CAMIONERO':
            if (!["miperfilcamionero", "oferta/[ofertaId]"].includes(segments[0])) {
              router.push('/');
            }
            break;
          case 'ADMIN':
            if (!["workinprogress"].includes(segments[0])) {
              router.push('/');
            }
            break;
          default:
            router.push('/'); // Rol desconocido o no asignado
            break;
        }
      }
      setIsLoading(false); // Finaliza la carga
    };

    checkAuthAndRedirect();
  }, [user, segments, isAuthenticated]);

  if (isLoading) {
    return null; // O un componente de carga mientras se verifica la autenticación
  }

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}