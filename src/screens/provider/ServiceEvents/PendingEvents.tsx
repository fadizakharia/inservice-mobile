import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import EventsContainer from "../../../components/Events";
import SafeView from "../../../components/SafeView";
import Spinner from "../../../components/Spinner";
import { useUpdateEventMutation } from "../../../store/features/services/events";

const PendingEvents = ({ navigation }: any) => {
  const [updateEvent, { data, isLoading, isSuccess, isError, error }] =
    useUpdateEventMutation();
  const formHandler = async (
    eventId: string,
    action: string,
    type?: string
  ) => {
    await updateEvent({ eventId, action });
  };
  const navigator = useNavigation<StackNavigationProp<any>>();
  return (
    <SafeView>
      {!isLoading ? (
        <EventsContainer
          formHandler={formHandler}
          type="provider"
          archived={false}
          pending={true}
          navigation={navigation}
        />
      ) : (
        <Spinner />
      )}
    </SafeView>
  );
};

export default PendingEvents;

const styles = StyleSheet.create({});
