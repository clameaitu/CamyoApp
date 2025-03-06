import { StyleSheet } from 'react-native';
import colors from '@/assets/styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 100,
        paddingLeft: 10,
    },
    header: {
        backgroundColor: "#0C4A6E",
        padding: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    settingsButton: {
        position: "absolute",
        right: 50,
    },
    content: {
        padding: 15,
    },
    profileContainer: {
        flexDirection: 'row', // Changed to row to place name next to avatar
        alignItems: 'flex-start', // Align items to the start
        justifyContent: 'center', // Center elements horizontally
        marginBottom: 20,
    },
    desktopProfileContainer: {
        flexDirection: 'row', // Changed to row to place name next to avatar
        alignItems: 'center', // Center items horizontally
        width: '45%', // Adjust width as needed
        alignSelf: 'center', // Center the container horizontally
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        position: 'relative',
        left: -35,
        bottom: -20
    },
    desktopAvatar: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginBottom: 10,
        // Removed left positioning
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: -20, // Added margin to separate name from avatar
        marginTop: 60,
    },
    desktopName: {
        fontSize: 32,
        fontWeight: 'bold',
        marginLeft: 20, // Added margin to separate name from avatar
        marginTop: 60, // Adjusted margin to place name a little below the avatar
        marginBottom: 10, // Added margin to separate name from info
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    desktopInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align items to the start
        marginTop: 10,
    },
    infoButton: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    desktopInfoButton: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 15,
    },
    infoButton2: {
        backgroundColor: colors.secondary,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    desktopInfoButton2: {
        backgroundColor: colors.secondary,
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal: 15,
    },
    infoText: {
        fontSize: 15,
        color: 'white',
    },
    desktopInfoText: {
        fontSize: 15,
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
    detailsOuterContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center', // Center items horizontally
        width: '90%', // Adjust width as needed
    },
    desktopDetailsContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center', // Center items horizontally
        width: '45%', // Adjust width as needed
        alignSelf: 'center', // Center the container horizontally
    },
    detailsText: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
        textAlign: 'left', // Align text to the left
        width: '100%', // Ensure text takes full width
    },
    mobileDetailsText: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
        textAlign: 'left', // Align text to the left
        width: '100%', // Ensure text takes full width
    },
    desktopDetailsText: {
        fontSize: 20,
        color: 'black',
        marginBottom: 15,
        marginLeft: '5%',
        textAlign: 'left', // Align text to the left
        width: '100%', // Ensure text takes full width
    },
    boldText: {
        fontWeight: 'bold',
    },
    detailItem: {
        marginBottom: 10,
        flexDirection: 'row', // Align icon and text in a row
        width: '100%', // Ensure detail items take full width
    },
    reviewsContainer: {
        marginTop: 10, // Reduced margin to reduce separation
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Centered elements horizontally
    },
    desktopReviewsContainer: {
        marginTop: 10, // Reduced margin to reduce separation
        marginLeft: '22%', // Added margin to separate reviews from details
        flexDirection: 'row',

    },
    reviewCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        marginRight: 10, // Add margin to separate the cards
        borderLeftWidth: 4,
        borderLeftColor: colors.primary, // Use the same color as the "experiencia" button
        width: 150, // Set a fixed width for the review cards
    },
    desktopReviewCard: {
        width: 200, // Set a larger width for the review cards on desktop
    },
    reviewerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 10,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    reviewText: {
        fontSize: 14,
        color: 'gray',
    },
    icon: {
        fontSize: 20,
        color: colors.secondary,
        marginRight: 10,
        marginLeft: 10,
        position: 'relative',
        top: -2,
        left: -4,
        width: 30,
        textAlign: 'center',
        verticalAlign: 'bottom',
    },
    envelopeIcon: {
        fontSize: 20,
        color: colors.secondary,
        marginRight: 10,
        marginLeft: 10,
        position: 'relative',
        top: -2,
        left: -9.5,
        width: 30,
        textAlign: 'center',
        verticalAlign: 'bottom',
    },
    truckIcon: {
        fontSize: 20,
        color: colors.secondary,
        marginRight: 10,
        marginLeft: 10,
        position: 'relative',
        top: -2,
        left: -5,
        width: 30,
        textAlign: 'center',
        verticalAlign: 'bottom',
    },

    editProfileButtonContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width:'100%',

    },
    editProfileButton: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        left:'30%',
    },
    desktopEditProfileButton: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        left:'125%',
        top:'-10%',
        width: '40%',
    },
    editProfileButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;