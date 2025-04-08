import React,{useState, useEffect} from "react";
import { ActivityIndicator, Button, FlatList, Text, TextInput, StyleSheet, View, ViewStyle } from "react-native";
import { connectSocket } from "../../src/socket";
import { Socket } from "socket.io-client";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatMessage } from "../../src/models/chatMessage";
import { push } from "expo-router/build/global-state/routing";
import { useLocalSearchParams } from "expo-router";

type MessageBubbleProps = {
    chatMessage: ChatMessage;
    mySocketID?: string;
}
const MessageBubble = ({chatMessage, mySocketID}:MessageBubbleProps) => {
    let bubbleStyle = [styles.tumensaje];
    let ownMessage = chatMessage.socketID == mySocketID;
    if(ownMessage) {
        if(chatMessage.socketID == mySocketID) {
            bubbleStyle.push(styles.mimensaje);
        }

    }
    if(chatMessage.socketID == "server") {
        bubbleStyle.push(styles.mensajeserver);
    }
    
    return (
        <View>
            {!ownMessage && <Text style={styles.nombreusuario}>{chatMessage.user}</Text>}
            <Text style={bubbleStyle}>{chatMessage.message}</Text>
        </View>
        
    );

};

type lsp = {
    user: string;
};

export default function () {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isloading, setLoading] = useState<boolean>(true);
    const [mySocketID, setMySocketID] = useState<string>();
    const {user} = useLocalSearchParams<lsp>();

    useEffect(() => {
        connectSocket(user).then((socket) => {
            setSocket(socket);
            setLoading(false);
            setMySocketID(socket?.id);
        }).catch (error => console.error(error));
        return () => {
            if(socket) {
                socket?.disconnect();
            }
        }
    }, []);

    useEffect(() => {
        socket?.on("connected", ({socketID}) => {
            setMySocketID(socketID);
        })
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
                renderItem={({item}) => (
                    <MessageBubble  chatMessage={item} mySocketID={mySocketID} />
                )}
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
    mimensaje: {
        marginVertical: 5,
        fontSize: 16, 
        color: "white", 
        backgroundColor: "#3AB67E",
        paddingHorizontal: 10, 
        paddingVertical: 5,
        borderRadius: 5, 
        alignSelf: "flex-end",
        fontWeight: "bold"
    } as ViewStyle,
    tumensaje: {
        marginVertical: 5,
        fontSize: 16, 
        color: "white", 
        backgroundColor: "#426FAE",
        paddingHorizontal: 10, 
        paddingVertical: 5,
        borderRadius: 5, 
        alignSelf: "flex-start",
        fontWeight: "bold"
    } as ViewStyle,
    mensajeserver: {
        marginVertical: 5,
        fontSize: 16, 
        color: "white", 
        backgroundColor: "black",
        paddingHorizontal: 10, 
        paddingVertical: 5,
        borderRadius: 5, 
        alignSelf: "center",
        fontWeight: "bold"
    } as ViewStyle,
    nombreusuario: {
        fontSize: 12,
        color: "black",
        fontWeight: "bold",
    } as ViewStyle
});