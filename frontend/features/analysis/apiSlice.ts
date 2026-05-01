import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const analysisApi = createApi({
    reducerPath: 'analysis',
    baseQuery: baseQuery,
    tagTypes: ["Resumes"],
    endpoints: (builder) => ({
        analyzeResume: builder.mutation({
            query: ({ resumeId, userId }) => {
                return {
                    url: `/analyze/${resumeId}`,
                    method: 'POST',
                    body: { userId },
                    timeout: 120000,
                };
            },
        })
    })
})

export const {  useAnalyzeResumeMutation } = analysisApi;