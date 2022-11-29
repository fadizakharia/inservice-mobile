import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import EventsContainer from "../../../components/Events";
import SafeView from "../../../components/SafeView";
import { useUpdateEventMutation } from "../../../store/features/services/events";

const Events = ({ navigation }: any) => {
  const [updateEvent, { data, isLoading, isSuccess, isError, error }] =
    useUpdateEventMutation();
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", async () => {
      setRefetch(true);
    });

    return () => {
      willFocusSubscription;
    };
  }, [navigation]);

  const formHandler = async (
    eventId: string,
    action: string,
    type?: string
  ) => {
    await updateEvent({ eventId, action });
  };

  return (
    <SafeView>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}></View>
        <Button
          onPress={() => {
            navigation.navigate("Events-Archived");
          }}
        >
          archived events
        </Button>
      </View>
      {console.log(refetch)}
      {refetch && (
        <EventsContainer
          formHandler={formHandler}
          type="customer"
          archived={false}
          navigation={navigation}
        />
      )}
    </SafeView>
  );
};

export default Events;

const styles = StyleSheet.create({});
