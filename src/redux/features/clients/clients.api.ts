import { baseApi } from "@/redux/baseApi";

const clientsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query({
            query: () => ({ url: "/client", method: "GET" }),
            providesTags: ["CLIENTS"],
            transformResponse: (res) => res,
        }),
        addClient: builder.mutation({
            query: (data) => ({
                url: "/client/store",
                method: "POST",
                data,
            }),
            invalidatesTags: ["CLIENTS"],
        }),
        showClient: builder.query({
            query: (id) => ({ url: `/client/show/${id}`, method: "GET" }),
            providesTags: ["CLIENTS"],
            transformResponse: (res) => res,
        }),
        updateClient: builder.mutation({
            query: ({ id, data }) => ({
                url: `/client/update/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["CLIENTS"],
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/client/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CLIENTS"],
        }),
        uploadCSVForAddClient: builder.mutation({
            query: (data) => ({
                url: "/client/upload-csv",
                method: "POST",
                data,
            }),
            invalidatesTags: ["CLIENTS"],
        }),
    }),
});

export const {
    useGetAllClientsQuery,
    useAddClientMutation,
    useShowClientQuery,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useUploadCSVForAddClientMutation,
} = clientsApi;
