import React from "react";
import { StyleSheet } from "react-native";
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

  return (
    <EventsContainer
      formHandler={formHandler}
      type="provider"
      archived={true}
      pending={false}
      navigation={navigation}
    />
  );
};

export default ArchivedEvents;

const styles = StyleSheet.create({});
