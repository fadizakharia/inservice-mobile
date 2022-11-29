import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Constants from "expo-constants";
import { IService, nearbyServices } from "../../types/services";
const myService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.manifest!.extra!.BASE_URL,
    credentials: "include",
  }),
  reducerPath: "myService",

  endpoints: (build) => ({
    getNearbyServices: build.query<nearbyServices, string>({
      query: (arg) => ({
        url: `/services/?${arg}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    loadService: build.query<Partial<IService>, undefined>({
      query: () => ({
        url: "/services/sp",
        method: "GET",
        credentials: "include",
      }),
    }),
    createService: build.mutation<Partial<IService>, Partial<IService>>({
      query: (arg) => ({
        url: "/services/sp",
        method: "POST",
        body: { ...arg },
        credentials: "include",
      }),
    }),
    updateService: build.mutation<{ status: boolean }, Partial<IService>>({
      query: (arg) => ({
        url: "/services/sp",
        method: "PUT",
        credentials: "include",
        body: { ...arg },
      }),
    }),
  }),
});

export const {
  useGetNearbyServicesQuery,
  useLazyGetNearbyServicesQuery,
  useCreateServiceMutation,
  useLazyLoadServiceQuery,
  useLoadServiceQuery,
  useUpdateServiceMutation,
} = myService;
export default myService;
