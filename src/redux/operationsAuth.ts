import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginRequestDTO } from "../interfaces-submodule/interfaces/dto/auth/iadmin-login-request.interface";
import { ILoginResponseDTO } from "../interfaces-submodule/interfaces/dto/auth/ilogin-response.interfaces";
import { RootState } from "./store";
import { logInRequest, refreshTokenRequest } from "../apiService";

export const logIn = createAsyncThunk<ILoginResponseDTO, ILoginRequestDTO, { rejectValue: string}>(
    "auth/login",
    async (credentials: ILoginRequestDTO, thunkAPI) => {
        try {
            const data = await logInRequest(credentials);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const refreshUser = createAsyncThunk<any, void, { state: RootState, rejectValue: string  }>(
    "auth/refresh",
    async (_: void, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.refreshToken;
        if (token === null || token === "") {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        };
        try {
            const data = await refreshTokenRequest( token );
            return data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

