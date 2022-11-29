import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";
import locationSlice from "./features/location-slice";
import authApi from "./features/services/auth";
import myService from "./features/services/service";
import eventSlice from "./features/event-slice";
import eventsApi from "./features/services/events";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myService.reducerPath]: myService.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    auth: authSlice,
    location: locationSlice,
    events: eventSlice,
  },
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(
      authApi.middleware,
      myService.middleware,
      eventsApi.middleware
    ),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
