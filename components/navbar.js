import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from './button';

export default function NavBar() {
    const router = useRouter();

    const handleHome = () => {
        router.push('/');
    }
    const handleUpdate = () => {
        router.push('/update');
    }
    const handleAddPlayer = () => {
        router.push('/addPlayer');
    }

    return (
        <View style={styles.navbar}>
            <Button label="Players" onPress={handleHome} />
            <Button label="Update" onPress={handleUpdate} />
            <Button label="Add Player" onPress={handleAddPlayer} />
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        paddingVertical: 5,
        backgroundColor: "#eee",
    },
});



