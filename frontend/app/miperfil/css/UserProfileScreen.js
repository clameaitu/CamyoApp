import { StyleSheet } from 'react-native';
import colors from '@/assets/styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    desktopContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 40,
        maxWidth: 1200,
        margin: 60,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    desktopProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    desktopAvatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginRight: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    desktopName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    desktopInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    infoButton: {
        backgroundColor: colors.primary,
        borderRadius: 50, // Rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    desktopInfoButton: {
        backgroundColor: colors.primary,
        borderRadius: 50, // Rounded corners
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal: 15,
    },
    infoButton2: {
        backgroundColor: colors.secondary,
        borderRadius: 50, // Rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    desktopInfoButton2: {
        backgroundColor: colors.secondary,
        borderRadius: 50, // Rounded corners
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal: 15,
    },
    infoText: {
        fontSize: 16,
        color: 'white',
    },
    desktopInfoText: {
        fontSize: 18,
        color: 'white',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    desktopPhoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    phoneIcon: {
        fontSize: 35,
        color: colors.primary,
        marginRight: 10,
    },
    desktopPhoneIcon: {
        fontSize: 35,
        color: colors.primary,
        marginRight: 15,
    },
    phoneText: {
        fontSize: 25,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    desktopPhoneText: {
        fontSize: 25,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    detailsContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    desktopDetailsContainer: {
        width: '80%',
        padding: 30,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
    },
    detailsText: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 10,
    },
    desktopDetailsText: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 15,
    },

    offerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    offerTitle: { fontSize: 16, fontWeight: "bold" },
    offerText: { fontSize: 14, color: "black" },
    bold: { fontWeight: "bold" },
    offerDetails: { marginTop: 5 },
    offerCard: { 
        width: '80%',
        backgroundColor: "white", 
        borderRadius: 10, 
        borderWidth: 2, 
        borderColor: "red", 
        padding: 10, 
        marginBottom: 10
    },

});

export default styles;