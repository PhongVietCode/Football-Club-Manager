import { authApi } from "@/api/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthSlice = {
  token: string;
  isAuth: boolean;
};
const initialState: AuthSlice = {
  token: "",
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthSlice>) => {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          return { ...state, token: payload.token };
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        return { ...state, token: "" };
      })
      .addMatcher(
        authApi.endpoints.introspectToken.matchFulfilled,
        (state, { payload }) => {
          if (!payload.valid) {
            return { ...state, token: "" };
          }
          return { ...state, isAuth: payload.valid };
        }
      );
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
