import * as ImagePicker from 'expo-image-picker';

// Función para seleccionar la imagen y devolverla en base64
export const pickImageAsync = async (): Promise<string | null> => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,  // Obtener imagen en base64
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Devuelve la imagen en base64
      return result.assets[0].base64;
    } else {
      // Si el usuario cancela, retorna null
      return null;
    }
  } catch (error) {
    console.error("Error picking image: ", error);
    return null; // Retorna null en caso de error
  }
};

