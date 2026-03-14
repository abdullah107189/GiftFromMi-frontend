import { baseApi } from "@/redux/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allReviews: builder.query({
            query: () => ({ url: "/review", method: "GET" }),
            providesTags: ["REVIEWS"],
            transformResponse: (res) => res,
        }),
        myReviews: builder.query({
            query: () => ({ url: `/review/my-reviews`, method: "GET" }),
            providesTags: ["REVIEWS"],
            transformResponse: (res) => res,
        }),
        createReview: builder.mutation({
            query: (data) => ({ url: "/review/store", method: "POST", data }),
            transformResponse: (res) => res,
        }),
        updateReview: builder.mutation({
            query: ({ id, data }) => ({ url: `/review/update/${id}`, method: "PATCH", data }),
            transformResponse: (res) => res,
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({ url: `/review/destroy/${id}`, method: "DELETE" }),
            transformResponse: (res) => res,
        }),
    }),
})
export const { useAllReviewsQuery, useCreateReviewMutation, useUpdateReviewMutation } = reviewApi;