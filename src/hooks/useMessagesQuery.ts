import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { selectIsAuth, useAppSelector } from "../redux/selectors";
import { useMessage } from "./useMessages";
import { ISendMessageRequest } from "../interfaces-submodule/interfaces/dto/message/isend-message-request.interface";

export const useMessagesQuery = (id: string) => {
    const isAuth = useAppSelector(selectIsAuth);
    const { getMessagesById } = useMessage();

    const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ['messages', id],
        queryFn: () => getMessagesById(id),
        enabled: isAuth && Boolean(id),
    });

    return { data, isLoading, isSuccess, isError, error, refetch }
};

export const useSendMessageQuery = () => {
    const queryClient = useQueryClient();
    const { sendMessage } = useMessage();

    return useMutation({
        mutationFn: (params: ISendMessageRequest) => sendMessage(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['messages',]})
        }
    })
}