import { createSlice } from "@reduxjs/toolkit";
import { AccountRole } from "../interfaces-submodule/enums/account/account-role.enum";
import { AccountStatus } from "../interfaces-submodule/enums/account/account-status.enum";
import { AccountTypeAuth } from "../interfaces-submodule/enums/account/account-type-auth.enum";
import { ILoginResponseDTO } from "../interfaces-submodule/interfaces/dto/auth/ilogin-response.interfaces";
import { logIn, refreshUser } from "./operationsAuth";

const initialAccount: ILoginResponseDTO = {
    access: {
        accessToken: "",
        refreshToken: "",
    },
    account: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        status: AccountStatus.Invited,
        typeAuth: AccountTypeAuth.LOCAL,
        accountRole: AccountRole.User,
    },
};

export interface AuthState {
    loginData: ILoginResponseDTO;
    refreshToken: string;
    loading: boolean;
    error: null | string | undefined;
}

const initialState: AuthState = {
    loginData: initialAccount,
    refreshToken: "",
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.loginData = initialAccount;
            state.refreshToken = "";
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.loginData.access = action.payload.access;
                state.loginData.account = action.payload.account;
                state.refreshToken = action.payload.access.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(logIn.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.loginData.access = action.payload.access;
                state.loginData.account = action.payload.account;
                state.refreshToken = action.payload.access.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(refreshUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
