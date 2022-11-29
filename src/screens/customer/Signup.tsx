import DatePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton, TextInput } from "react-native-paper";
import {
  NavigationOptions,
  OnBoardingStackParamList,
} from "../../routes/OnBoardingNavigation";
import { useSignupMutation } from "../../store/features/services/auth";
import { signupValidation } from "../../util/validation";

import moment from "moment";
import Spinner from "../../components/Spinner";
export default function Signup() {
  const [signup, { data, isError, isLoading, isSuccess, error }] =
    useSignupMutation();
  const navigator =
    useNavigation<
      StackNavigationProp<OnBoardingStackParamList, NavigationOptions>
    >();
  const [showBirthDate, setShowBirthDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(moment(moment.now()).toDate());
  const [dateText, setDateText] = useState<string>(
    moment(moment.now()).format("DD-MM-YYYY")
  );

  if (isSuccess && !isLoading) {
    navigator.navigate("SuccessSignup");
  }
  const handleSignup = async (args: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    date_of_birth: Date;
  }) => {
    await signup({
      first_name: args.first_name,
      last_name: args.last_name,
      username: args.email,
      password: args.password,
      date_of_birth: args.date_of_birth,
      auth_type: "local",
      isProvider: false,
    });
  };
  const handleSetDateText = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowBirthDate(Platform.OS === "ios");
    setDate(currentDate);
    const currentDateText = moment(currentDate).format("DD-MM-YYYY");
    setDateText(currentDateText);
  };
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        date_of_birth: moment(moment.now()).toDate(),
      }}
      onSubmit={(data) => {
        const sanitisedData = {
          ...data,
          date_of_birth: date,
        };
        handleSignup({
          ...sanitisedData,
          email: data.email,
        });
      }}
      validationSchema={signupValidation}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
        isInitialValid,
        setFieldTouched,
        setFieldValue,
      }) => (
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {!isLoading ? (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.root}>
                <View style={styles.logoConatainer}>
                  <Image
                    style={styles.logo}
                    source={require("../../../assets/images/logo_transparent.png")}
                  />
                </View>
                <View>
                  <View style={styles.fieldContainer}>
                    <View style={styles.formControl}>
                      <TextInput
                        onChangeText={handleChange("first_name")}
                        mode="flat"
                        onBlur={handleBlur("first_name")}
                        label="first name"
                        value={values.first_name}
                        key="first_name"
                        error={Boolean(errors.first_name)}
                        style={styles.field}
                      />
                      {errors.first_name ? (
                        <Text style={styles.errorText}>
                          {errors.first_name}
                        </Text>
                      ) : null}
                    </View>

                    <View style={styles.formControl}>
                      <TextInput
                        onChangeText={handleChange("last_name")}
                        onBlur={handleBlur("last_name")}
                        mode="flat"
                        value={values.last_name}
                        label="last name"
                        key="last_name"
                        error={Boolean(errors.last_name)}
                        style={styles.field}
                      />
                      {errors.last_name ? (
                        <Text style={styles.errorText}>{errors.last_name}</Text>
                      ) : null}
                    </View>
                  </View>

                  <View>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      mode="flat"
                      value={values.email}
                      label="email"
                      key="email"
                      error={Boolean(errors.email)}
                      style={styles.field}
                    />
                    {errors.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.formControl}>
                    <View style={styles.dateContainer}>
                      <Text style={styles.title}>Date of Birth:</Text>
                      <View style={styles.dateWrapper}>
                        <Text key={"date_of_birth"} style={styles.dateText}>
                          {dateText}
                        </Text>
                        <IconButton
                          icon="calendar"
                          onPress={() => {
                            setFieldTouched("date_of_birth", true);
                            setShowBirthDate((old) => !old);
                          }}
                        />
                      </View>
                    </View>
                    {showBirthDate ? (
                      <DatePicker
                        onChange={handleSetDateText}
                        value={date}
                        display="default"
                      />
                    ) : null}
                  </View>
                  <View style={styles.fieldContainer}>
                    <View style={styles.formControl}>
                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        mode="flat"
                        value={values.password}
                        label="password"
                        key="password"
                        secureTextEntry={true}
                        error={Boolean(errors.password)}
                        style={styles.field}
                      />
                      {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      ) : null}
                    </View>

                    <View style={styles.formControl}>
                      <TextInput
                        onChangeText={handleChange("confirm_password")}
                        onBlur={handleBlur("confirm_password")}
                        mode="flat"
                        value={values.confirm_password}
                        label="confirm password"
                        secureTextEntry={true}
                        key="confirm_password"
                        error={Boolean(errors.confirm_password)}
                        style={styles.field}
                      />
                      {errors.confirm_password ? (
                        <Text style={styles.errorText}>
                          {errors.confirm_password}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
                <Button
                  mode="contained"
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                  disabled={
                    !isValid ||
                    !(
                      touched &&
                      touched.email &&
                      touched.first_name &&
                      touched.last_name &&
                      touched.password &&
                      touched.confirm_password &&
                      touched.date_of_birth
                    )
                  }
                >
                  Signup
                </Button>
              </View>
            </ScrollView>
          ) : (
            <Spinner />
          )}
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    flex: 1,
    justifyContent: "space-around",
  },
  link: {
    color: "#000099",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  logoConatainer: {
    justifyItems: "center",
    alignItems: "center",
  },
  field: {
    marginTop: 8,
  },
  fieldContainer: {
    flexDirection: "row",
  },
  formControl: {
    flex: 1,
    margin: 8,
  },
  logo: {
    width: 200,
    height: 200,
  },
  keyboardContainer: {
    flex: 1,
  },
  submitBtn: {
    alignSelf: "center",
  },
  errorText: {
    color: "#ff0000",
  },
  scrollView: {
    paddingBottom: 50,
  },
  title: {
    fontFamily: "opensans-bold",
    fontSize: 14,
    marginRight: 20,
  },
  dateText: {
    borderColor: "#303841",
    borderRightWidth: 1,
    padding: 10,
  },

  dateContainer: {
    flexDirection: "row",

    alignItems: "center",
    margin: 20,
  },
  dateWrapper: {
    borderColor: "#303841",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 12,
  },
});
