import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATH } from "../util/index";

export const PracticeService = createApi({
  reducerPath: "PracticeService",
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

    availablePractice: build.query({
      query: () => `api/v1/practice`,
    }),

    searchPracticeTest: build.query({
      query: ({ search, searchCurrentPageNo }) =>
        `/api/v1/search-practice-test?pageNo=${searchCurrentPageNo}${
          search.length === 0 ? "" : `&search=${search}`
        }`,
    }),
    
  }),
});

export const { useAvailablePracticeQuery, useSearchPracticeTestQuery } =
  PracticeService;
