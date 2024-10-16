import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { AuthRoutes } from "../interfaces-submodule/enums/routes/auth-routes.enum";
import { ILoginRequestDTO } from "../interfaces-submodule/interfaces/dto/auth/iadmin-login-request.interface";
import { ILoginResponseDTO } from "../interfaces-submodule/interfaces/dto/auth/ilogin-response.interfaces";
import { RootState } from "./store";

axios.defaults.baseURL = 'https://trainee-api.chat.abcloudz.com';
const logInUrl = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`;
const refreshUrl = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`;

export const logIn = createAsyncThunk<ILoginResponseDTO, ILoginRequestDTO, { rejectValue: string}>(
    "auth/login",
    async (credentials: ILoginRequestDTO, thunkAPI) => {
        try {
            const res = await axios.post(logInUrl, credentials);
            return res.data.data
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
            const res = await axios.put(refreshUrl, { token });
            return res.data.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

