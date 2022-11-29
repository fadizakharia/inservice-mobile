import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import axios from "../../api/";
import ServiceForm from "../../components/ServiceForm";
import {
  useLoadServiceQuery,
  useUpdateServiceMutation,
} from "../../store/features/services/service";
import { IService } from "../../store/types/services";
export default function UpdateService() {
  const { data, isError, isFetching, isLoading, isSuccess, error } =
    useLoadServiceQuery(undefined);
  const [updateService, updateServiceResultSet] = useUpdateServiceMutation();
  const navigator = useNavigation<StackNavigationProp<any, any>>();
  const handleServiceUpdate = async (arg: Partial<IService>, image: string) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", {
        name: "service",
        uri: image,
        type: "image/jpg",
      } as any);
      console.log(arg.location);

      try {
        const res = await axios.put("services/sp/image", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error: any) {
        console.log(error);
      }
    }
    await updateService({
      ...arg,
      location: {
        longitude: arg.location!.longitude,
        latitude: arg.location!.latitude,
        name: arg.location!.name,
      },
    })
      .unwrap()
      .then((data) => {
        navigator.navigate("Service-Events");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (isError) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  } else {
    return !isLoading && !isFetching ? (
      <ServiceForm
        buttonTitle="update"
        FormHandler={handleServiceUpdate}
        service={data}
      />
    ) : (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
