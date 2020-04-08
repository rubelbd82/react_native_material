import { StyleSheet } from 'react-native';
import {Colors} from "../common/colors";

export const globalStyles = StyleSheet.create({
    // Header
    parentHeaderStyle: {
        backgroundColor: Colors.primary,
        height: 60,
    },
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenBackgroundImage: {
        flex: 1,
        padding: 20
    },
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: Colors.white
    },

    //Text sizes
    headerText: {
        fontWeight: 'normal',
        fontSize: 20,
        color: Colors.white,
        letterSpacing: 1,
        marginLeft: 30,
    },
    smallText: {
        fontWeight: 'normal',
        fontSize: 12,
    },
    drawerIcon: {
        position: 'absolute',
        left: 16,
        color: Colors.white
    },

    // Header ends
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    list: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        backgroundColor: 'pink',
        fontSize: 14,
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 15,
        marginVertical: 10,
    },

    buttonContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: Colors.secondary,
    },

    buttonText: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    headLine: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 5,
        marginBottom: 0,
        marginTop: 0,
        paddingTop: 0,
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary
    },

    twoColContainer: {flexDirection: 'row', margin: 5, padding: 5},

    /* shapes */

    divider: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
