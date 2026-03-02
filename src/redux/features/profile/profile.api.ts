import { baseApi } from "@/redux/baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Users
        getProfile: builder.query({
            query: () => ({ url: "/user-detail", method: "GET" }),
            providesTags: ["PROFILE"],
            transformResponse: (res) => res,
        }),
    }),
});
export const { useGetProfileQuery } = profileApi;
