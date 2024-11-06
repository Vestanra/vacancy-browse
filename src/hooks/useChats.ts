import { ICreateChatRequest } from "../interfaces-submodule/interfaces/dto/chat/dto/icreate-chat-request.interface";
import { refreshUser } from "../redux/operationsAuth";
import { useAppDispatch } from "../redux/store";
import { createNewChat, deleteChatById, getChatById, getChats, updateChatById } from "../services/chatService";
import { IChatItemsArray } from "../components/helpers/types";

export const useChats = () => {
    const dispatch = useAppDispatch();
    const getAllChats = async(): Promise<IChatItemsArray | void> => {
        try {
            const result = await getChats();
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await getChats();
                return result;
            }
        }
    }

    const getChat = async (id: string) => {
        try {
            const result = await getChatById(id);
            return result;

        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await getChatById(id);
                return result;
            }
        }
    };

    const createChat = async (params: ICreateChatRequest) => {
        try {
            const result = await createNewChat(params);
            return result;
        } catch (error: any) {
             if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await createNewChat(params);
                return result;
            }
        }
    };

    const updateChat = async (id: number, params: ICreateChatRequest) => {
        try {
            const result = await updateChatById(id, params);
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await updateChatById(id, params);
                return result;
            }
        }
    };

    const deleteChat = async (id: number) => {
        try {
            await deleteChatById(id);
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                await deleteChatById(id);
            }
        }
    };

    return { getAllChats, getChat, createChat, updateChat, deleteChat };
};