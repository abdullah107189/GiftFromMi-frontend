import { baseApi } from "@/redux/baseApi";
import type {
  CustomerOrder,
  CustomerOrderDetails,
  CustomerOrderDetailsResponse,
  CustomerOrdersResponse,
  OrderInvoice,
  OrderInvoiceResponse,
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
    getOrderInvoice: builder.query<OrderInvoice, number>({
      query: (id) => ({
        url: `/order/invoice/${id}`,
        method: "GET",
      }),
      transformResponse: (res: OrderInvoiceResponse) => res.data,
    }),

    exportOrder: builder.query<string, number>({
      query: (id) => ({
        url: `/order/${id}/export`,
        method: "GET",
        responseHandler: "text",
      }),
    }),
    cancleOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useGetOrderInvoiceQuery,
  useLazyGetOrderInvoiceQuery,
  useExportOrderQuery,
  useLazyExportOrderQuery,
  useCancleOrderMutation,
} = orderApi;
