import { ISendMessageRequest } from "../interfaces-submodule/interfaces/dto/message/isend-message-request.interface";
import { refreshUser } from "../redux/operationsAuth";
import { useAppDispatch } from "../redux/store";
import { sendMessageById } from "../services/messageService";

export const useMessage = () => {
    const dispatch = useAppDispatch();

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

    return { sendMessage };
};