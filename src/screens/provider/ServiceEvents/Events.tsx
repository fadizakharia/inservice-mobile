import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, Button, Menu } from "react-native-paper";
import IonIcons from "react-native-vector-icons/Ionicons";
import AppToolbar from "../../../components/AppToolbar";
import EventsContainer from "../../../components/Events";
import SafeView from "../../../components/SafeView";
import Spinner from "../../../components/Spinner";
import { useUpdateEventMutation } from "../../../store/features/services/events";
export default function Events({ navigation }: any) {
  const [updateEvent, { data, isLoading, isSuccess, isError, error }] =
    useUpdateEventMutation();
  const formHandler = async (
    eventId: string,
    action: string,
    type?: string
  ) => {
    await updateEvent({ eventId, action });
  };
  const [serviceMenuVisible, setServiceMenuVisible] = useState<boolean>(false);
  const handleMenuToggle = () => {
    setServiceMenuVisible((old) => !old);
  };

  return (
    <SafeView>
      <AppToolbar title="Service Events">
        <Text style={styles.header}>Manage Service</Text>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <Button
            style={{ width: 100 }}
            onPress={() => {
              setServiceMenuVisible(false);
              navigation.navigate("Update-Service");
            }}
            mode="text"
            color="#fff"
          >
            edit
          </Button>
        </View>
      </AppToolbar>
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => {
            navigation.navigate("Pending-Events");
          }}
        >
          pending events
        </Button>
        <View style={{ flex: 1 }}></View>
        <Button
          onPress={() => {
            navigation.navigate("Archived-Service-Events");
          }}
        >
          archived events
        </Button>
      </View>
      {!isLoading ? (
        <EventsContainer
          pending={false}
          type="provider"
          archived={false}
          formHandler={formHandler}
          navigation={navigation}
        />
      ) : (
        <Spinner />
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    fontFamily: "montserat-bold",
    fontSize: 18,
    color: "white",
  },
});
