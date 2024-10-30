import axios from "axios";
import { ILoginRequestDTO } from "../../interfaces-submodule/interfaces/dto/auth/iadmin-login-request.interface";
import { BaseRoutes } from "../../interfaces-submodule/enums/routes/base-routes.enum";
import { AuthRoutes } from "../../interfaces-submodule/enums/routes/auth-routes.enum";
import { UpworkFeedsRoutesEnum } from "../../interfaces-submodule/enums/routes/upwork-feeds-routes.enum";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import { getAccessToken } from "../hooks/getTokens";

const api = axios.create({
    baseURL: 'https://trainee-api.chat.abcloudz.com',
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

export const getFeeds = async (params: {}): Promise<IUpworkResponseListFeedsDto | void> => {
    const url = `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${UpworkFeedsRoutesEnum.GetFeeds}`;
    let accessToken = getAccessToken();
    const response = await api.post(
        url,
        params,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};