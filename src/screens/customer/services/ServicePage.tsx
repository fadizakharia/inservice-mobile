import {
  NavigationProp,
  ParamListBase,
  Route,
  useNavigation,
} from "@react-navigation/native";
import * as Talkjs from "@talkjs/expo";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "../../../api";
import SafeView from "../../../components/SafeView";
import Spinner from "../../../components/Spinner";
import { RootState } from "../../../store";
import { IService } from "../../../store/types/services";
import theme from "../../../styles/theme";
interface IServicePage {
  route: Route<"Service-Page", ParamListBase>;
  navigation: NavigationProp<any>;
}
const ServicePage: React.FC<IServicePage> = ({ route, navigation }) => {
  const [service, setService] = useState<IService>();
  const [serviceError, setServiceError] = useState<string>();
  const [loading, setLoading] = useState<Boolean>(false);
  const { serviceId } = route.params;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const navigator = useNavigation<NavigationProp<any>>();
  const user = useSelector<RootState, RootState["auth"]>((state) => state.auth);
  const handleOpenChat = () => {
    if (!serviceError) {
      const conversationId = Talkjs.oneOnOneId(user._id!, service?.user!._id!);
      const conversationBuilder = Talkjs.getConversationBuilder(conversationId);

      conversationBuilder.setParticipant({
        ...user,
        id: user._id!,
        name: user.first_name + " " + user.last_name,
      });
      conversationBuilder.setParticipant({
        ...service?.user!,
        id: service!.user._id!,
        name: service!.user.first_name + " " + service!.user.last_name!,
      });

      conversationBuilder.setAttributes({ subject: service!.title });
      navigation.navigate("Chat-Box", { conversationBuilder });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { status, data } = await axios.get(`/services/sp/${serviceId}`);
        if (status > 400) {
          setServiceError(data.error.message);
          return;
        }
        setService(data.service);
      } catch (err: any) {
        setServiceError("something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
    return () => {};
  }, []);

  return !loading && service ? (
    <SafeView>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: service.cover_url,
              height: windowHeight / 2,
              width: windowWidth * 0.9,
            }}
          />
        </View>

        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.subtitle}>
          {service.category} - {`${service.price}$ /${service.price_type}`}
        </Text>
        <View>
          <Divider style={styles.divider} />
        </View>
        <View>
          <Text style={styles.descriptionLabel}>Description:</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>
        <View style={styles.actionButtons}>
          <Button
            onPress={() =>
              navigator.navigate("Add-Event", {
                service: service,
              })
            }
            style={{ width: 150 }}
            mode="contained"
          >
            <Text style={styles.actionButtonText}>schedule service</Text>
          </Button>
          <Button
            onPress={handleOpenChat}
            style={{ width: 150 }}
            mode="contained"
          >
            <Text style={styles.actionButtonText}>inquire</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeView>
  ) : (
    <Spinner />
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    marginTop: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontFamily: "montserat-bold",
    fontSize: 16,
    textAlign: "center",
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 10,
    textAlign: "center",
  },
  divider: {
    color: theme.colors.primary,
    marginTop: 20,
    marginBottom: 20,
    height: 2,
    width: "20%",
    alignSelf: "center",
  },
  descriptionLabel: {
    fontFamily: "opensans-bold",
    fontSize: 14,
    marginLeft: "10%",
  },
  description: {
    opacity: 1,
    fontSize: 12,
    fontFamily: "opensans-regular",
    textAlign: "center",
  },
  actionButtons: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 40,
  },
  actionButtonText: {
    fontSize: 9,
  },
});
export default ServicePage;
