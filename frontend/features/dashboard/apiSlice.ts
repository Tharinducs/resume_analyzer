import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { DashboardResponse } from "@/types/dashboard";

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
    }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
