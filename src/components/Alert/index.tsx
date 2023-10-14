import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
interface AlertProps {
    children: ReactNode;
}

function Alert({children}: AlertProps) {
    return (
        <View style={styles.alert}>
            <Text>{children}</Text>
        </View>
    );
}

export default Alert;

const styles = StyleSheet.create({
    alert: {
        backgroundColor: "#FFF",
        color: "#000",
        marginTop: 50,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    }
})