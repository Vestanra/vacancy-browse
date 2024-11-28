import axios from "axios";
import { getAccessToken } from "../components/helpers/functions/getTokens";
import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { ICreateChatRequest } from "../interfaces-submodule/interfaces/dto/chat/dto/icreate-chat-request.interface";
import { ChatRoutes } from "../interfaces-submodule/enums/routes/chat-routes.enum";
import { IChatItemsArray } from "../types/types";

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

export const getChats = async (): Promise<IChatItemsArray | void> => {
    const url = `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`;
    const response = await api.get(url);
    return response.data.data;
};

export const getChatById = async (id: string) => {
    const url = `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`;
    const response = await api.get(url);
    return response.data.data;
};

export const createNewChat = async (params: ICreateChatRequest) => {
    const url = `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`;
    const response = await api.post(url, params);
    return response.data.data;
};

export const updateChatById = async (id: number, params: ICreateChatRequest) => {
    const url = `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`;
    const response = await api.put(url, params);
    return response.data.data;
};

export const deleteChatById = async (id: number) => {
    const url = `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`;
    await api.delete(url);
};