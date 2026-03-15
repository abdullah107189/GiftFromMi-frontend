import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Users
    getAllUsers: builder.query({
      query: () => ({ url: "/users", method: "GET" }),
      providesTags: ["USERS"],
      transformResponse: (res) => res,
    }),

    getSingleUser: builder.query({
      query: () => ({ url: "/user-detail", method: "GET" }),
      providesTags: ["USERS"],
      transformResponse: (res) => res,
    }),

    userChangePassword: builder.mutation({
      query: (credentials) => ({
        url: "/change-password",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS"],
    }),

    userProfileUpdate: builder.mutation({
      query: (credentials) => ({
        url: "/profile/update",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS"],
    }),

    userAvaterUpload: builder.mutation({
      query: (credentials) => ({
        url: "/profile-avatar-upload",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS"],
    }),
    
    userAvaterRemove: builder.mutation({
      query: (credentials) => ({
        url: "/profile-avatar-remove",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS"],
    })
  }),
});
export const { useGetAllUsersQuery } = adminApi;
