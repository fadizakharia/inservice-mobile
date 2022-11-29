import * as Talkjs from "@talkjs/expo";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const ChatBox = (props: any) => {
  const user = useSelector<RootState, RootState["auth"]>((state) => state.auth);
  const conversation = props?.route?.params?.conversationBuilder;
  return (
    <View style={{ flex: 1 }}>
      <Talkjs.Session
        appId={Constants.manifest!.extra!.APP_ID}
        me={{
          ...user,
          id: user._id!,
          name: user.first_name + " " + user.last_name,
        }}
      >
        <Talkjs.Chatbox conversationBuilder={conversation} />
      </Talkjs.Session>
    </View>
  );
};

export default ChatBox;

const styles = StyleSheet.create({});
