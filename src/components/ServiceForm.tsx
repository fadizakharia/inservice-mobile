import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  IconButton,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { categories, T } from "../store/types/categories";
import { IService } from "../store/types/services";
import Spinner from "./Spinner";
interface IServiceForm {
  service?: Partial<IService>;
  FormHandler: (arg: Partial<IService>, image: any) => void;
  buttonTitle: string;
}
export const ServiceForm: React.FC<IServiceForm> = ({
  service,
  FormHandler,
  buttonTitle,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();
  const [priceType, setPriceType] = useState<"hr" | "one-time">();
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<T>("Agriculture");
  const [radius, setRadius] = useState<number>(10);
  const [categoryDropDown, setCategoryDropDown] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");
  const locationState = useSelector<RootState, RootState["location"]>(
    (state) => state.location
  );
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigation<StackNavigationProp<any>>();
  useEffect(() => {
    if (service) {
      setTitle(service.title ? service.title : "");
      setDescription(service.description ? service.description : "");
      setPriceType(service.price_type ? service.price_type : "hr");
      setPrice(service.price ? service.price : 19.99);
      setCategory(service.category ? service.category : "Agriculture");
      setRadius(service.radius ? service.radius : 10000);
      setImage(service.cover_url ? service.cover_url : "");
      return () => {};
    }
  }, []);
  const handleSubmit = async () => {
    const locationGeo = await Location.geocodeAsync(locationName);
    setLoading(false);
    FormHandler(
      {
        category,
        price,
        title,
        description,
        price_type: priceType,
        radius: radius,
        location: {
          latitude: locationGeo[0].latitude,
          longitude: locationGeo[0].longitude,
          name: locationName,
        },
      },
      image
    );
    navigator.navigate("Service-Events");
    setLoading(true);
  };
  const handleGeoCoding = async () => {
    const location = await Location.reverseGeocodeAsync({
      longitude: locationState.longitude!,
      latitude: locationState.latitude!,
    });

    let locationAttrs = Object.keys(location[0]);
    let tempLocationObj: any = {
      ...location[0],
    };

    let sanitisedLocations: Array<string> = [];
    locationAttrs.forEach((key) => {
      if (tempLocationObj[key] !== null) {
        sanitisedLocations.push(tempLocationObj[key]);
      }
    });
    console.log(sanitisedLocations);

    setLocationName(sanitisedLocations.reverse().join(", "));
  };
  const openCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scrollView}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={openCameraRoll}>change cover</Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <View>
        <TextInput
          label={"title"}
          value={title}
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
          style={styles.field}
        />
        <TextInput
          multiline
          style={[styles.multilineField, styles.field]}
          value={description}
          mode="outlined"
          label="description"
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 18,
          fontFamily: "montserat-bold",
        }}
      >
        price type:{" "}
      </Text>
      <View style={styles.radioControl}>
        <View style={styles.radioContainer}>
          <RadioButton
            value="per-hour"
            color="#303841"
            status={priceType === "hr" ? "checked" : "unchecked"}
            onPress={() => setPriceType("hr")}
          />
          <Text style={styles.radioLabel}>hourly</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            color="#303841"
            value="one-time"
            status={priceType === "one-time" ? "checked" : "unchecked"}
            onPress={() => setPriceType("one-time")}
          />
          <Text style={styles.radioLabel}>one-time</Text>
        </View>
      </View>
      <TextInput
        label={"price"}
        value={price.toString()}
        onChangeText={(text) => setPrice(+text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />
      <View style={styles.dropDown}>
        <DropDown
          label={"category"}
          mode={"outlined"}
          visible={categoryDropDown}
          showDropDown={() => setCategoryDropDown(true)}
          onDismiss={() => setCategoryDropDown(false)}
          value={category}
          setValue={setCategory}
          list={categories.map((cat) => ({ label: cat, value: cat }))}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder='eg. "Baker Street London"'
          label={"address"}
          value={locationName}
          onChangeText={(text) => setLocationName(text)}
          style={{ flex: 1, paddingBottom: 10 }}
        />
        {locationState.latitude && locationState.longitude ? (
          <IconButton
            style={{ marginTop: 30 }}
            onPress={handleGeoCoding}
            icon={(props) => <IonIcons name="location" {...props} />}
            size={30}
          />
        ) : null}
      </View>
      {loading && <Spinner />}
      <Button mode="contained" style={{ marginTop: 20 }} onPress={handleSubmit}>
        {buttonTitle}
      </Button>
    </ScrollView>
  );
};
export default ServiceForm;
const styles = StyleSheet.create({
  root: {
    padding: 24,
  },
  multilineField: {
    height: 100,
  },
  field: {
    margin: 12,
  },
  radioContainer: {
    flexDirection: "row",
  },
  radioControl: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioLabel: {
    paddingTop: 10,
    fontSize: 12,
    fontFamily: "opensans-regular",
  },
  dropDown: {
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    paddingBottom: 50,
  },
});
