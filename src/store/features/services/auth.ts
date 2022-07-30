import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { error } from "../../../util/error";
import { IAuthState } from "../../types/auth";

const authApi = createApi({
  baseQuery: process.env.REACT_APP_BASE_URL
    ? fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL })
    : fetchBaseQuery({ baseUrl: "https://f00a-185-104-255-78.ngrok.io" }),
  reducerPath: "authApi",

  endpoints: (build) => ({
    login: build.mutation<
      Partial<IAuthState>,
      { username: string; password: string; isProvider: boolean }
    >({
      query: (arg) => ({
        url: "auth/local",
        method: "POST",
        body: {
          username: arg.username,
          password: arg.password,
          isProvider: arg.isProvider,
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
    logout: build.mutation<{ status: boolean }, string>({
      query: (id) => ({
        url: `auth/${id}`,
        method: "DELETE",
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
