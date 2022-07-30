import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../store/";
import {
  useCurrentUserQuery,
  useLazyCurrentUserQuery,
} from "../store/features/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/features/auth-slice";
import { IAuthState } from "../store/types/auth";
import OnBoardingStack from "./OnBoardingNavigation";
import AppBottomNavigation from "./AppBottomNavigation";

const CustomNavigation = () => {
  const [fetch, {}] = useLazyCurrentUserQuery(undefined);
  const auth = useSelector<RootState, RootState["auth"]>((root) => root.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const currentUser = await fetch(undefined);
        if (currentUser && currentUser.data) {
          dispatch(setUser(currentUser.data! as IAuthState));
        }
      } catch (err) {
        console.log(err);
      }
    };
    initialLoad();
    return () => {};
  }, []);
  console.log(auth);

  return !Boolean(auth.username) ? (
    <OnBoardingStack />
  ) : (
    <AppBottomNavigation />
  );
};

export default CustomNavigation;
