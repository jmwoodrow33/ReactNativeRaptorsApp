import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import NavBar from '../components/navbar';
import { SQLiteProvider } from 'expo-sqlite';
import { PlayerProvider } from '../components/PlayerContext';

export default function HomeLayout() {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <SQLiteProvider databaseName="players.db" onInit={initializeDB}>
                    <Text style={styles.titleText}>{"Top Raptors Bench Players"}</Text>
                    <NavBar />
                    <PlayerProvider>
                        <Slot />
                    </PlayerProvider>
                </SQLiteProvider>
            </View>
        </PaperProvider>
    );
}

const initialPlayerData = [
    { name: "Matt Thomas", age: 25, team: "Raptors", imageUrl: "https://img.bleacherreport.net/img/images/photos/003/908/589/hi-res-03386281500443bb1adb91d35f2cce76_crop_north.jpg?1616696148&w=3072&h=2048", position: "SG", rating: 4 },
    { name: "Yuta Watanabe", age: 26, team: "Raptors", imageUrl: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F04%2Ftoronto-raptors-yuta-watanabe-standard-contract-signing-announcement-001.jpg?cbr=1&q=90", position: "SF", rating: 5 },
    { name: "Rondae Hollis-Jefferson", age: 27, team: "Raptors", imageUrl: "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_4:3,f_auto,q_auto,g_auto/shape/cover/sport/19795373ddd10dc3aa8de0c0abf31075a81c219a87965af9df620168d08e3ef4.jpg", position: "PF", rating: 2 },
];

async function initializeDB(db) {
    console.log("Initializing database...");
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS players (
            name TEXT PRIMARY KEY NOT NULL,
            age INT NOT NULL,
            team TEXT NOT NULL,
            imageUrl TEXT NOT NULL,
            position TEXT NOT NULL,
            rating INT NOT NULL
        );
    `);
    const result = await db.getAllAsync('SELECT * FROM players');
    if (result.length === 0) {
        console.log("Inserting initial player data...");
        for (const player of initialPlayerData) {
            await db.runAsync('INSERT INTO players (name, age, team, imageUrl, position, rating) VALUES (?, ?, ?, ?, ?, ?)', player.name, player.age, player.team, player.imageUrl, player.position, player.rating);
        }
    } else {
        console.log("Player data exists in the database.");
    }
    const allPlayers = await db.getAllAsync('SELECT * FROM players');
    console.log("Current players in the database:", allPlayers);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 110,
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'top',
        marginBottom: 20,
        marginTop:-50,
    },
});
