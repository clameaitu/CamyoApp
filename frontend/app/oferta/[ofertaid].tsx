import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import colors from "frontend/assets/styles/colors";

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
                {offerTrabajoData == null ? (
                    <>
                        <View style={styles.header}>
                            <Image
                                source={require('frontend/assets/images/no-company-logo.png')} // Replace with your logo path
                                style={styles.logo}
                            />
                            <View style={styles.headerText}>
                                <Text style={styles.title}>{offerData.titulo}</Text>
                                {usuarioEmpresaData.web && (
                                    <Text style={styles.empresa}>{usuarioEmpresaData.nombre.toUpperCase()}</Text>
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
                                {usuarioEmpresaData.nombre && (
                                    <Text style={styles.empresa}>
                                    {usuarioEmpresaData.nombre.toUpperCase()} |
                                    <MaterialIcons name="location-on" size={18} color="#0b4f6c" />
                                    <Text style={styles.empresa}> {usuarioEmpresaData.localizacion}</Text>
                                </Text>
                                )}
                            </View>
                        </View>
                        

                        <TouchableOpacity style={styles.solicitarButton}>
                            <Text style={styles.solicitarButtonText}>Solicita Oferta</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />

                        <Text style={styles.subTitulo}>
                            Detalles de la Oferta
                        </Text>

                        <View style={styles.detailRow}>
                            <MaterialIcons name="attach-money" size={20} color="#0b4f6c" />
                            <Text style={styles.detalles}>
                                <Text style={styles.detallesLabel}>Salario:</Text> {offerData.sueldo}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <FontAwesome5 name="briefcase" size={18} color="#0b4f6c" />
                            <Text style={styles.detalles}>
                                <Text style={styles.detallesLabel}>Experiencia Mínima:</Text> {offerData.experiencia}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Entypo name="clock" size={20} color="#0b4f6c" />
                            <Text style={styles.detalles}>
                                <Text style={styles.detallesLabel}>Jornada:</Text> Completa {/* {offerData.jornada} */}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <FontAwesome5 name="id-card" size={18} color="#0b4f6c" />
                            <Text style={styles.detalles}>
                                <Text style={styles.detallesLabel}>Licencia Requerida:</Text> C+E {/* {offerData.licencia} */}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <MaterialIcons name="event" size={20} color="#0b4f6c" />
                            <Text style={styles.detalles}>
                                <Text style={styles.detallesLabel}>Fecha Incorporación:</Text> {offerTrabajoData.fechaIncorporacion}
                            </Text>
                        </View>
                        <View style={styles.separator} />

                        <Text style={styles.subTitulo}>Descripción Completa</Text>

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
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e8e6',
        paddingVertical: 20,
        paddingTop: 90,
    },
    card: {
        width: '60%',
        marginHorizontal: '15%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
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
        fontSize: 34,
        fontWeight: 'bold',
    },
    empresa: {
        fontSize: 20,
        color: '#0b4f6c',
        marginTop: 0,
    },
    solicitarButton: {
        width: '40%', 
        paddingVertical: 10, 
        borderRadius: 20, 
        alignSelf: 'center', 
        backgroundColor: colors.primary, 
        marginVertical: 15,
    },
    solicitarButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        opacity: 0.6, 
        marginVertical: 12,
        width: '100%',  
        alignSelf: 'center',
    },
    
    subTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0b4f6c',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: '0%', 
    },
    
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginLeft: '2%', 
    },
    
    detalles: {
        fontSize: 16,
        marginLeft: 8, 
        color: '#333',
    },
    
    detallesLabel: {
        fontWeight: 'bold',
    },
    
    
    description: {
        fontSize: 16,
        marginTop: 5,
        marginRight: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});