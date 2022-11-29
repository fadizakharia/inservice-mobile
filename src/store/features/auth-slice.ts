import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAuthState } from "../types/auth";
const authState: Partial<IAuthState> = {
  first_name: "",
  last_name: "",
  username: "",
  auth_type: "",
  date_of_birth: undefined,
  profilePicture: "",
  _id: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setUser: (
      state: Partial<IAuthState>,
      action: PayloadAction<Partial<IAuthState>>
    ) => {
      state.auth_type = action.payload.auth_type;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.username = action.payload.username;
      state._id = action.payload._id;
      state.profilePicture = action.payload.profilePicture;
      state.date_of_birth = action.payload.date_of_birth;
    },
    clearUser: (state: Partial<IAuthState>) => {
      state.auth_type = "";
      state.first_name = "";
      state.last_name = "";
      state.username = "";
      state._id = "";
      state.profilePicture = "";
      state.date_of_birth = undefined;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const auth = (state: RootState) => state.auth;
export default authSlice.reducer;
