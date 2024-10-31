import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PATH } from "../util/index";

export const ProfileService = createApi({
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
      updateUser:build.mutation({
        query:(data)=>({
          url:'api/v1/update',
          method:"PUT",
          body:data,
        })
      }),
      updateAdmin:build.mutation({
        query:(data)=>({
          url:'api/v1/update-admin',
          method:"PUT",
          body:data,
        })
      }),
    }),
});

export const {useUpdateUserMutation,useUpdateAdminMutation}=ProfileService;