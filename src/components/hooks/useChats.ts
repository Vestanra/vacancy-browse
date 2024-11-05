import { refreshUser } from "../../redux/operationsAuth";
import { useAppDispatch } from "../../redux/store";
import { getChatById, getChats } from "../helpers/chatService";
import { IChatItemsArray } from "../helpers/types";

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
                const result = await getAllChats();
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

    return { getAllChats, getChat };
};