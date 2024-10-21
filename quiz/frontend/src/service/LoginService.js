import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../util/UserDetail";

export const LoginService = createApi({
  reducerPath: "LoginService",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage?.getItem("Token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagType: ["register", "finish","active"],
  endpoints: (build) => ({
    userSign: build.mutation({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),

    userData: build.query({
      query: (data) => "api/v1/user-info",
    }),

    testUser: build.query({
      query: (data) => "api/v1/test-user",
    }),
    activeTest: build.query({
      query: (data) => "api/v1/test-active",
    }),
    availablePractice: build.query({
      query: () => `api/v1/practice`,
    }),
    questionSet: build.query({
      query: (id) => `api/v1/test-set-question/${id}`,
    }),
    mark: build.mutation({
      query: ({ id, data }) => ({
        url: `api/v1/mark/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the correct Content-Type
        },
        body: JSON.stringify(data),
        invalidatesTags: ["finish"],
      }),
    }),
    testCompleted: build.query({
      query: () => "api/v1/test-completed",
      providesTags: ["finish"],
    }),
    pendingTest: build.query({
      query: () => "api/v1/active-test",
      providesTags: ["register", "finish"],
    }),

    retriveAnswer: build.query({
      query: (id) => `api/v1/answer/${id}`,
    }),

    // availableTest: build.query({
    //   query: (id) => `api/v1/register`,
    //   providesTags: ["register"],
    // }),

    availableTest: build.query({
      query: (id) => `api/v1/available-register`,
    }),

    registerAssignmentTest: build.query({
      query:({search,searchCurrentPageNo})=>`api/v1/assignment-unregister?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
      
      providesTags: ["active"],
    }),

    registerPracticeTest: build.query({
      query:({search,searchCurrentPageNo})=>`api/v1/test-unregister?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
      providesTags: ["active"],
    }),

    testRegister: build.mutation({
      query: (id) => ({
        url: `api/v1/test/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["active"],
    }),

    averageMark: build.query({
      query: () => "api/v1/average-mark",
    }),

    searchActiveTest: build.query({
      query: ({search,searchCurrentPageNo}) => `/api/v1/search-assignment?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
    }),
    pageActiveTest: build.query({
      query: (pgNo) =>({
        url:`/api/v1/active-test-search?pageNo=${pgNo}`,
        method:"GET",
      }),
    }),

    searchCompletedTest: build.query({
      query: ({search,searchCurrentPageNo}) => `/api/v1/search-completed-test?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
    }),

    searchPracticeTest: build.query({
      query: ({search,searchCurrentPageNo}) => `/api/v1/search-practice-test?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,
    }),

    demoGetQuestion: build.query({
      query: () => ({
        url: "api/v1/question-set",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useUserSignMutation,
  useDemoGetQuestionQuery,
  useUserDataQuery,
  useTestUserQuery,
  useAvailablePracticeQuery,
  useActiveTestQuery,
  useQuestionSetQuery,
  useMarkMutation,
  useTestCompletedQuery,
  usePendingTestQuery,
  useRetriveAnswerQuery,
  useAvailableTestQuery,
  useRegisterAssignmentTestQuery,
  useRegisterPracticeTestQuery,
  useTestRegisterMutation,
  useAverageMarkQuery,
  useSearchActiveTestQuery,
  useSearchCompletedTestQuery,
  useSearchPracticeTestQuery,
  usePageActiveTestQuery,
} = LoginService;
