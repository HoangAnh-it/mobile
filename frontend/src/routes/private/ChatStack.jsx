import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Chat from "../../screen/Tabs/Chat";
import ChatDetail from "../../screen/Chat/ChatDetail";

const Stack = createStackNavigator();
export default function ChatStack() {
    return (
        <Stack.Navigator initialRoutName="Đoạn chat">
            <Stack.Screen
                name="Đoạn chat"
                component={Chat}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Chat Detail"
                component={ChatDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}