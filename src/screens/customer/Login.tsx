import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import React from "react";
import { loginValidation } from "../../util/validation";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationOptions,
  OnBoardingStackParamList,
} from "../../routes/OnBoardingNavigation";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { useLoginMutation } from "../../store/features/services/auth";
import { setUser } from "../../store/features/auth-slice";
import { IAuthState } from "../../store/types/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();
  const navigator =
    useNavigation<
      StackNavigationProp<OnBoardingStackParamList, NavigationOptions>
    >();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const payload = await login({
        username: values.email,
        password: values.password,
        isProvider: false,
      }).unwrap();
      dispatch(setUser(payload as IAuthState));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleLogin}
      validationSchema={loginValidation}
      validateOnBlur={true}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {!isLoading ? (
            <View style={styles.root}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require("../../../assets/images/logo_transparent.png")}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  onChangeText={handleChange("email")}
                  mode="flat"
                  onBlur={handleBlur("email")}
                  label="email"
                  key="email"
                  value={values.email}
                  error={Boolean(errors.email)}
                  style={styles.field}
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  mode="flat"
                  key="password"
                  value={values.password}
                  label="password"
                  secureTextEntry={true}
                  error={Boolean(errors.password)}
                  style={styles.field}
                />
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <Button
                  mode="contained"
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                  disabled={!isValid || !(touched.email && touched.password)}
                >
                  login
                </Button>
                <View style={styles.container}>
                  <Text>don't have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigator.navigate("Signup")}
                  >
                    <Text style={styles.link}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.root}>
              <ActivityIndicator />
            </View>
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
  logoContainer: {
    justifyItems: "center",
    alignItems: "center",
    flex: 1,
  },
  formControl: {
    flex: 1,
    margin: 8,
  },
  field: {
    marginTop: 8,
  },
  errorText: {
    color: "#ff0000",
  },
  logo: {
    width: 200,
    height: 200,
  },
  keyboardContainer: {
    flex: 1,
  },
  submitBtn: {
    marginTop: 40,
    alignSelf: "center",
  },
});
