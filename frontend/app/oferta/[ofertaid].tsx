import { Text, View, ActivityIndicator, StyleSheet, FlexAlignType, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

export default function OfertaDetalleScreen() {
    const [offerData, setOfferData] = useState<any>(null);
    const [empresaData, setEmpresaData] = useState<any>(null);
    const [usuarioEmpresaData, setUsuarioEmpresaData] = useState<any>(null);
    const [offerTrabajoData, setOfferTrabajoData] = useState<any>(null);
    const [offerCargaData, setOfferCargaData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { ofertaid } = useLocalSearchParams();

    useEffect(() => {
        if (ofertaid) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/ofertas/${ofertaid}`);
                    const data = await response.json();
                    setOfferData(data);

                    console.log(data);
                    
                    
                    const trabajoResponse = await fetch(`http://localhost:8080/api/ofertas/${ofertaid}/trabajo`);
                    const trabajoText = await trabajoResponse.text();
                    const trabajoData = trabajoText ? JSON.parse(trabajoText) : null;
                    setOfferTrabajoData(trabajoData);

                    console.log(trabajoData);

                    const cargaResponse = await fetch(`http://localhost:8080/api/ofertas/${ofertaid}/carga`);
                    const cargaText = await cargaResponse.text();
                    const cargaData = cargaText ? JSON.parse(cargaText) : null;
                    setOfferCargaData(cargaData);

                    console.log(cargaData);
                    
                    const empresaResponse = await fetch(`http://localhost:8080/empresas/1`); //http://localhost:8080/empresas/${data.empresaId}
                    const empresaData = await empresaResponse.json();
                    setEmpresaData(empresaData);
                    console.log(empresaData);

                    const usuarioEmpresaResponse = await fetch(`http://localhost:8080/usuarios/1`); //http://localhost:8080/usuarios/${empresaData.usuarioId}
                    const usuarioEmpresaData = await usuarioEmpresaResponse.json();
                    setUsuarioEmpresaData(usuarioEmpresaData);
                    console.log(usuarioEmpresaData);
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
                                {empresaData.web && (
                                    <Text style={styles.empresa}>{empresaData.web.toUpperCase()}</Text>
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
                                {empresaData.web && (
                                    <Text style={styles.empresa}>{empresaData.web.toUpperCase()}</Text>
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