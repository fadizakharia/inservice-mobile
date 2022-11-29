import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ServiceNotFound = () => {
  const navigator = useNavigation<any>();
  return (
    <View style={styles.root}>
      <Text style={styles.informationText}>
        You do not have a service would you like to create a service?
      </Text>
      <Button
        onPress={() => navigator.navigate("Service-Creation")}
        mode="contained"
      >
        Create Service
      </Button>
    </View>
  );
};

export default ServiceNotFound;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 24,
  },
  informationText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
