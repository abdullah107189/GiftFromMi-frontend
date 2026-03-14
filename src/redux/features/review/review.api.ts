import { baseApi } from "@/redux/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allReviews: builder.query({
            query: (productId) => ({ url: `/review/${productId}`, method: "GET" }),
            providesTags: ["REVIEWS"],
            transformResponse: (res) => res,
        }),
        myReviews: builder.query({
            query: () => ({ url: "/review/my-reviews", method: "GET" }),
            providesTags: ["REVIEWS"],
            transformResponse: (res) => res,
        }),
        createReview: builder.mutation({
            query: (data) => ({ url: "/review/store", method: "POST", data }),
            transformResponse: (res) => res,
            invalidatesTags: (_result, _error, data) => [
                "REVIEWS",
                { type: "PRODUCT", id: data?.product_id },
            ],
        }),
        updateReview: builder.mutation({
            query: ({ id, data }) => ({
                url: `/review/update/${id}`,
                method: "PATCH",
                data,
            }),
            transformResponse: (res) => res,
            invalidatesTags: (_result, _error, arg) => [
                "REVIEWS",
                { type: "PRODUCT", id: arg?.data?.product_id },
            ],
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({ url: `/review/destroy/${id}`, method: "DELETE" }),
            transformResponse: (res) => res,
            invalidatesTags: (_result, _error, arg) => [
                "REVIEWS",
                { type: "PRODUCT", id: arg?.product_id },
            ],
        }),
    }),
});

export const {
    useAllReviewsQuery,
    useMyReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
