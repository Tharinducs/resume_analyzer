import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { GeneralAnalysisResponse, aiFeedbackItem } from "@/types/analysis";

export const analysisApi = createApi({
    reducerPath: 'analysis',
    baseQuery: baseQuery,
    tagTypes: ["Analysis"],
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
        }),
        getAnalysisResult: builder.query<GeneralAnalysisResponse, { analysisId: string }>({
            query: ({ analysisId }) => {
                return {
                    url: `/analyze/result/${analysisId}`,
                    method: 'GET',
                    timeout: 120000,
                };
            },
            providesTags: ["Analysis"],
        }),
        updateFeedbackDecisions: builder.mutation<GeneralAnalysisResponse, { analysisId: string; aiFeedback: aiFeedbackItem[] }>({
            query: ({ analysisId, aiFeedback }) => {
                return {
                    url: `/analyze/${analysisId}/feedback`,
                    method: 'PATCH',
                    body: { aiFeedback },
                };
            },
            invalidatesTags: ["Analysis"],
        }),
    })
})

export const { useAnalyzeResumeMutation, useGetAnalysisResultQuery, useUpdateFeedbackDecisionsMutation } = analysisApi;