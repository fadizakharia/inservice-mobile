import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/customer/Login";
import Signup from "../screens/customer/Signup";

import React, { useEffect } from "react";
import SignupSuccess from "../screens/customer/SignupSuccess";
export type NavigationOptions = "Login" | "Signup" | "SuccessSignup";

export type OnBoardingStackParamList = {
  Login: undefined;
  Signup: undefined;
  SuccessSignup: undefined;
};
const Stack = createStackNavigator<OnBoardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SuccessSignup" component={SignupSuccess} />
    </Stack.Navigator>
  );
};
export default OnboardingStack;
