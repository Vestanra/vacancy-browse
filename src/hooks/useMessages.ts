import { IMessageDTO } from "../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { ISendMessageRequest } from "../interfaces-submodule/interfaces/dto/message/isend-message-request.interface";
import { refreshUser } from "../redux/operationsAuth";
import { useAppDispatch } from "../redux/store";
import { getMessages, sendMessageById } from "../services/messageService";

export const useMessage = () => {
    const dispatch = useAppDispatch();

    const getMessagesById = async (id: string): Promise<IMessageDTO[] | void> => {
        try {
            const result = await getMessages(id);
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await getMessages(id);
                return result;
            }
        }
    };

    const sendMessage = async (params: ISendMessageRequest) => {
        try {
            const result = await sendMessageById(params);
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await sendMessageById(params);
                return result;
            }
        }
    };

    return { getMessagesById, sendMessage };
};