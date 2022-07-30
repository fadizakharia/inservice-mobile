import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";
import authApi from "./features/services/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(authApi.middleware),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
