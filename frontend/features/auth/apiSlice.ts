import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
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
    logoutAPI: builder.mutation({
      query: (userId: string) => ({
        url: '/auth/logout',
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

export const { useGoogleLoginMutation, useRefreshTokenMutation, useGetMeQuery, useLogoutAPIMutation } = authApi;