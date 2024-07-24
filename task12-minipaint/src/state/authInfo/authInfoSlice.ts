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
  isLoading: boolean;
};

const initialState: UserInfo = {
  userId: "",
  email: "",
  fullName: "",
  isEmailVerified: false,
  isUserAuthorized: false,
  isLoading: false,
};

type AuthToken = {
  access_token: string;
  user: User;
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsAuthorized: (state) => {
      let value = localStorage.getItem("sb-ogrnbqbiqeaxnsctflaz-auth-token");

      if (value) {
        state.isUserAuthorized = true;
        const parsedValue = JSON.parse(value) as AuthToken;
        if (value !== null) {
          state.userId = parsedValue.user.id;
        }
      }
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

export const { setIsLoading, setIsAuthorized } = userSlice.actions;

export default userSlice.reducer;
