import { Stack } from "expo-router";
import { Platform } from "react-native";
import CamyoWebNavBar from "./components/CamyoNabBar";
import BottomBar from "./components/BottomBar";

export default function RootLayout() {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <>
      {!isMobile && <CamyoWebNavBar />}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="ExampleScreen" options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" options={{ headerShown: false }} />
        <Stack.Screen name="CreateOffer" options={{ headerShown: false }} />
      </Stack>
      {isMobile && <BottomBar />}
    </>

  );
}