import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

export async function connectSocket(usuario:String) {
    try {
        const serverAddress = await AsyncStorage.getItem("serverAddress") || "http://localhost:3000";
        return io(serverAddress, {query: { usuario }});
    }catch (error) {
        console.error(error);
    }
}