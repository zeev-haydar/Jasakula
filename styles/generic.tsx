import { StyleSheet } from "react-native"

const GenericStyles = StyleSheet.create({
    buttonContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center', // Center the icon horizontally
        padding: 4,
        marginRight: 8,


    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',

    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#71bfd1'
    },
    normalText: {
        fontFamily: 'DM-Sans',
        fontSize: 10,
    },
    activeColor: {
        color: '#71bfd1',
    },
    inactiveColor: {
        color: '#CCC',
    },
    heading1Text: {
        fontSize: 25,
        fontFamily: 'DMSans_700Bold',
    },
    mainFont: {
        fontFamily: 'DMSans_400Regular',
    },
    mainFontBold: {
        fontFamily: 'DMSans_700Bold'
    },
    boxButtonBlue: {
        backgroundColor: '#71bfd1',
        elevation: 2,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    boxButtonOrange: {
        backgroundColor: '#FF8A00',
        elevation: 2,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    boxButtonGreen: {
        backgroundColor: '#10AB71',
        elevation: 2,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    boxButtonRed: {
        backgroundColor: '#FF6347',
        elevation: 2,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
})

export {GenericStyles}