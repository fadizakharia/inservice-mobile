import DatePicker from "@react-native-community/datetimepicker";
import {
  NavigationProp,
  ParamListBase,
  Route,
  useNavigation,
} from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { RootState } from "../../../store";
import { useAddEventMutation } from "../../../store/features/services/events";
import { IService } from "../../../store/types/services";
interface IAddEvent {
  route: Route<"Add-Evet", ParamListBase>;
  navigation: NavigationProp<any>;
}

const AddEvent: React.FC<IAddEvent> = ({ route, navigation }) => {
  const service = route.params.service as IService;
  const [addEvent, { data, isLoading, isSuccess, error, isError }] =
    useAddEventMutation();
  const navigator = useNavigation<NavigationProp<any>>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    moment(moment().format("DD MMM YYYY")).toDate()
  );
  const location = useSelector<RootState, RootState["location"]>(
    (state) => state.location
  );
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [timeNeeded, setTimeNeeded] = useState<string>("1");
  const handleDateUpdate = (_: any, date: any) => {
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  const handleTimeUpdate = (_: any, date: any) => {
    setShowTimePicker(Platform.OS === "ios");
    console.log(date);
    setSelectedDate(date);
    setShowTimePicker(false);
  };
  const handleHoursNeededChange = (value: string) => {
    if (value && +value < 1) {
      setTimeNeeded("1");
    } else if (+value > 12) {
      setTimeNeeded("12");
    } else {
      setTimeNeeded(value);
    }
  };
  useEffect(() => {
    if (!isSuccess) return;
    navigator.navigate("Events");
    return () => {};
  }, [data, isSuccess]);

  const handleAddEvent = async () => {
    const start_time = selectedDate;
    const end_time = moment(selectedDate).add(timeNeeded, "hours").toDate();

    try {
      await addEvent({
        start_time,
        end_time,
        location: {
          longitude: location.longitude!,
          latitude: location.latitude!,
        },
        serviceId: service._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data, error);

  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? [styles.root, styles.androidSafeArea]
          : styles.root
      }
    >
      {!isLoading ? (
        <View style={styles.root}>
          {showDatePicker ? (
            <DatePicker
              onChange={handleDateUpdate}
              value={selectedDate}
              display="default"
              mode="date"
              minimumDate={moment().toDate()}
            />
          ) : null}
          {showTimePicker ? (
            <DatePicker
              onChange={handleTimeUpdate}
              value={selectedDate}
              display="default"
              mode="time"
              minimumDate={moment(moment.now()).toDate()}
            />
          ) : null}
          <Text style={styles.title}>Add Event</Text>
          <Text style={styles.dateText}>
            {moment(selectedDate).format("DD-MM-YY hh:mm A")}
          </Text>
          <View style={styles.actionContainer}>
            <Button onPress={() => setShowDatePicker((old) => !old)}>
              select day
            </Button>
            <Button onPress={() => setShowTimePicker((old) => !old)}>
              select time
            </Button>
          </View>
          <TextInput
            label="hours needed"
            value={timeNeeded}
            onChangeText={handleHoursNeededChange}
            keyboardType="number-pad"
          />
          <Button
            style={styles.submit}
            mode="contained"
            onPress={handleAddEvent}
          >
            Schedule
          </Button>
        </View>
      ) : (
        <Spinner />
      )}
    </SafeAreaView>
  );
};

export default AddEvent;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
  },
  androidSafeArea: {
    paddingTop: 20,
  },
  dateText: {
    textAlign: "center",
    fontFamily: "montserat-bold",
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 40,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "montserat-bold",
  },
  submit: {
    marginTop: 40,
  },
});
