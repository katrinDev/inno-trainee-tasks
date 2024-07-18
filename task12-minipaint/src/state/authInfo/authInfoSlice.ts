import {
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../supabase/supabaseClient";

type UserInfo = {
  session: Session | null;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  isUserAuthorized: boolean;
  isLoading: boolean;
};

const initialState: UserInfo = {
  session: null,
  email: "",
  fullName: "",
  isEmailVerified: false,
  isUserAuthorized: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAuthInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserAuthInfo.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isUserAuthorized = !!action.payload;
          state.isEmailVerified = !!action.payload?.email_confirmed_at;
          state.email = action.payload?.email ?? "";
          state.fullName = action.payload?.user_metadata.full_name ?? "";
          state.isLoading = false;
        }
      );
  },
});

export const updateUserAuthInfo: AsyncThunk<User | null, void, {}> =
  createAsyncThunk("session/getSession", async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  });

export const { setSession } = userSlice.actions;

export default userSlice.reducer;
