import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import EventsContainer from "../../../components/Events";
import { useUpdateEventMutation } from "../../../store/features/services/events";

const ArchivedEvents = ({ navigation }: any) => {
  const [updateEvent, { data, isLoading, isSuccess, isError, error }] =
    useUpdateEventMutation();
  const formHandler = async (
    eventId: string,
    action: string,
    type?: string
  ) => {
    await updateEvent({ eventId, action });
  };
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", async () => {
      setRefetch(true);
    });

    return () => {
      willFocusSubscription;
    };
  }, [navigation]);
  return (
    <View>
      {refetch && (
        <EventsContainer
          formHandler={formHandler}
          type="customer"
          archived={true}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default ArchivedEvents;

const styles = StyleSheet.create({});
