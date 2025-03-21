import { Link, Stack } from "expo-router";
import { Button, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => (
    <SafeAreaView style={styles.container}>
        <Stack.Screen options={{headerShown: false}}/>
        <Text>Bienvenido al chat</Text>
        <Link href="/chat" asChild>
            <Button title="Entrar" />
        </Link>
        <Link href="/settings">
            Configuración
        </Link>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        gap: 8
    }
});