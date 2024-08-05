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
  isUserAuthorized: boolean;
  isLoading: boolean;
};

const initialState: UserInfo = {
  userId: "",
  email: "",
  fullName: "",
  isUserAuthorized: false,
  isLoading: true,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAuthInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserAuthInfo.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isUserAuthorized = !!action.payload;
          state.userId = action.payload?.id ?? "";
          state.email = action.payload?.email ?? "";
          state.fullName = action.payload?.user_metadata.full_name ?? "";
          state.isLoading = false;
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
