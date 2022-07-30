import { DefaultTheme } from "react-native-paper";
const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    primary: "#303841",
    background: "#ffffff",
    disabled: "#c4c4c4",
    surface: "#ffffff",
    accent: "#ffffff",
    error: "#ff0000",
  },
  fonts: {
    medium: {
      fontFamily: "opensans-regular",
    },
    regular: {
      fontFamily: "montserat-regular",
    },
  },
  roundness: 8,
  animation: {
    scale: 1,
  },
  dark: false,
} as typeof DefaultTheme;
export default CustomDefaultTheme;
