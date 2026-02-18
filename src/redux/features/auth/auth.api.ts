import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/register",
                method: "POST",
                data: userInfo, headers: {
                    "Content-Type": "multipart/form-data"
                },
            }),
            invalidatesTags: ["USERS"],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                data: credentials,
            }),
            transformResponse: (res) => res.data,
            invalidatesTags: ["USERS"],
        }),
        getMe: builder.query({
            query: () => ({
                url: "users/me",
                method: "GET",
            }),
            providesTags: ["USERS"],
            transformResponse: (res) => res.data,
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["USERS"],
        }),
        updateProfile: builder.mutation({
            query: (updateInfo) => ({
                url: "users/updateOwnProfile",
                method: "PATCH",
                data: updateInfo,
            }),
            invalidatesTags: ["USERS"],
        }),

        changePassword: builder.mutation({
            query: (passwordData: {
                currentPassword: string;
                newPassword: string;
            }) => ({
                url: "users/change-password",
                method: "PATCH",
                data: passwordData,
            }),
            invalidatesTags: ["USERS"],
        }),
    }),
});
export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery,
    useLogoutMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
} = authApi;
