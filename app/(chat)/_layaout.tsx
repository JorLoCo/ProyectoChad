import { Tabs } from "expo-router";

export default () => (
    <Tabs>
        <Tabs.Screen name="chat"/>
        <Tabs.Screen name="user"/>
    </Tabs>
);