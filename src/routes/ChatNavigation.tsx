import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ChatBox from "../screens/Chats/ChatBox";
import Chats from "../screens/Chats/Chats";
const ChatRoutes = createStackNavigator();
export default function ChatNavigation() {
  return (
    <ChatRoutes.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Conversation-List"
    >
      <ChatRoutes.Screen name="Chat-Box" component={ChatBox} />

      <ChatRoutes.Screen name="Conversation-List" component={Chats} />
    </ChatRoutes.Navigator>
  );
}
