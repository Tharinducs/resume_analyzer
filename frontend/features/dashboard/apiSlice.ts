import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { DashboardResponse, ActivityHistoryResponse, SearchResponse } from "@/types/dashboard";

export const dashboardApi = createApi({
    reducerPath: "dashboard",
    baseQuery: baseQuery,
    tagTypes: ["Dashboard"],
    endpoints: (builder) => ({
        getDashboardData: builder.query<DashboardResponse, { userId: string }>({
            query: ({ userId }) => ({
                url: `/dashboard/${userId}`,
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        getActivityHistory: builder.query<ActivityHistoryResponse, { userId: string; page: number; limit?: number }>({
            query: ({ userId, page, limit = 10 }) => ({
                url: `/dashboard/${userId}/activity?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        globalSearch: builder.query<SearchResponse, string>({
            query: (q) => ({ url: `/search?q=${encodeURIComponent(q)}`, method: "GET" }),
        }),
    }),
});

export const { useGetDashboardDataQuery, useGetActivityHistoryQuery, useGlobalSearchQuery } = dashboardApi;
