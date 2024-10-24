import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATH } from "../util/index";

export const TestService = createApi({
  reducerPath: "TestService",
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
    testUser: build.query({
      query: (data) => "api/v1/test-user",
    }),

    activeTest: build.query({
      query: (data) => "api/v1/test-active",
    }),

    testCompleted: build.query({
      query: () => "api/v1/test-completed",
      // providesTags: ["finish"],
    }),

    pendingTest: build.query({
      query: () => "api/v1/active-test",
      // providesTags: ["register", "finish"],
    }),
    
    testRegister: build.mutation({
      query: (id) => ({
        url: `api/v1/test/${id}`,
        method: "POST",
      }),
      // invalidatesTags: ["active"],
    }),
    
  }),
});

export const {
  useTestUserQuery,
  useActiveTestQuery,
  useTestCompletedQuery,
  usePendingTestQuery,
  useTestRegisterMutation,
} = TestService;
