import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Player({ player }) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{player.name}</Text>
            <Image source={{ uri: player.imageUrl }} style={styles.image} />
            <Text style={styles.details}>Age: {player.age}</Text>
            <Text style={styles.details}>Team: {player.team}</Text>
            <Text style={styles.details}>Position: {player.position}</Text>
            <Text style={styles.details}>Rating: {player.rating}/5</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    details: {
        fontSize: 18,
        marginVertical: 1,
    },
});
