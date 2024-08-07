import React, { createContext, useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const db = useSQLiteContext();
    const [players, setPlayers] = useState([]);
    const [playerIndex, setPlayerIndex] = useState(0);

    useEffect(() => {
        async function fetchPlayers() {
            console.log("Fetching players from database...");
            const result = await db.getAllAsync('SELECT * FROM players');
            console.log("Fetched players:", result);
            setPlayers(result);
        }
        fetchPlayers();
    }, [db]);

    return (
        <PlayerContext.Provider value={{ players, setPlayers, playerIndex, setPlayerIndex }}>
            {children}
        </PlayerContext.Provider>
    );
};


