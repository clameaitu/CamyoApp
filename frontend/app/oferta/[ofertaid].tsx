import { Text, View, ActivityIndicator, StyleSheet, FlexAlignType, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

export default function ExampleScreen() {
    const [offerData, setOfferData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { ofertaid } = useLocalSearchParams();

    useEffect(() => {
        if (ofertaid) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/ofertas/${ofertaid}`);
                    const data = await response.json();
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

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!offerData) {
        return (
            <View style={styles.container}>
                <Text>No data available for this offer</Text>
            </View>
        );
    }

    const renderOfferCard = () => {
        return (
            <View style={styles.card}>
                {offerData.tipo === 'type1' ? (
                    <>
                        <View style={styles.header}>
                            <Image
                                source={require('frontend/assets/images/no-company-logo.png')} // Replace with your logo path
                                style={styles.logo}
                            />
                            <View style={styles.headerText}>
                                <Text style={styles.title}>{offerData.titulo}</Text>
                                {offerData.empresa && (
                                    <Text style={styles.empresa}>{offerData.empresa.toUpperCase()}</Text>
                                )}
                            </View>
                        </View>
                        <Text style={styles.description}>{offerData.notas}</Text>
                    </>
                ) : (
                    <>
                        <View style={styles.header}>
                            <Image
                                source={require('frontend/assets/images/no-company-logo.png')} // Replace with your logo path
                                style={styles.logo}
                            />
                            <View style={styles.headerText}>
                                <Text style={styles.title}>{offerData.titulo}</Text>
                                {offerData.empresa && (
                                    <Text style={styles.empresa}>{offerData.empresa.toUpperCase()}</Text>
                                )}
                            </View>
                        </View>
                        <Text style={styles.description}>{offerData.notas}</Text>
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderOfferCard()}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e8e6',
        paddingVertical: 20, // Space at the top and bottom
    },
    card: {
        width: '70%',
        marginHorizontal: '15%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    empresa: {
        fontSize: 16,
        color: '#0b4f6c',
        fontWeight: 'bold',
        marginTop: 5,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});