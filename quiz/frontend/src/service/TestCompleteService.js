import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATH } from "../util/index";

export const TestCompleteService = createApi({
  reducerPath: "TestCompleteService",
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
    searchCompletedTest: build.query({
      query: ({ search, searchCurrentPageNo }) =>
        `/api/v1/search-completed-test?pageNo=${searchCurrentPageNo}${
          search.length === 0 ? "" : `&search=${search}`
        }`,
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

      retriveAnswer: build.query({
        query: (id) => `api/v1/answer/${id}`,
      }),

      averageMark: build.query({
        query: () => "api/v1/average-mark",
      }),

  }),
});

export const{}=TestCompleteService;