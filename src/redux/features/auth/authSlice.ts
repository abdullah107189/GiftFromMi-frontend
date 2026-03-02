import type { IUser } from "@/types/profile";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type AuthState = {
    token: string | null;
    user: IUser | null;
};

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: IUser }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;