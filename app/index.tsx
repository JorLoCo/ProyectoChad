import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Button, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
    const [username, setUsername] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{headerShown: false}}/>
            <Text>Bienvenido al chat</Text>
            <TextInput style={styles.campoTexto} placeholder="Usuario" value={username} onChangeText={t => setUsername(t)}/>
            <Link href={{pathname: "/chat", params:{usuario: username}}} asChild>
                <Button title="Entrar" />
            </Link>
            <Link href="/settings">
                Configuración
            </Link>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        gap: 8
    },
    campoTexto: {
        borderWidth: 1,
        borderColor: "green",
        padding: 8,
        width: "100%",
    }
});