import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface AlertProps {
    children: ReactNode;
}

function Alert({children}: AlertProps) {
    return (
        <View style={styles.alert}>
            {children}
        </View>
    );
}

export default Alert;

const styles = StyleSheet.create({
    alert: {
        backgroundColor: "#6A0DAD",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    }
})