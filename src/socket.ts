import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

export async function connectSocket() {
    try {
        const serverAddress = await AsyncStorage.getItem("serverAddress") || "http://localhost:3000";
        return io(serverAddress);
    }catch (error) {
        console.error(error);
    }
}