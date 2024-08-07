import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { PlayerContext } from '../components/PlayerContext';
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';

export default function Update() {
    const db = useSQLiteContext();
    const { players, setPlayers, playerIndex, setPlayerIndex } = useContext(PlayerContext);
    const router = useRouter();

    const [playerName, setPlayerName] = useState('');
    const [playerAge, setPlayerAge] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');
    const [playerImageURL, setPlayerImageURL] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerRating, setPlayerRating] = useState('');

    useEffect(() => {
        const player = players[playerIndex];
        if (player) {
            setPlayerName(player.name || '');
            setPlayerAge(player.age?.toString() || '');
            setPlayerTeam(player.team || '');
            setPlayerImageURL(player.imageUrl || '');
            setPlayerPosition(player.position || '');
            setPlayerRating(player.rating?.toString() || '');
        }
    }, [playerIndex, players]);

    const savePlayerInfo = async () => {
        const updatedPlayer = {
            name: playerName,
            age: parseInt(playerAge),
            team: playerTeam,
            imageUrl: playerImageURL,
            position: playerPosition,
            rating: parseInt(playerRating)
        };
        console.log("Saving player info:", updatedPlayer);
        await db.runAsync('UPDATE players SET age = ?, team = ?, imageUrl = ?, position = ?, rating = ? WHERE name = ?', playerAge, playerTeam, playerImageURL, playerPosition, playerRating, players[playerIndex].name);
        const updatedPlayers = await db.getAllAsync('SELECT * FROM players');
        setPlayers(updatedPlayers);
        router.push('/');
    };

    const deletePlayer = async () => {
        const playerNameToDelete = players[playerIndex]?.name;
        console.log("Deleting player:", playerNameToDelete);
        if (!playerNameToDelete) {
            console.log("No player found at index", playerIndex);
            return;
        }
        await db.runAsync('DELETE FROM players WHERE name = ?', playerNameToDelete);
        const updatedPlayers = await db.getAllAsync('SELECT * FROM players');
        setPlayers(updatedPlayers);
        setPlayerIndex(0);
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
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={savePlayerInfo} style={styles.button}>
                        Save Player
                    </Button>
                    <Button mode="contained" onPress={deletePlayer} style={[styles.button, styles.deleteButton]}>
                        Delete Player
                    </Button>
                </View>
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
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        width: '150%',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});


