import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  clearCustomerEvents,
  clearProviderEvents,
  setCustomerEvents,
  setProviderEvents,
} from "../store/features/event-slice";
import { useLazyGetEventsQuery } from "../store/features/services/events";
import { IService } from "../store/types/services";
import { jesterParamsFilter } from "../util/queryParams";
import OpenMap from "react-native-open-maps";
import { ILocation } from "../store/types/location";
interface IEventsContainer {
  formHandler: (eventId: string, action: string, type?: string) => void;
  archived: Boolean;
  type: string;
  pending?: boolean;
  navigation?: any;
}

const EventsContainer: React.FC<IEventsContainer> = ({
  formHandler,
  type,
  archived,
  pending,
  navigation,
}) => {
  const shouldReset = useRef(true);
  const [getEvents, { data, isLoading, error, isFetching, isSuccess }] =
    useLazyGetEventsQuery({});
  const selector = useSelector<RootState, RootState["events"]>(
    (state) => state.events
  );

  const [page, setPage] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      shouldReset.current = true;
      await getEvents(
        jesterParamsFilter({
          type,
          page: 0,
          limit: 10,
          archived: archived,
          pending,
        }),
        false
      );
      console.log(shouldReset.current + "useEffect");
    })();
    return () => {};
  }, []);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", async () => {
      shouldReset.current = true;
      getEvents(
        jesterParamsFilter({
          type,
          page: 0,
          limit: 10,
          archived: archived,
          pending,
        }),
        false
      );
    });
    console.log(shouldReset.current + "focus");
    return () => willFocusSubscription;
  }, [navigation]);

  useEffect(() => {
    if (!isSuccess) return;
    if (shouldReset.current === true) {
      if (type === "customer") {
        dispatch(clearCustomerEvents(undefined));
        dispatch(setCustomerEvents(data!.events));
      } else {
        dispatch(clearProviderEvents(undefined));
        dispatch(setProviderEvents(data!.events));
      }
    } else {
      if (type === "customer") {
        dispatch(setCustomerEvents(data!.events));
      } else {
        dispatch(setProviderEvents(data!.events));
      }
    }
    shouldReset.current = false;
  }, [JSON.stringify(data), isSuccess, isFetching]);

  const handleLoadMore = async () => {
    if (data && data.hasNext) {
      await getEvents(
        jesterParamsFilter({
          type,
          page: page + 1,
          limit: 10,
          archived: archived,
        })
      );
      setPage((old) => old + 1);
    }
  };
  const handleOpenMap = (location: any) => {
    OpenMap({
      longitude: location.coordinates[0],
      latitude: location.coordinates[1],
      navigate: true,
      end: `${location.coordinates[1]},${location.coordinates[0]}`,
    });
  };
  return (
    <View>
      <FlatList
        data={
          type === "customer"
            ? selector.customerEvents
            : selector.providerEvents
        }
        keyExtractor={(event) => event._id}
        onEndReached={handleLoadMore}
        renderItem={(event) => {
          return (
            <Card>
              <Card.Title
                title={(event.item.service as IService).title}
                subtitle={event.item.status}
              />

              <Card.Content>
                <Text>
                  start time:{" "}
                  {moment(event.item.start_time).format("DD-MM-YY / hh:mm A")}
                </Text>
                <Text>
                  end time:{" "}
                  {moment(event.item.end_time).format("DD-MM-YY / hh:mm A")}
                </Text>
                <Card.Actions>
                  {event.item.nextActions.map((item, index) => {
                    return (
                      <Button
                        key={item + Date.now()}
                        onPress={() => formHandler(event.item._id, item, type)}
                      >
                        {item}
                      </Button>
                    );
                  })}
                  <View style={{ flex: 1 }}></View>
                  <Button
                    key="open"
                    onPress={() => handleOpenMap(event.item.location)}
                  >
                    open map
                  </Button>
                </Card.Actions>
              </Card.Content>
            </Card>
          );
        }}
      />

      {type === "customer" ? (
        !(selector.customerEvents!.length > 0) ? (
          <Text style={styles.notFoundText}>
            You have no events {archived ? " archived " : " "}at the moment.
          </Text>
        ) : null
      ) : !(selector.providerEvents!.length > 0) ? (
        <Text style={styles.notFoundText}>
          You have no events
          {archived ? " archived " : pending ? " pending " : " "}at the moment.
        </Text>
      ) : null}
    </View>
  );
};

export default EventsContainer;

const styles = StyleSheet.create({
  notFoundText: {
    textAlign: "center",
  },
});
