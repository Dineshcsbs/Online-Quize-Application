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
      userInformation:build.query({
        query:({search,searchCurrentPageNo})=>`api/v1/all-user-info?pageNo=${searchCurrentPageNo}${search.length===0?"":`&search=${search}`}`,

      }),
      userInfoData:build.query({
        query:(id)=>`api/v1/retrieve-user-info/${id}`
      })
    }),
});

export const {useUpdateUserMutation,useUpdateAdminMutation,useUserInformationQuery,useUserInfoDataQuery }=ProfileService;