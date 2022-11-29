import * as TalkRn from "@talkjs/expo";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SafeView from "../../components/SafeView";
import { RootState } from "../../store";
const Chats = (props: any) => {
  const user = useSelector<RootState, RootState["auth"]>((state) => state.auth);

  const onSelectConversation = (event: any) => {
    props.navigation.navigate("Chat-Box", {
      conversationBuilder: event.conversation,
    });
  };

  return (
    <SafeView>
      <TalkRn.Session
        appId={Constants.manifest!.extra!.APP_ID}
        me={{
          ...user,
          id: user._id!,
          name: user.first_name + " " + user.last_name,
        }}
      >
        <TalkRn.ConversationList onSelectConversation={onSelectConversation} />
      </TalkRn.Session>
    </SafeView>
  );
};

export default Chats;

const styles = StyleSheet.create({});
