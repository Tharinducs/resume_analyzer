import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

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
        getResumesListByUser: builder.query({
            query: (userId) => ({
                url: `/resume/list/${userId}`,
                method: 'GET',
            }),
            providesTags: ["Resumes"],
        }),
        
    })
})

export const { useUploadFileMutation, useGetResumesListByUserQuery } = resumeApi;