import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";
import axios from "../../api/";
import ServiceForm from "../../components/ServiceForm";
import { useCreateServiceMutation } from "../../store/features/services/service";
import { IService } from "../../store/types/services";
const ServiceCreation = (args: Partial<IService>) => {
  const navigator = useNavigation<StackNavigationProp<any, any>>();
  const [createService, { isSuccess, isLoading }] = useCreateServiceMutation();

  const handleServiceCreation = async (
    arg: Partial<IService>,
    image: string
  ) => {
    console.log(arg);

    createService({
      ...arg,
      location: {
        longitude: arg.location!.longitude,
        latitude: arg.location!.latitude,
        name: arg.location!.name,
      },
    })
      .unwrap()
      .then(async (data) => {
        if (image) {
          const formData = new FormData();
          formData.append("image", {
            name: "service",
            uri: image,
            type: "image/jpg",
          } as any);

          try {
            const res = await axios.put("services/sp/image", formData, {
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            });
            navigator.navigate("Service-Events");
          } catch (error: any) {
            console.log(error);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      {isLoading ? (
        <Modal visible={isLoading}>
          <ActivityIndicator />
        </Modal>
      ) : null}
      <ServiceForm buttonTitle="create" FormHandler={handleServiceCreation} />
    </View>
  );
};

export default ServiceCreation;

const styles = StyleSheet.create({});
