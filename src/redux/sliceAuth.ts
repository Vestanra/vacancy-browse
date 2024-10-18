import { createSlice } from "@reduxjs/toolkit";
import { AccountRole } from "../interfaces-submodule/enums/account/account-role.enum";
import { AccountStatus } from "../interfaces-submodule/enums/account/account-status.enum";
import { AccountTypeAuth } from "../interfaces-submodule/enums/account/account-type-auth.enum";
import { logIn, refreshUser } from "./operationsAuth";
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
    refreshToken: string;
    accessToken: string,
    loading: boolean;
    error: null | string | undefined;
}

const initialState: AuthState = {
    loginData: userData,
    refreshToken: "",
    accessToken: "",
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.loginData = userData;
            state.refreshToken = "";
            state.accessToken = "";
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.loginData = action.payload.account;
                state.refreshToken = action.payload.access.refreshToken;
                state.accessToken = action.payload.access.accessToken;
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
                state.loginData = action.payload.account;
                state.refreshToken = action.payload.access.refreshToken;
                state.accessToken = action.payload.access.accessToken;
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
export const { logOut } = authSlice.actions;
