import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "@react-navigation/stack";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fonts from "expo-font";
import OnBoardingStack from "./src/routes/OnBoardingNavigation";
import { Button, Provider } from "react-native-paper";
import store from "./src/store/";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import CustomDefaultTheme from "./src/styles/theme";
import { useCurrentUserQuery } from "./src/store/features/services/auth";
import { setUser } from "./src/store/features/auth-slice";
import { IAuthState } from "./src/store/types/auth";
import AppBottomNavigation from "./src/routes/AppBottomNavigation";
import CustomNavigation from "./src/routes/CustomNavigation";
preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      try {
        await fonts.loadAsync({
          "montserat-regular": require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
          "montserat-bold": require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
          "opensans-regular": require("./assets/fonts/OpenSans/OpenSans-Regular.ttf"),
          "opensans-bold": require("./assets/fonts/OpenSans/OpenSans-Bold.ttf"),
        });
      } catch (err) {
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
    return () => {};
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (appIsReady) {
    onLayoutRootView();
    return (
      <ReduxProvider store={store}>
        <Provider theme={CustomDefaultTheme}>
          <NavigationContainer>
            <CustomNavigation />
          </NavigationContainer>
        </Provider>
      </ReduxProvider>
    );
  } else {
    return (
      <View>
        <Text>Could not render screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
