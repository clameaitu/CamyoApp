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
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // Align items to the start
        marginBottom: 20,
        marginLeft: '12.5%', // Adjusted to start at about 75% width of the screen
        position: 'relative', // Changed to relative
        top: 100, // Adjusted to place the profile picture above the banner
    },
    desktopProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        alignSelf: 'flex-start', // Align the container to the start
        marginBottom: 20,
        marginLeft: '12.5%', // Adjusted to start at about 75% width of the screen
        position: 'relative', // Changed to relative
        top: 100, // Adjusted to place the profile picture above the banner
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        position: 'relative',
        left: 20, // Position the avatar to the left side
        top: -60, // Adjusted to place half of the avatar above the banner
    },
    desktopAvatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
        position: 'fixed',
        left: 420, // Position the avatar to the left side
        top: 100, // Adjusted to place half of the avatar above the banner
    },
    profileDetailsContainer: {
        marginLeft: 20, // Added margin to separate details from avatar
        marginTop: 60, // Adjusted margin to align with the bottom half of the avatar
        
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    desktopName: {
        fontSize: 32,
        fontWeight: 'bold',
        position: 'fixed',
        left: 700, // Position the avatar to the left side
        top: 210, // Adjusted to place half of the avatar above the banner
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
        marginTop: 10, // Added margin to separate details from name
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
        fontSize: 15,
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
        right: 0,
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
        left: 0,
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
        left: 0,
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
        left:'200%',
        top:'-10%',
        width: '40%',
    },
    editProfileButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bannerContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
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
    infoText: {
        fontSize: 15,
        color: 'gray',
    },
    desktopInfoText: {
        fontSize: 15,
        color: 'gray',
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
        alignItems: 'left',
        position: 'fixed',
        top: 150,
        left: 330,
        width: '100%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align items to the start
        position: 'fixed',
        left: 700, // Position the avatar to the left side
        top: 260, // Adjusted to place half of the avatar above the banner
    },
    detailsColumn: {
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'left', // Align items to the start
        alignItems: 'left', // Align items to the start

    },
    infoText: {
        fontSize: 15,
        color: 'gray',
        marginRight: 30, // Added margin to separate the detail lines
    },
    linkText: {
        fontSize: 15,
        color: colors.primary,
        textDecorationLine: 'underline',
        marginBottom: 15,
  
        textAlign: 'left', // Align text to the left
        width: '100%', // Ensure text takes full width
    },
});

export default styles;