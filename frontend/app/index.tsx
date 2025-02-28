import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
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

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={colors.primary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color={colors.primary} />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications" size={24} color={colors.primary} />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/user/UserProfileScreen")}
        >
          <Ionicons name="person" size={24} color={colors.primary} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white, // Blanco
    borderTopWidth: 1,
    borderTopColor: colors.lightGray, // Gris Claro
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: colors.primary, // Naranja
  },
});