import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
const baseURI = import.meta.env.VITE_BACKEND_API_URL as string; // const makeApiCall = async (url: string, method: string,body: any, customHeaders: any) : Promise<any> => {
//   try {
//     const constructedURL = `${baseURI}/${url}`
//     const response = await api.
//   } catch (error: any) {

//   }
// }

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURI}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status == 401) {
    console.log("phong")
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Members", "Auth", "Matches"],
  endpoints: () => ({}),
});
