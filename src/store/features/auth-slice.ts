import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAuthState, USER_PAYLOAD } from "../types/auth";
const authState: IAuthState = {
  first_name: "",
  last_name: "",
  username: "",
  auth_type: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setUser: (state: IAuthState, action: PayloadAction<USER_PAYLOAD>) => {
      state.auth_type = action.payload.auth_type;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.username = action.payload.username;
    },
    clearUser: (state: IAuthState) => {
      state = authState;
    },
  },
});

export const { setUser } = authSlice.actions;
export const auth = (state: RootState) => state.auth;
export default authSlice.reducer;
