import { baseApi } from "@/redux/baseApi";

const clientsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getAllClients: builder.query({
            query: () => ({ url: "/clients", method: "GET" }),
            providesTags: ["CLIENTS"],
            transformResponse: (res) => res,
        }),
        addClient: builder.mutation({
            query: (data) => ({
                url: "/client/store",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["CLIENTS"],
        }),
    })
})