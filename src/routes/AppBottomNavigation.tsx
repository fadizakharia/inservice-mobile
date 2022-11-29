import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import ServicesScreen from "../screens/customer/services/ServicesScreen";
import Profile from "../screens/profile/Profile";
import Service from "../screens/provider/Service";
import ChatNavigation from "./ChatNavigation";
import EventsRoutes from "./EventsRoutes";

const bottomTabs = createMaterialBottomTabNavigator();

function AppBottomNavigation() {
  return (
    <bottomTabs.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#aaaaaa"
      barStyle={{ backgroundColor: "#303841" }}
    >
      <bottomTabs.Screen
        name="Home"
        component={ServicesScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesignIcons name="home" color={color} size={24} />
          ),
        }}
      />

      <bottomTabs.Screen
        name="Chats"
        component={ChatNavigation}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <AntDesignIcons name="wechat" color={color} size={24} />
          ),
        }}
      />
      <bottomTabs.Screen
        name="Service"
        component={Service}
        options={{
          tabBarLabel: "My Service",
          tabBarIcon: ({ color }) => (
            <AntDesignIcons name="tool" color={color} size={24} />
          ),
        }}
      />
      <bottomTabs.Screen
        name="Events"
        component={EventsRoutes}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color }) => (
            <AntDesignIcons name="calendar" color={color} size={24} />
          ),
        }}
      />
      <bottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesignIcons name="user" color={color} size={24} />
          ),
        }}
      />
    </bottomTabs.Navigator>
  );
}

export default AppBottomNavigation;
