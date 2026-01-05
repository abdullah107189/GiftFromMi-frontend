import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Users
    getAllUsers: builder.query({
      query: () => ({ url: "/users", method: "GET" }),
      providesTags: ["USERS"],
      transformResponse: (res) => res,
    }),
  }),
});
export const { useGetAllUsersQuery } = adminApi;
