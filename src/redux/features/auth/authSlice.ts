import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    dob: string | null;
    email: string;
    provider_id: string | null;
    avatar: string | null;
    role: string;
    gender: string | null;
    account_status: number;
    is_deleted: number;
}

type AuthState = {
    token: string | null;
    user: User | null;
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
            action: PayloadAction<{ token: string; user: User }>
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