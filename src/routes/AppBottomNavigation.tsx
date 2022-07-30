import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const bottomTabs = createBottomTabNavigator();
import React from "react";
import Chats from "../screens/customer/Chats";
import Events from "../screens/customer/Events";
import Home from "../screens/customer/Home";
import Services from "../screens/provider/Services";

function AppBottomNavigation() {
  return (
    <bottomTabs.Navigator>
      <bottomTabs.Screen name="Home" component={Home} />
      <bottomTabs.Screen name="Chats" component={Chats} />
      <bottomTabs.Screen name="Services" component={Services} />
      <bottomTabs.Screen name="Events" component={Events} />
    </bottomTabs.Navigator>
  );
}

export default AppBottomNavigation;
