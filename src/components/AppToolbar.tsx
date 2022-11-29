import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { Appbar } from "react-native-paper";

interface IAppToolbar {
  title: string;
}
const AppToolbar: React.FC<IAppToolbar> = ({ title, children }) => {
  return <Appbar>{children}</Appbar>;
};

export default AppToolbar;

const styles = StyleSheet.create({});
