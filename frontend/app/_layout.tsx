import { Stack } from "expo-router";
import { Platform } from "react-native";
import CamyoWebNavBar from "./_components/CamyoNavBar";
import BottomBar from "./_components/BottomBar";

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
        <Stack.Screen name="/CurrentCompanyOffers" options={{ headerShown: false, title: "Ofertas Empresa Actuales" }} />
      </Stack>
      {isMobile && <BottomBar />}
    </>

  );
}