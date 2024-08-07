import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Player from '../components/player';
import { PlayerContext } from '../components/PlayerContext';
import { useSQLiteContext } from 'expo-sqlite';

export default function Home() {
    const db = useSQLiteContext();
    const { players, setPlayers, playerIndex, setPlayerIndex } = useContext(PlayerContext);

    useEffect(() => {
        async function setup() {
            const result = await db.getAllAsync('SELECT * FROM players');
            setPlayers(result);
        }
        setup();
    }, []);

    const handleNext = () => {
        setPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    const handlePrevious = () => {
        setPlayerIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
    };

    if (players.length === 0) {
        return <Text>Loading</Text>;
    }

    return (
        <View style={styles.container}>
            <Player player={players[playerIndex]} />
            <View style={styles.buttonContainer}>
                {playerIndex > 0 && (
                    <Button mode="contained" onPress={handlePrevious}>
                        Previous
                    </Button>
                )}
                {playerIndex < players.length - 1 && (
                    <Button mode="contained" onPress={handleNext}>
                        Next
                    </Button>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
});

