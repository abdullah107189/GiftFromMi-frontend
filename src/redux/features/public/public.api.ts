import { baseApi } from "@/redux/baseApi";

export const landingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        langdingApi: builder.query({
            query: () => ({
                url: `/landing-page?product=all&product_limit=3&review_limit=6&faq_limit=8`,
            }),
            transformResponse: (res) => res.data,
        }),
        categoryList: builder.query({
            query: () => ({
                url: `/category`,
            }),
            transformResponse: (res) => res.data,
        }),
        categorizedProduct: builder.query({
            query: () => ({
                url: `/categorized-product`,
            }),
            transformResponse: (res) => res.data,
        }),
        productDetails: builder.query({
            query: (id: number | string) => ({
                url: `/product-details/${id}`,
            }),
            transformResponse: (res) => res.data,
        }),
    })
});

export const { useLangdingApiQuery, useCategoryListQuery, useCategorizedProductQuery, useProductDetailsQuery } = landingApi;