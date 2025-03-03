import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CurrentCompanyOffers() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const allOffers = [
    { id: 1, titulo: "Oferta 1", direccion: "Calle Picaflor 5, Madrid, España.", servicio: "SEUR", fecha: "13/2/2025", puntuacion: "4.7/5 (150 comentarios)", ubicacion: "Madrid" },
    { id: 2, titulo: "Oferta 2", direccion: "Calle Picaflor 5, Madrid, España.", servicio: "US", fecha: "13/2/2025", puntuacion: "1/5 (150 comentarios)", ubicacion: "Madrid" },
    { id: 3, titulo: "Oferta 3", direccion: "Calle Reina Mercedes,123, Sevilla", servicio: "SEUR", fecha: "13/2/2025", puntuacion: "4.7/5 (150 comentarios)", ubicacion: "Sevilla" },
    { id: 4, titulo: "Oferta 4", direccion: "Calle Picaflor 5, Madrid, España.", servicio: "SEUR", fecha: "13/2/2025", puntuacion: "4.7/5 (150 comentarios)", ubicacion: "Madrid" },
    { id: 5, titulo: "Oferta 5", direccion: "Calle Reina Mercedes,123, Sevilla", servicio: "US", fecha: "13/2/2025", puntuacion: "1/5 (150 comentarios)", ubicacion: "Sevilla" },
  ];

  // Filtrar las ofertas basándonos en la ubicación y el servicio seleccionados
  const filteredOffers = allOffers.filter((oferta) => {
    return (
      (!selectedLocation || oferta.ubicacion === selectedLocation) &&
      (!selectedService || oferta.servicio === selectedService)
    );
  });

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const clearFilters = () => {
    setSelectedLocation(null);
    setSelectedService(null);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ofertas Empresas Publicadas</Text>
        <TouchableOpacity>
          <FontAwesome name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Filtrar:</Text>

        {/* Filtro por ubicación */}
        <TouchableOpacity 
          style={[styles.filterButton, selectedLocation && styles.filterButtonActive]} 
          onPress={() => setSelectedLocation(selectedLocation === "Madrid" ? null : "Madrid")}
        >
          <FontAwesome name="map-marker" size={16} color="black" />
          <Text style={styles.filterText}> Madrid</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterButton, selectedLocation && styles.filterButtonActive]} 
          onPress={() => setSelectedLocation(selectedLocation === "Sevilla" ? null : "Sevilla")}
        >
          <FontAwesome name="map-marker" size={16} color="black" />
          <Text style={styles.filterText}> Sevilla</Text>
        </TouchableOpacity>

        {/* Filtro por tipo de servicio */}
        <TouchableOpacity 
          style={[styles.filterButton, selectedService && styles.filterButtonActive]} 
          onPress={() => setSelectedService(selectedService === "SEUR" ? null : "SEUR")}
        >
          <FontAwesome name="truck" size={16} color="black" />
          <Text style={styles.filterText}> SEUR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterButton, selectedService && styles.filterButtonActive]} 
          onPress={() => setSelectedService(selectedService === "US" ? null : "US")}
        >
          <FontAwesome name="truck" size={16} color="black" />
          <Text style={styles.filterText}> US</Text>
        </TouchableOpacity>

        {/* Botón para limpiar filtros */}
        <TouchableOpacity onPress={clearFilters}>
          <Text style={styles.clearFilters}>Limpiar filtros</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsText}>Mostrando {filteredOffers.length} resultados</Text>

      {/* Lista de ofertas filtradas */}
      <ScrollView style={styles.scrollContainer}>
        {filteredOffers.map((oferta, index) => (
          <View key={oferta.id} style={styles.offerCard}>
            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.offerHeader}>
              <Text style={styles.offerTitle}>{oferta.titulo}</Text>
              <FontAwesome name={expandedIndex === index ? "chevron-up" : "chevron-down"} size={16} color="black" />
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.offerDetails}>
                <Text style={styles.offerText}><Text style={styles.bold}>Dirección:</Text> {oferta.direccion}</Text>
                <Text style={styles.offerText}><Text style={styles.bold}>Servicios:</Text> {oferta.servicio}</Text>
                <Text style={styles.offerText}><Text style={styles.bold}>Fecha:</Text> {oferta.fecha}</Text>
                <Text style={styles.offerText}><Text style={styles.bold}>Puntuación:</Text> {oferta.puntuacion}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0C4A6E", padding: 15 },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  filtersContainer: { flexDirection: "row", alignItems: "center", padding: 10, flexWrap: "wrap" },
  filterTitle: { fontWeight: "bold", marginRight: 5 },
  filterButton: { flexDirection: "row", alignItems: "center", padding: 5, borderWidth: 1, borderColor: "gray", borderRadius: 5, marginHorizontal: 5 },
  filterButtonActive: { backgroundColor: "#cce5ff", borderColor: "#007bff" },
  filterText: { fontSize: 14, marginLeft: 5 },
  clearFilters: { color: "#0C4A6E", marginLeft: 10, textDecorationLine: "underline" },
  resultsText: { padding: 10, fontSize: 14, color: "gray" },
  scrollContainer: { paddingHorizontal: 10 },
  offerCard: { backgroundColor: "white", borderRadius: 10, borderWidth: 2, borderColor: "red", padding: 10, marginBottom: 10 },
  offerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  offerTitle: { fontSize: 16, fontWeight: "bold" },
  offerDetails: { marginTop: 5 },
  offerText: { fontSize: 14, color: "black" },
  bold: { fontWeight: "bold" },
});
