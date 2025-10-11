import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (token: string) => ({
        url: '/auth/provider',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const { useGoogleLoginMutation } = authApi;