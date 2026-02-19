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
            invalidatesTags: ["USERS"],
        }),

        verifyOtp: builder.mutation({
            query: (credentials) => ({
                url: "/verify_otp",
                method: "POST",
                data: credentials,
            }),
            transformResponse: (res) => res.data,
            invalidatesTags: ["USERS"],
        }),

        resendOtp: builder.mutation({
            query: (credentials) => ({
                url: "/resend_otp",
                method: "POST",
                data: credentials,
            }),
            transformResponse: (res) => res.data,
            invalidatesTags: ["USERS"],
        }),
        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: "/forgot-password",
                method: "POST",
                data: credentials,
            }),
            transformResponse: (res) => res.data,
            invalidatesTags: ["USERS"],
        }),

        forgotVerifyOtp: builder.mutation({
            query: (credentials) => ({
                url: "/forgot-verify-otp",
                method: "POST",
                data: credentials,
            }),
            transformResponse: (res) => res.data,
            invalidatesTags: ["USERS"],
        }),

        resetPassword: builder.mutation({
            query: (credentials) => ({
                url: "/reset-password",
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
    useVerifyOtpMutation,
    useResendOtpMutation,
    useForgotVerifyOtpMutation,
    useGetMeQuery,
    useLogoutMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
