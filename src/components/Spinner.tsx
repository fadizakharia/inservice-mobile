import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Spinner = () => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size={40} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
