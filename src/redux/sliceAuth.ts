import { createSlice } from "@reduxjs/toolkit";
import { AccountRole } from "../interfaces-submodule/enums/account/account-role.enum";
import { AccountStatus } from "../interfaces-submodule/enums/account/account-status.enum";
import { AccountTypeAuth } from "../interfaces-submodule/enums/account/account-type-auth.enum";
import { logIn, logOut, recoverUser, refreshUser } from "./operationsAuth";
import { IAccountDTO } from "../interfaces-submodule/interfaces/dto/account/iaccount.interface";

const userData: IAccountDTO = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    status: AccountStatus.Invited,
    typeAuth: AccountTypeAuth.LOCAL,
    accountRole: AccountRole.User,
};

export interface AuthState {
    loginData: IAccountDTO;
    isAuth: boolean;
    loading: boolean;
    isRefreshing: boolean,
    error: null | string | undefined;
}

const initialState: AuthState = {
    loginData: userData,
    isAuth: false,
    loading: false,
    isRefreshing: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.loginData = action.payload.account;
                state.isAuth = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(logIn.pending, state => {
                state.loading = true;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isAuth = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(recoverUser.fulfilled, (state, action) => {
                state.loginData = action.payload;
                state.isAuth = true;
                state.loading = false;
                state.error = null;
                state.isRefreshing = false;
            })
            .addCase(recoverUser.pending, state => {
                state.loading = true;
                state.isRefreshing = true;
            })
            .addCase(recoverUser.rejected, (state) => {
                state.loginData = userData;
                state.isAuth = false;
                state.loading = false;
                state.error = null;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.loginData = action.payload.account;
                state.isAuth = true;
                state.loading = false;
                state.error = null;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.pending, state => {
                state.loading = true;
                state.isRefreshing = true;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.loginData = userData;
                state.isAuth = false;
                state.loading = false;
                state.error = null;
                state.isRefreshing = false;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.loginData = userData;
                state.isAuth = false;
                state.loading = false;
                state.error = null;
            })
    }
});

export const authReducer = authSlice.reducer;