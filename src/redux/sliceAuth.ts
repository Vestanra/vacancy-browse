import { createSlice } from "@reduxjs/toolkit";
import { AccountRole } from "../interfaces-submodule/enums/account/account-role.enum";
import { AccountStatus } from "../interfaces-submodule/enums/account/account-status.enum";
import { AccountTypeAuth } from "../interfaces-submodule/enums/account/account-type-auth.enum";
import { logIn, logOut, refreshUser } from "./operationsAuth";
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
    error: null | string | undefined;
}

const initialState: AuthState = {
    loginData: userData,
    isAuth: false,
    loading: false,
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
                state.error = null;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isAuth = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.loginData = action.payload.account;
                state.isAuth = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(refreshUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.loginData = userData;
                state.isAuth = false;
                state.loading = false;
                state.error = null;
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
