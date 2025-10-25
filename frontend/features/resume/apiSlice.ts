import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const resumeApi = createApi({
    reducerPath: 'resume',
    baseQuery: baseQuery,
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
                };
            },
        }),
    })
})

export const { useUploadFileMutation } = resumeApi;