// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../util/index";

// export const LoginService = createApi({
//     reducerPath: "LoginService",
//     baseQuery: fetchBaseQuery({
//       baseUrl: BASE_URL,
//       prepareHeaders: (headers) => {
//         const token = localStorage?.getItem("Token");
//         if (token) {
//           headers.set("Authorization", `Bearer ${token}`);
//         }
//         // headers.set('Content-Type', 'application/json');
//         return headers;
//       },
//     }),
//     // tagType: ["register", "finish","active"],
//     endpoints: (build) => ({
//       userSign: build.mutation({
//         query: (data) => ({
//           url: `auth/register`,
//           method: "POST",
//           body: data,
//         }),
//       }),
//     }),
// });