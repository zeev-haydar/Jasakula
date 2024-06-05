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
    backgroundVector: {
        zIndex: -1,
        position: 'absolute',
        flex: 1,
        justifyContent: 'flex-start',
        left: 0,
        top: 0,
        // // maxHeight: 200,
        // height: 250,
        width: '100%',
        aspectRatio: 1
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',

    },
    containerBlue: {
        flex: 1,
        width: '100%',
        backgroundColor: '#71bfd1',
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#71bfd1'
    },
    normalText: {
        fontFamily: 'DMSans_400Regular',
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
    },
    boldFont: {
        fontFamily: 'DMSans_700Bold'
    },
    containerChild: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        width: '100%',
    },
    containerChildNoBG: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 16,
        elevation: 2,
        textAlignVertical: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
})

export { GenericStyles }