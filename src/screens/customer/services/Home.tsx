import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useDispatch, useSelector } from "react-redux";
import AppToolbar from "../../../components/AppToolbar";
import { AppDispatch, RootState } from "../../../store";
import { setLocation } from "../../../store/features/location-slice";
import { useLazyGetNearbyServicesQuery } from "../../../store/features/services/service";
import { categories, T } from "../../../store/types/categories";
import { nearbyServices } from "../../../store/types/services";
import { jesterParamsFilter } from "../../../util/queryParams";

const Home = () => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector<RootState, RootState["location"]>(
    (state) => state.location
  );
  const [
    loadNearbyServices,
    { data, isLoading, isSuccess, isError, isFetching, error, currentData },
  ] = useLazyGetNearbyServicesQuery();
  const shouldReset = useRef(true);
  const [categoryDropDown, setCategoryDropDown] = useState<boolean>(false);
  const [category, setCategory] = useState<T>("All");
  const [page, setPage] = useState<number>(0);
  const [loadedServices, setLoadedServices] = useState<
    nearbyServices["services"]
  >([]);
  const navigator = useNavigation<StackNavigationProp<any, any>>();
  const [collapseDescription, setCollapseDescription] = useState<boolean>(true);
  const getNearbyServices = async () => {
    if (
      location.latitude &&
      location.longitude &&
      location.permission_allowed
    ) {
      let tempObject = {
        lat: location.latitude,
        lng: location.longitude,
        category: category === "All" ? undefined : category,
        distance: 500,
        limit: 10,
        page: 0,
        searchKey: searchText,
      };
      const arg = jesterParamsFilter(tempObject);
      console.log(arg);

      await loadNearbyServices(arg);
    } else {
      alert("please enable location to continue using this application!");
    }
  };
  const handleLoadMoreServices = async () => {
    if (
      location.latitude &&
      location.longitude &&
      location.permission_allowed
    ) {
      let tempPage = page + 1;
      let tempObject = {
        lat: location.latitude,
        lng: location.longitude,
        category: category === "All" ? undefined : category,
        distance: 50, // future feature (needs metrics and additional filters)
        limit: 10,
        page: tempPage,
        searchKey: searchText,
      };
      const arg = jesterParamsFilter(tempObject);
      await loadNearbyServices(arg);
      setPage(0);
    } else {
      alert("please enable location to continue using this application!");
      setTimeout(() => {
        BackHandler.exitApp();
      }, 5000);
    }
  };
  // step 1 load location
  useEffect(() => {
    const locationLoad = async () => {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(
        setLocation({
          permission_allowed: true,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    };
    locationLoad();
    return () => {};
  }, []);

  // step2 load initial services upon location load
  useEffect(() => {
    const loadInitialServices = async () => {
      shouldReset.current = true;
      if (location.latitude && location.longitude) {
        await getNearbyServices();
      }
    };
    loadInitialServices();
    return () => {};
  }, [location.latitude, location.longitude, category]);

  useEffect(() => {
    if (!isSuccess) return;
    if (shouldReset.current) {
      shouldReset.current = false;
      setLoadedServices(data!.services);
    } else {
      setLoadedServices([...loadedServices, ...data!.services]);
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={{ marginBottom: 20, marginTop: 10 }}>
        <DropDown
          dropDownStyle={{ flex: 1 }}
          label={"category"}
          mode={"outlined"}
          visible={categoryDropDown}
          showDropDown={() => setCategoryDropDown(true)}
          onDismiss={() => setCategoryDropDown(false)}
          value={category}
          setValue={setCategory}
          list={["All", ...categories].map((cat) => ({
            label: cat,
            value: cat,
          }))}
        />
      </View>

      <FlatList
        data={loadedServices}
        keyExtractor={(key) => key._id!}
        onEndReached={() => handleLoadMoreServices()}
        renderItem={(service) => {
          return (
            <Card>
              <Card.Cover source={{ uri: service.item.cover_url }} />
              <Card.Title
                title={service.item.title}
                subtitle={`${service.item.price}\$ /${service.item.price_type}`}
              />

              <Card.Actions>
                <Button
                  onPress={() =>
                    navigator.push("Service-Page", {
                      serviceId: service.item._id,
                    })
                  }
                  mode="contained"
                >
                  view service
                </Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  logoContainer: {
    justifyItems: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
  },
  divider: {
    borderWidth: 1,
    width: "50%",
    alignSelf: "center",
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
