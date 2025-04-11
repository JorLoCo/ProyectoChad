import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Socket } from "socket.io-client";
import { connectSocket } from "../../src/socket";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

interface ConnectedUser {
    socketID: string;
    user: string;
};

export default () => {
    const { user } = useLocalSearchParams<{user:string}>();
    const [socket, setSocket] = useState<Socket>();
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        connectSocket(user).then((socket) => {
            setSocket(socket);
        })
    }, []);

    useEffect(() => {
        if(!socket) return;
        socket.on('users:update',(data) => { 
            setUsers(data.users);
        });
        return(() => {
            socket.off('users:update');
        });
    }, [socket]);

    return(
        <SafeAreaView>
            <FlatList 
                data = {users} 
                keyExtractor={(_e, i) => i.toFixed(0)} 
                renderItem={({item}) => <Text style={styles.nombreusuario}>{item}</Text>}
            />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    nombreusuario: {
        fontSize: 12,
        color: "black",
        fontWeight: "bold",
    } 
});
