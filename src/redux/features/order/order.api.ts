import { baseApi } from "@/redux/baseApi";
import type {
  CustomerOrder,
  CustomerOrderDetails,
  CustomerOrderDetailsResponse,
  CustomerOrdersResponse,
} from "@/types/orders";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query<CustomerOrder[], void>({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      transformResponse: (res: CustomerOrdersResponse) => res.data,
    }),
    getSingleOrder: builder.query<CustomerOrderDetails, number>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      transformResponse: (res: CustomerOrderDetailsResponse) => res.data,
    }),
  }),
});

export const { useGetAllOrderQuery, useGetSingleOrderQuery } = orderApi;
