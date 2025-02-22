import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../assets/styles/colors";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/ExampleScreen")}
      >
        <Text style={styles.buttonText}>Go to About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray, // Gris Claro
  },
  text: {
    fontSize: 20,
    color: colors.secondary, // Azul Oscuro
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary, // Naranja
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white, // Blanco
    fontSize: 16,
  },
});