import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import {
  JobKeywordExtractionResult,
  MatchResumeResponse,
  PendingComparisonListResponse,
  PendingComparisonResponse,
} from "@/types/jobAnalyzer";

type ExtractKeywordsArg = FormData | { text: string };

export const jobAnalyzerApi = createApi({
  reducerPath: "jobAnalyzer",
  baseQuery,
  tagTypes: ["PendingComparisons"],
  endpoints: (builder) => ({
    extractJobKeywords: builder.mutation<JobKeywordExtractionResult, ExtractKeywordsArg>({
      query: (body) => {
        if (body instanceof FormData) {
          return { url: "/job-analyze/extract-keywords", method: "POST", body, formData: true };
        }
        return { url: "/job-analyze/extract-keywords", method: "POST", body };
      },
    }),
    matchResumeWithJob: builder.mutation<MatchResumeResponse, { jobAnalysisId: string; resumeId: string }>({
      query: (body) => ({
        url: "/job-analyze/match-resume",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PendingComparisons"],
    }),
    getPendingComparisons: builder.query<PendingComparisonListResponse, void>({
      query: () => ({ url: "/job-analyze/pending-comparisons", method: "GET" }),
      providesTags: ["PendingComparisons"],
    }),
    addPendingComparison: builder.mutation<
      PendingComparisonResponse,
      { jobAnalysisId: string; jobTitle: string; resumeId: string; resumeTitle: string }
    >({
      query: (body) => ({ url: "/job-analyze/pending-comparisons", method: "POST", body }),
      invalidatesTags: ["PendingComparisons"],
    }),
    removePendingComparison: builder.mutation<{ code: string; message: string }, string>({
      query: (id) => ({ url: `/job-analyze/pending-comparisons/${id}`, method: "DELETE" }),
      invalidatesTags: ["PendingComparisons"],
    }),
  }),
});

export const {
  useExtractJobKeywordsMutation,
  useMatchResumeWithJobMutation,
  useGetPendingComparisonsQuery,
  useAddPendingComparisonMutation,
  useRemovePendingComparisonMutation,
} = jobAnalyzerApi;
