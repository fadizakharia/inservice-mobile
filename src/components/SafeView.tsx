import React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";

const SafeView: React.FC = ({ children }) => {
  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? [styles.root, styles.android]
          : [styles.root]
      }
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  android: {
    paddingTop: 20,
  },
});
