import { createStackNavigator } from "@react-navigation/stack";

import React, { useEffect, useState } from "react";
import ArchivedEvents from "../screens/provider/ServiceEvents/ArchivedEvents";
import Events from "../screens/provider/ServiceEvents/Events";
import Service from "../screens/provider/Service";
import ServiceCreation from "../screens/provider/ServiceCreation";
import ServiceNotFound from "../screens/provider/ServiceNotFound";
import UpdateService from "../screens/provider/UpdateService";
import PendingEvents from "../screens/provider/ServiceEvents/PendingEvents";
import { Appbar } from "react-native-paper";
import AppToolbar from "../components/AppToolbar";
const ServiceNavigator = createStackNavigator();
interface ISPServicesNavigation {
  hasService: boolean;
}
const SPServicesNavigationGetDynamic = (initialRoute: string) => {
  return (
    <ServiceNavigator.Navigator
      screenOptions={{
        header: (props) => {
          return props.route.name !== "Service-Events" ? (
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
          ) : null;
        },
      }}
      initialRouteName={initialRoute}
    >
      <ServiceNavigator.Screen
        name="Update-Service"
        component={UpdateService}
      />
      <ServiceNavigator.Screen
        name="Service-Creation"
        component={ServiceCreation}
      />
      <ServiceNavigator.Screen
        name="Service-Not-Found"
        component={ServiceNotFound}
      />
      <ServiceNavigator.Screen name="Service-Events" component={Events} />
      <ServiceNavigator.Screen
        name="Pending-Events"
        component={PendingEvents}
      />

      <ServiceNavigator.Screen
        name="Archived-Service-Events"
        component={ArchivedEvents}
      />
    </ServiceNavigator.Navigator>
  );
};

const SPServicesNavigation: React.FC<ISPServicesNavigation> = (props) => {
  return SPServicesNavigationGetDynamic(
    props.hasService ? "Service-Events" : "Service-Not-Found"
  );
};
export default SPServicesNavigation;
