import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/";
import SafeView from "../../components/SafeView";
import Spinner from "../../components/Spinner";
import { AppDispatch, RootState } from "../../store";
import { clearUser } from "../../store/features/auth-slice";
import { useLogoutMutation } from "../../store/features/services/auth";
const Profile = () => {
  const [loading, setLoading] = useState<boolean>();
  const [image, setImage] = useState<any>();
  const user = useSelector<RootState, RootState["auth"]>((state) => state.auth);
  const [logout, { data, isSuccess, isLoading, error }] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user.profilePicture) {
      setImage(user.profilePicture);
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (!isSuccess) return;
    dispatch(clearUser());
    return () => {};
  }, [data]);
  const handleLogout = async () => {
    await logout(undefined);
  };
  console.log(error);

  const openCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      const formData = new FormData();
      formData.append("image", {
        name: "profile-picture",
        uri: result.uri,
        type: "image/jpg",
      } as any);

      await axios
        .put("user/profile-picture", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    }
  };
  return (
    <SafeView>
      {!isLoading ? (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{
                  uri: image
                    ? image
                    : `https://avatars.abstractapi.com/v1/?api_key=${
                        Constants.manifest!.extra!.AVATAR_ID
                      }&name=${user.first_name + " " + user.last_name}`,
                }}
                style={{ width: 200, height: 200, borderRadius: 360 }}
              />
            </View>
          </View>
          <Button onPress={openCameraRoll}>change profile picture</Button>
          <View style={styles.section}>
            <Text
              style={styles.title}
            >{`${user.first_name} ${user.last_name}`}</Text>
            <Text style={styles.subtitle}>{user.username}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.fieldHeader}>
              age:{" "}
              <Text style={styles.fieldContent}>
                {moment().diff(moment(user.date_of_birth), "years")} years
              </Text>
            </Text>
          </View>

          <Divider style={styles.sectionDivider} />
          <View style={styles.section}>
            <Button onPress={() => handleLogout()} color="red">
              Signout
            </Button>
          </View>
        </View>
      ) : (
        <Spinner />
      )}
    </SafeView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    borderRadius: 360,
    overflow: "hidden",
  },
  title: {
    fontFamily: "montserat-bold",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
  section: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.5,
  },
  fieldHeader: {
    fontSize: 14,
    fontFamily: "opensans-bold",
    textAlign: "center",
  },
  fieldContent: { fontSize: 12, fontFamily: "opensans-regular" },
  sectionDivider: {
    width: "20%",
    height: 2,
    alignSelf: "center",
  },
});
