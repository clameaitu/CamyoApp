import { Stack } from "expo-router";
import { Platform } from "react-native";
import CamyoWebNavBar from "./components/CamyoNabBar";
import BottomBar from "./components/BottomBar";

export default function RootLayout() {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <>
      {!isMobile && <CamyoWebNavBar />}
      {/*name es el nombre que se usa para navegar y hacer router.push(name)*/}
      {/*es el título de la pestaña en el navegador y se ve en la UI, tiene que ser bonito*/}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Inicio" }} />
        <Stack.Screen name="/user/MiPerfil" options={{ headerShown: false, title: "Mi Perfil" }} />
        <Stack.Screen name="/CompanyProfile" options={{ headerShown: false, title: "Mi Perfil" }} />
        <Stack.Screen name="/CompanyDetails" options={{ headerShown: false, title: "Detalle de empresa" }} />
      </Stack>
      {isMobile && <BottomBar />}
    </>

  );
}