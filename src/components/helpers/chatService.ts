import axios from "axios";
import { getAccessToken } from "../hooks/getTokens";
import { BaseRoutes } from "../../interfaces-submodule/enums/routes/base-routes.enum";
import { IChatItemsArray } from "./types";

const api = axios.create({
    baseURL: 'https://trainee-api.chat.abcloudz.com',
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
    const url = `${BaseRoutes.V1}/chats`;
    const response = await api.get(url);
    return response.data.data;
};

export const getChatById = async (id: string) => {
    const url = `${BaseRoutes.V1}/chats/${id}`;
    const response = await api.get(url);
    return response.data.data;
}