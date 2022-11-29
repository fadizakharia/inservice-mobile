import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Constants from "expo-constants";
import { error } from "../../../util/error";
import { IAuthState } from "../../types/auth";
const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.manifest!.extra!.BASE_URL,
    credentials: "include",
  }),
  reducerPath: "authApi",

  endpoints: (build) => ({
    login: build.mutation<
      Partial<IAuthState>,
      { username: string; password: string }
    >({
      query: (arg) => ({
        url: "auth/local",
        method: "POST",
        body: {
          username: arg.username,
          password: arg.password,
        },
        credentials: "include",
      }),
    }),
    signup: build.mutation<
      IAuthState & error,
      {
        username: string;
        password: string;
        first_name: string;
        last_name: string;
        auth_type: string;
        isProvider: boolean;
        date_of_birth: Date;
      }
    >({
      query: (arg) => ({
        url: "auth/local/signup",
        method: "POST",
        body: arg,
        credentials: "include",
      }),
    }),
    currentUser: build.query<Partial<IAuthState>, void>({
      query: () => ({
        url: "auth/",
        credentials: "include",
        method: "GET",
      }),
    }),
    logout: build.mutation<{ status: boolean }, undefined>({
      query: () => ({
        url: `auth/`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export default authApi;
export const {
  useLoginMutation,
  useSignupMutation,
  useLazyCurrentUserQuery,
  useCurrentUserQuery,
  useLogoutMutation,
} = authApi;
