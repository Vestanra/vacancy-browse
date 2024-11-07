import axios from "axios";
import { ILoginRequestDTO } from "../interfaces-submodule/interfaces/dto/auth/iadmin-login-request.interface";
import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { AuthRoutes } from "../interfaces-submodule/enums/routes/auth-routes.enum";
import { getAccessToken } from "../components/helpers/functions/getTokens";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const logInRequest = async (credentials: ILoginRequestDTO) => {
    const url = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`;
    const response = await api.post(url, credentials);
    return response.data.data;
};

export const refreshTokenRequest = async (token: string) => {
    const url = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`;
    const response = await api.put(url, { token });
    return response.data.data;
};

export const recoverUserRequest = async () => {
    const url = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RecoverUser}`;
    let accessToken = getAccessToken();
    const response = await api.get(url,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};