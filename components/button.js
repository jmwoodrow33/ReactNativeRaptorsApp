import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

export default function Button({ label, onPress, isSelected }) {
    return (
        <PaperButton
            mode={isSelected ? 'contained' : 'outlined'}
            onPress={onPress}
            style={styles.button}
        >
            {label}
        </PaperButton>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        flexGrow: 1,
        minWidth: 80,
    },
});

