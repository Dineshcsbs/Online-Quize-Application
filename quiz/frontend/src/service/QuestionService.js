import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATH } from "../util/index";

export const QuestionService = createApi({
    reducerPath: "QuestionService",
    baseQuery: fetchBaseQuery({
      baseUrl: PATH.BASE_URL,
      prepareHeaders: (headers) => {
        const token = localStorage?.getItem("Token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes:['count'],
    endpoints: (build) => ({
      createQuestionSet: build.mutation({
        query: (data) => ({
            url: `api/v1/question-set`,
            method: "POST",
            body: data,
        }),
      }),

      countQuestion: build.query({
        query:(id)=>`api/v1/count-question-set/${id}`,
        providesTags:['count'],
      }),
      createQuestion: build.mutation({
        query: (data)=>({
          url:`api/v1/question`,
          method:'POST',
          body: data,
        }),
        invalidatesTags:['count']
      }),
      questionSetSearch: build.query({
        query:({search,searchCurrentPageNo})=>`api/v1/question-set-search?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
      }),
    }),
});

export const { useCreateQuestionSetMutation,useCountQuestionQuery ,useCreateQuestionMutation,useQuestionSetSearchQuery} = QuestionService;
