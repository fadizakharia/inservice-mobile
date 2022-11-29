import { Modal, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as Location from "expo-location";
const AddressToolBar = () => {
  const location = useSelector<RootState, RootState["location"]>(
    (state) => state.location
  );
  const [locationAddr, setLocationAddr] = useState<string>("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    (async () => {
      if (location && location.latitude && location.longitude) {
        try {
          const foundLocationAddr = await Location.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          if (foundLocationAddr)
            setLocationAddr(
              foundLocationAddr[0].streetNumber +
                ", " +
                foundLocationAddr[0].street +
                ", " +
                foundLocationAddr[0].city +
                ", " +
                foundLocationAddr[0].region +
                ", " +
                foundLocationAddr[0].isoCountryCode
            );
        } catch (err) {
          setError("could not fetch location!");
        }
      }
    })();
    return () => {};
  }, [location.latitude, location.longitude]);

  return (
    <Text style={{ color: "#fff", fontSize: 12, width: "100%" }}>
      <Text style={styles.header}>Current Location: </Text>
      {locationAddr}
    </Text>
  );
};

export default AddressToolBar;

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    fontFamily: "montserat-bold",
  },
});
