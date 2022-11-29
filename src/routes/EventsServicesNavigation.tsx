import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import { Appbar } from "react-native-paper";
import ArchivedEvents from "../screens/customer/events/ArchivedEvents";
import Events from "../screens/customer/events/Events";
import PendingEvents from "../screens/provider/ServiceEvents/PendingEvents";
const EventsNavigator = createStackNavigator();
export default function EventsNavigation() {
  return (
    <EventsNavigator.Navigator
      
    >
      <EventsNavigator.Screen name="My-events" component={Events} />
      <EventsNavigator.Screen name="Pending-Events" component={PendingEvents} />
      <EventsNavigator.Screen
        name="Archived-Events"
        component={ArchivedEvents}
      />
    </EventsNavigator.Navigator>
  );
}
