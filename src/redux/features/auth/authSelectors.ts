import type { RootState } from "@/redux/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth.token);
