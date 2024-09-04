import { authApi } from "@/api/auth";
import { memberApi } from "@/api/member";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MemberResponse = {
  id: "",
  fullName: "",
  createdAt: "",
  elo: 0,
  email: "",
  role: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        memberApi.endpoints.getInfo.matchFulfilled,
        (state, { payload }) => {
          return { ...state, ...payload };
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
        return initialState;
      });
  },
});

export default userSlice.reducer;
