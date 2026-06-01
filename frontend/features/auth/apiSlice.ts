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
    emailLogin: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
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
    updateMe: builder.mutation({
      query: (body) => ({
        url: '/auth/me',
        method: 'PATCH',
        body,
      }),
    }),
    uploadPicture: builder.mutation<{ code: string; user: Record<string, unknown> }, FormData>({
      query: (formData) => ({
        url: '/auth/me/picture',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useGoogleLoginMutation, useEmailLoginMutation, useRefreshTokenMutation, useGetMeQuery, useLogoutAPIMutation, useUpdateMeMutation, useUploadPictureMutation } = authApi;