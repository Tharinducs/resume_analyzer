import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { ExtractedInfo, ResumeListParams, ResumeListResponse } from "@/types/resume";

export const resumeApi = createApi({
    reducerPath: 'resume',
    baseQuery: baseQuery,
    tagTypes: ["Resumes"],
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: ({ file, title, userId }) => {
                const formData = new FormData();
                formData.append('resume', file);
                formData.append('userId', userId);
                formData.append('title', title);

                return {
                    url: '/resume/upload',
                    method: 'POST',
                    body: formData,
                    timeout: 120000,
                };
            },
            invalidatesTags: ["Resumes"],
        }),
        getResumesListByUser: builder.query<ResumeListResponse, ResumeListParams>({
            query: ({ userId, page = 1, limit = 9, status = "all", search = "" }) => ({
                url: `/resume/list/${userId}`,
                method: 'GET',
                params: {
                    page,
                    limit,
                    ...(status !== "all" && { status }),
                    ...(search.trim() && { search: search.trim() }),
                },
            }),
            providesTags: ["Resumes"],
        }),
        getResumeById: builder.query({
            query: (resumeId) => ({
                url: `/resume/${resumeId}`,
                method: 'GET',
            }),
             providesTags: ["Resumes"],
        }),
        deleteResumeById: builder.mutation({
            query: (resumeId) => ({
                url: `/resume/delete/${resumeId}`,
                method: 'DELETE',
            }),
             invalidatesTags: ["Resumes"],
        }),
        downloadResumeById: builder.query({
            query: (resumeId) => ({
                url: `/resume/download/${resumeId}`,
                method: 'GET',
                responseHandler: (response) => response.blob(),
            }),
        }),
        updateResumeExtractedData: builder.mutation<
            { resume: any },
            { resumeId: string; extractedData: ExtractedInfo }
        >({
            query: ({ resumeId, extractedData }) => ({
                url: `/resume/update/${resumeId}`,
                method: 'PATCH',
                body: { extractedData },
            }),
            invalidatesTags: ["Resumes"],
        }),
    })
})

export const {
    useUploadFileMutation,
    useGetResumesListByUserQuery,
    useGetResumeByIdQuery,
    useDeleteResumeByIdMutation,
    useLazyDownloadResumeByIdQuery,
    useUpdateResumeExtractedDataMutation,
} = resumeApi;