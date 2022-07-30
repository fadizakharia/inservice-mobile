import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  NavigationOptions,
  OnBoardingStackParamList,
} from "../../routes/OnBoardingNavigation";
import { StackNavigationProp } from "@react-navigation/stack";

const SignupSuccess = () => {
  const navigator =
    useNavigation<
      StackNavigationProp<OnBoardingStackParamList, NavigationOptions>
    >();
  const handleReroute = () => {
    navigator.navigate("Login");
  };
  return (
    <View style={styles.root}>
      <Text style={styles.successText}>User successfully created! </Text>
      <Button onPress={handleReroute} mode="text">
        <Text style={styles.cta}>Return to Login</Text>
      </Button>
    </View>
  );
};

export default SignupSuccess;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  cta: {
    fontSize: 12,
  },
  successText: {
    fontSize: 24,
    color: "#10aa10",
    alignSelf: "center",
  },
});
