import {
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/supabaseClient";

type UserInfo = {
  userId: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  isUserAuthorized: boolean;
};

const initialState: UserInfo = {
  userId: "",
  email: "",
  fullName: "",
  isEmailVerified: false,
  isUserAuthorized: false,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      updateUserAuthInfo.fulfilled,
      (state, action: PayloadAction<User | null>) => {
        state.isUserAuthorized = !!action.payload;
        state.isEmailVerified = !!action.payload?.email_confirmed_at;

        state.userId = action.payload?.id ?? "";
        state.email = action.payload?.email ?? "";
        state.fullName = action.payload?.user_metadata.full_name ?? "";
      }
    );
  },
});

export const updateUserAuthInfo: AsyncThunk<User | null, void, {}> =
  createAsyncThunk("userInfo/getUser", async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  });

export default userSlice.reducer;
