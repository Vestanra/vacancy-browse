import axios from "axios";
import { getAccessToken } from "../components/helpers/functions/getTokens";
import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { MessagesRoutesEnum } from "../interfaces-submodule/enums/routes/messages-routes.enum";
import { ISendMessageRequest } from "../interfaces-submodule/interfaces/dto/message/isend-message-request.interface";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getMessages = async (id: string) => {
    const url = `${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}/${id}`;
    const response = await api.get(url);
    return response.data.data;
};

export const sendMessageById = async (params: ISendMessageRequest) => {
    const url = `${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}/${MessagesRoutesEnum.SendMessage}`;
    const response = await api.post(url, params);
    return response.data.data;
};