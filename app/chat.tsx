import React,{useState, useEffect} from "react";
import { ActivityIndicator, Button, FlatList, Text, TextInput, StyleSheet, View } from "react-native";
import { connectSocket } from "../src/socket";
import { Socket } from "socket.io-client";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatMessage } from "../src/models/chatMessage";

export default function () {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isloading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        connectSocket().then((socket) => {
            setSocket(socket);
            setLoading(false);
        });
        return () => {
            if(socket) {
                socket?.disconnect();
            }
        }
    }, []);

    useEffect(() => {
        socket?.on("message", (message: ChatMessage) => {
            setMessages((messages) => [...messages, message]);
        });
        return () => {
            socket?.off("message");
        }
    }, [socket]);

    const sendMessage = () => {
        if(message.trim()) {
            socket?.emit("message", message);
            setMessage("");
        }
    }

    if(isloading) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", padding: 20}}>
            <FlatList
                data={messages}
                renderItem={({item}) => <Text style={styles.textito}>{item.message}</Text>}
                keyExtractor={(_, index) => index.toString()}
            />
            <View style={{flexDirection: "row"}}>
                <TextInput
                    style={{flex: 1, borderWidth: 1, borderColor: "green"}}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Escribe un mensaje pues"
                />
                <Button title="Mandar" onPress={sendMessage} />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    textito: {
        marginVertical: 5,
        fontSize: 16, 
        color: "white", 
        backgroundColor: "darkgreen",
        paddingHorizontal: 10, 
        paddingVertical: 5,
        borderRadius: 5, 
        alignSelf: "flex-start",
        fontWeight: "bold"
    }
});