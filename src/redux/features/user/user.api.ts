import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Current user and admin user endpoints live here.
    getAllUsers: builder.query({
      query: () => ({ url: "/users", method: "GET" }),
      providesTags: ["USERS"],
      transformResponse: (res) => res,
    }),

    getSingleUser: builder.query({
      query: () => ({ url: "/user-detail", method: "GET" }),
      providesTags: ["USERS", "PROFILE"],
      transformResponse: (res) => res,
    }),

    userChangePassword: builder.mutation({
      query: (credentials) => ({
        url: "/change-password",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS", "PROFILE"],
    }),

    userProfileUpdate: builder.mutation({
      query: (credentials) => ({
        url: "/profile/update",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS", "PROFILE"],
    }),

    userAvaterUpload: builder.mutation({
      query: (credentials) => ({
        url: "/profile-avatar-upload",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS", "PROFILE"],
    }),

    userAvaterRemove: builder.mutation({
      query: (credentials) => ({
        url: "/profile-avatar-remove",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["USERS", "PROFILE"],
    }),
  }),
});
export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUserChangePasswordMutation,
  useUserProfileUpdateMutation,
  useUserAvaterUploadMutation,
  useUserAvaterRemoveMutation,
} = userApi;
