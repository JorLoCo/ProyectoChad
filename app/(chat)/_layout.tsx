import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default () => (
    <Tabs screenOptions={{tabBarActiveTintColor: "#20c020"}}>
        <Tabs.Screen name="chat"
            options={{
                title: "Chat",
                tabBarIcon: ({color}) => <FontAwesome name="comment" size={28} color={color}/>,
            }}
        />
        <Tabs.Screen name="users"
            options={{
                title: "Usuarios",
                tabBarIcon: ({color}) => <FontAwesome name="users" size={28} color={color}/>,
            }}
        />
    </Tabs>
);