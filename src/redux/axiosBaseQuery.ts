import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type { RootState } from "./store";
import { logout } from "./features/auth/authSlice";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    { status?: number; data?: unknown }
  > =>
    async ({ url, method, data, params, headers }, api) => {
      try {
        const state = api.getState() as RootState;
        const token = state.auth?.token;

        const result = await axiosInstance({
          url,
          method,
          data,
          params,
          headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        return { data: result.data };
      } catch (error) {
        const err = error as AxiosError;

        // 🔥 AUTO LOGOUT (VERY IMPORTANT)
        if (err.response?.status === 401 || err.response?.status === 403) {
          api.dispatch(logout());
        }

        return {
          error: {
            status: err.response?.status,
            data: err.response?.data ?? err.message,
          },
        };
      }
    };
