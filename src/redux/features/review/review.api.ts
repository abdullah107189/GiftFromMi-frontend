import { baseApi } from "@/redux/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allReviews: builder.query({
            query: () => ({ url: "/review", method: "GET" }),
            providesTags: ["REVIEWS"],
            transformResponse: (res) => res,
        }),
        createReview: builder.mutation({
            query: (data) => ({ url: "/review/store", method: "POST", data }),
            transformResponse: (res) => res,
        })
    }),
})
export const { useAllReviewsQuery } = reviewApi;