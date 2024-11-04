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

export const getChats = async (): Promise<IChatItemsArray | void> => {
    let accessToken = getAccessToken();
    const url = `${BaseRoutes.V1}/chats`;

    const response = await api.get(
        url,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};