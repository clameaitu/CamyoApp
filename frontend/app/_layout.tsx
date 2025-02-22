import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="/" options={{ headerTitle: "HomeScreen" }} />
      <Stack.Screen name="/ExampleScreen" options={{ headerTitle: "About" }} />
    </Stack>
  );
}
