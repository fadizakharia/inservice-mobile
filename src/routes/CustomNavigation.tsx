import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/";
import { setUser } from "../store/features/auth-slice";
import { useLazyCurrentUserQuery } from "../store/features/services/auth";
import { IAuthState } from "../store/types/auth";
import AppBottomNavigation from "./AppBottomNavigation";
import OnBoardingStack from "./OnBoardingNavigation";

const CustomNavigation = () => {
  const [fetch, { data }] = useLazyCurrentUserQuery(undefined);
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
  }, [JSON.stringify(data)]);
  console.log(auth);

  return !Boolean(auth.username) ? (
    <OnBoardingStack />
  ) : (
    <AppBottomNavigation />
  );
};

export default CustomNavigation;
