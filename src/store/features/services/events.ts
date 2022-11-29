import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Constants from "expo-constants";
import { addEventArgs, IEvents, updateEventArgs } from "../../types/events";
const eventsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.manifest!.extra!.BASE_URL,
  }),
  reducerPath: "eventsApi",
  tagTypes: ["Events"],
  endpoints: (build) => ({
    getEvents: build.query<{ events: IEvents[]; hasNext: boolean }, string>({
      query: (args) => ({
        url: `/event/?${args}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Events"],
    }),
    updateEvent: build.mutation<{ status: boolean }, updateEventArgs>({
      query: (arg) => ({
        url: `/event/`,
        method: "PUT",
        credentials: "include",
        body: arg,
      }),
      invalidatesTags: ["Events"],
    }),
    addEvent: build.mutation<IEvents, addEventArgs>({
      query: (arg) => ({
        url: "/event/",
        method: "POST",
        credentials: "include",
        body: arg,
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useLazyGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
} = eventsApi;
export default eventsApi;
