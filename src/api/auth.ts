import { api } from ".";
import { handleErrorResponse, handleResponse } from "@/common";

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginFormRequest>({
      query: (data) => ({
        url: "/auth/log-in",
        method: "POST",
        body: data,
        withCredentials: true,
      }),
      transformResponse: (response: ApiResponse<LoginResponse>) => {
        return handleResponse<LoginResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      }
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: "/auth/log-out",
        method: "POST",
        withCredentials: true,
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return handleResponse<string>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
      // async onQueryStarted(_id, { dispatch }) {
      //   dispatch(setAuth({ token: "", isAuth: false }));
      // },
    }),
    introspectToken: build.mutation<IntrospectResponse, IntrospectRequest>({
      query: (data) => ({
        url: "/auth/introspect",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<IntrospectResponse>) => {
        return handleResponse<IntrospectResponse>(response);
      },
      transformErrorResponse: (response: ErrorApiResponse) => {
        return handleErrorResponse(response);
      },
    }),
  }),
});
export const { useLoginMutation, useIntrospectTokenMutation, useLogoutMutation } = authApi;
