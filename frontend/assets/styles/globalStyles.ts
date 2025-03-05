import { StyleSheet } from "react-native";
import colors from "./colors";
import typography from "./typography";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    color: colors.secondary,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 14, // Aumentar un poco el padding vertical
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center", // Centra el contenido
    marginHorizontal: 5,
    flexDirection: "row", // Asegura que el texto y el icono estén en línea
    width: "48%", // Ocupar casi la mitad del ancho del contenedor
  },
  
  selectedUserType: {
    backgroundColor: colors.primary,
  },
  unselectedUserType: {
    backgroundColor: colors.mediumGray,
  },
  userTypeText: {
    color: colors.white,
    fontWeight: "bold",
  },
  formContainer: {
    width: "80%",  // Ajusta según el tamaño deseado
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.white, // Opcional: para que resalte sobre el fondo
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000", // Opcional: un poco de sombra para resaltar el contenedor
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
    marginVertical: 20,
  },
  formContainerHalf: {
    width: "90%",  // Mayor ancho en móviles
    maxWidth: 500, // Limita el ancho en pantallas más grandes
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 20,
  },
  
});

export default globalStyles;
