import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATH } from "../util/index";

export const QuestionService = createApi({
    reducerPath: "ProfileService",
    baseQuery: fetchBaseQuery({
      baseUrl: PATH.BASE_URL,
      prepareHeaders: (headers) => {
        const token = localStorage?.getItem("Token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        // headers.set('Content-Type', 'application/json');
        return headers;
      },
    }),
    // tagType: ["register", "finish","active"],
    endpoints: (build) => ({
      createQuestionSet: build.mutation({
        query: (data) => ({
          url: `api/v1/question-set`,
          method: "POST",
          body: data,
        }),
      }),
    }),
});

export const {useCreateQuestionSetMutation}=QuestionService;