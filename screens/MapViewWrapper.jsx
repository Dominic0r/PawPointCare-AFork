import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// We export a dummy Marker and provider so the Web doesn't error out
export const Marker = () => null;
export const PROVIDER_GOOGLE = 'google';

const MapViewWrapper = ({ style, children }) => {
    return (
        <View style={[style, styles.webPlaceholder]}>
        <Text style={styles.text}>Map View is not supported on Web</Text>
        <Text style={styles.subtext}>Please use a mobile device to see the interactive map.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    webPlaceholder: {
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: '#5ECDC5',
        borderRadius: 10,
    },
    text: {
        color: '#1F395F',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtext: {
        color: '#8a8787',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default MapViewWrapper;
