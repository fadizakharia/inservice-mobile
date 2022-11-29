import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ILocationState } from "../types/location";
const locationState = {
  longitude: undefined,
  latitude: undefined,
} as ILocationState;
const locationSlice = createSlice({
  name: "auth",
  initialState: locationState,
  reducers: {
    setLocation: (
      state: ILocationState,
      action: PayloadAction<ILocationState>
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.permission_allowed = true;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
