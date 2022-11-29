import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Appbar } from "react-native-paper";
import AppToolbar from "../components/AppToolbar";
import ArchivedEvents from "../screens/customer/events/ArchivedEvents";
import Events from "../screens/customer/events/Events";
const EventsNavigator = createStackNavigator();
export default function EventsRoutes() {
  return (
    <EventsNavigator.Navigator
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
              title={props.route.name
                .replace("-", " ")
                .split(" ")
                .reverse()
                .join(" ")}
            ></Appbar.Content>
          </AppToolbar>
        ),
      }}
      initialRouteName="Events-Active"
    >
      <EventsNavigator.Screen name="Events-Active" component={Events} />
      <EventsNavigator.Screen
        name="Events-Archived"
        initialParams={{
          serviceId: 0,
        }}
        component={ArchivedEvents}
      />
    </EventsNavigator.Navigator>
  );
}
