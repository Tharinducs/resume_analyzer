import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ref } from "process";

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
    refreshToken: builder.mutation({
      query: (userId) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: { userId },
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGoogleLoginMutation, useRefreshTokenMutation, useGetMeQuery } = authApi;