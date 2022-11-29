import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Appbar } from "react-native-paper";
import AppToolbar from "../components/AppToolbar";
import AddEvent from "../screens/customer/services/AddEvent";
import Home from "../screens/customer/services/Home";
import ServicePage from "../screens/customer/services/ServicePage";
const CustomerServiceNavigator = createStackNavigator();
export default function EventsNavigation() {
  return (
    <CustomerServiceNavigator.Navigator
      screenOptions={{
        header: (props) => (
          <AppToolbar title={props.route.name}>
            {props.back && (
              <Appbar.Action
                icon={"keyboard-backspace"}
                onPress={props.navigation.goBack}
              />
            )}
            <Appbar.Content
              title={props.route.name.replace("-", " ")}
            ></Appbar.Content>
          </AppToolbar>
        ),
      }}
      initialRouteName="Customer-Services"
    >
      <CustomerServiceNavigator.Screen
        name="Customer-Services"
        component={Home}
      />
      <CustomerServiceNavigator.Screen
        name="Service-Page"
        initialParams={{
          serviceId: 0,
        }}
        component={ServicePage}
      />
      <CustomerServiceNavigator.Screen name="Add-Event" component={AddEvent} />
    </CustomerServiceNavigator.Navigator>
  );
}
