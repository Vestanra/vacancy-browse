import axios from "axios";
import { ILoginRequestDTO } from "./interfaces-submodule/interfaces/dto/auth/iadmin-login-request.interface";
import { BaseRoutes } from "./interfaces-submodule/enums/routes/base-routes.enum";
import { AuthRoutes } from "./interfaces-submodule/enums/routes/auth-routes.enum";
import { UpworkFeedsRoutesEnum } from "./interfaces-submodule/enums/routes/upwork-feeds-routes.enum";
import { IUpworkResponseListFeedsDto } from "./interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";

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

export enum UpworkFeedSortBy {
  Title = "title",
  Published = "published",
  Score = "score",
  Review = "review"
}

export enum UpworkFeedSearchBy {
  Title = "title",
  Published = "published",
  Keywords = "keywords",
  Score = "score",
  Review = "review"
}

const defaultParams = {
    pageSize: 20,
    pageNumber: 1,
    sortDirection: "desc",
    "searchParameters": [
        {
            "searchQuery":  ["developer"],
            "searchBy": "keywords"
        }
    ],
    // sortBy: "published"
};

export const getFeeds = async (token: string, params = {}): Promise<IUpworkResponseListFeedsDto | void> => {
    const url = `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${UpworkFeedsRoutesEnum.GetFeeds}`;
    try {
        const response = await api.post(url,
            {...defaultParams, ...params},
            {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data.data;
    } catch (error) {
        throw (error)
    }
};

