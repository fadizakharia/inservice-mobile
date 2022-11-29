import { NavigationContainer } from "@react-navigation/native";
import * as fonts from "expo-font";
import * as Location from "expo-location";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import CustomNavigation from "./src/routes/CustomNavigation";
import store from "./src/store/";
import CustomDefaultTheme from "./src/styles/theme";

preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    const loadLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    };
    loadLocationPermission();
    return () => {};
  }, []);

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
