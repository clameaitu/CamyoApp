import { Stack } from "expo-router";
import { Platform } from "react-native";
import CamyoWebNavBar from "./components/CamyoNabBar";
import BottomBar from "./components/BottomBar";

export default function RootLayout() {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <Stack>
      <Stack.Screen name="/" options={{ headerTitle: "HomeScreen" }} />
      <Stack.Screen name="/ExampleScreen" options={{ headerTitle: "About" }} />
      <Stack.Screen name="/CompanyDetails" options={{ headerTitle: "CompanyDetails" }} />
      <Stack.Screen name="/CompanyProfile" options={{ headerTitle: "CompanyProfile" }} />
      <Stack.Screen name="/UserProfileScreen" options={{ headerShown: false }} />

    </Stack>
  );
}