import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = import.meta.env.VITE_BACKEND_API_URL as string; // const makeApiCall = async (url: string, method: string,body: any, customHeaders: any) : Promise<any> => {
//   try {
//     const constructedURL = `${baseURI}/${url}`
//     const response = await api.
//   } catch (error: any) {

//   }
// }
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURI}`,
    credentials:"include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // console.log(token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set("Access-Control-Allow-Credentials", "true")
      return headers;
    },
  }),
  tagTypes: ["Members", "Auth", "Matches"],
  endpoints: () => ({}),
});
