import { Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

export default function ExampleScreen() {
    const [offerData, setOfferData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { ofertaid } = useLocalSearchParams();

    useEffect(() => {
        console.log("==================================================");
        console.log("ofertaid:", ofertaid);
    }, [ofertaid]);

    useEffect(() => {
        if (ofertaid) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/ofertas/${ofertaid}`);
                    const data = await response.json();
                    console.log("Fetched data:", data);
                    setOfferData(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [ofertaid]);

    // Log offerData when it updates
    useEffect(() => {
        console.log("Updated offerData:", offerData);
    }, [offerData]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!offerData) {
        return (
            <View>
                <Text>No data available for this offer</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Offer Title: {offerData.titulo}</Text>
            <Text>Description: {offerData.notas}</Text>
        </View>
    );
}
