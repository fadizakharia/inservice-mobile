const myValue = "inservice";

export default ({ config }: any) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    name: myValue,
    version: process.env.MY_CUSTOM_PROJECT_VERSION || "1.0.0",
    // All values in extra will be passed to your app.
    extra: {
      BASE_URL: "http://192.168.138.199:4000/",
      AVATAR_ID: "4bef4c5bfb9e471787218913497525a5",
      APP_ID: "t4UxF0Xi",
      API_SECRET: "sk_test_SFeRaGDFMyFyidicLiru27Vsy2RgSFDj",
    },
    android: {
      package: "com.jestercreations.inservice",
      versionCode: 1,
    },
    ios: {
      bundleIdentifier: "inservice",
    },
  };
};
