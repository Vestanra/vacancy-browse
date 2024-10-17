import axios from "axios";
import { ILoginRequestDTO } from "./interfaces-submodule/interfaces/dto/auth/iadmin-login-request.interface";
import { BaseRoutes } from "./interfaces-submodule/enums/routes/base-routes.enum";
import { AuthRoutes } from "./interfaces-submodule/enums/routes/auth-routes.enum";

const api = axios.create({
    baseURL: 'https://trainee-api.chat.abcloudz.com',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const logInRequest = async (credentials: ILoginRequestDTO) => {
    const logInUrl = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`;
    const response = await api.post(logInUrl, credentials);
    return response.data.data;
};

export const refreshTokenRequest = async (token: string) => {
    const refreshUrl = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`;
    const response = await api.put(refreshUrl, { token });
    return response.data.data;
};


