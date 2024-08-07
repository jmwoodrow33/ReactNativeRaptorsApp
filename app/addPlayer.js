import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';

export default function AddPlayer() {
    const db = useSQLiteContext();
    const router = useRouter();
    const [playerName, setPlayerName] = useState('');
    const [playerAge, setPlayerAge] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');
    const [playerImageURL, setPlayerImageURL] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerRating, setPlayerRating] = useState('');

    const addPlayer = async () => {
        const newPlayer = { name: playerName, age: parseInt(playerAge), team: playerTeam, imageUrl: playerImageURL, position: playerPosition, rating: parseInt(playerRating) };
        console.log("Adding player info:", newPlayer);
        await db.runAsync('INSERT INTO players (name, age, team, imageUrl, position, rating) VALUES (?, ?, ?, ?, ?, ?)', playerName, playerAge, playerTeam, playerImageURL, playerPosition, playerRating);
        router.push('/');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Player Name</Text>
                <TextInput style={styles.input} onChangeText={setPlayerName} value={playerName} />
                <Text style={styles.title}>Player Age</Text>
                <TextInput style={styles.input} onChangeText={setPlayerAge} value={playerAge} keyboardType='numeric' />
                <Text style={styles.title}>Player Team</Text>
                <TextInput style={styles.input} onChangeText={setPlayerTeam} value={playerTeam} />
                <Text style={styles.title}>Player Image URL</Text>
                <TextInput style={styles.input} onChangeText={setPlayerImageURL} value={playerImageURL} />
                <Text style={styles.title}>Player Position</Text>
                <TextInput style={styles.input} onChangeText={setPlayerPosition} value={playerPosition} />
                <Text style={styles.title}>Player Rating (1-5)</Text>
                <TextInput style={styles.input} onChangeText={setPlayerRating} value={playerRating} keyboardType='numeric' />
                <Button mode="contained" onPress={addPlayer} style={styles.button}>
                    Add Player
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 40,
        width: '120%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        width: '150%',
    },
});


