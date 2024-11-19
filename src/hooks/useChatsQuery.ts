import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { selectIsAuth, useAppSelector } from "../redux/selectors";
import { useChats } from "./useChats";
import { ICreateChatRequest } from "../interfaces-submodule/interfaces/dto/chat/dto/icreate-chat-request.interface";
import { useNavigate } from "react-router-dom";
import { IChatItemsArray } from "../types/types";

export const useChatsQuery = () => {
    const { getAllChats } = useChats();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IChatItemsArray, any> = useQuery({
        queryKey: ['chats', ],
        queryFn: () => getAllChats(),
        enabled: isAuth,
    });
    return { data, isLoading, isSuccess, isError, error };
};

export const useChatByIdQuery = (id: string) => {
    const { getChat } = useChats();
    const isAuth = useAppSelector(selectIsAuth);

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['chat', id],
        queryFn: () => getChat(id),
        enabled: isAuth && Boolean(id),
    });

    return { data, isLoading, isSuccess, isError, error }
};

export const useCreateChatQuery = () => {
    const queryClient = useQueryClient();
    const { createChat } = useChats();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (params: ICreateChatRequest) => createChat(params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['chats',] });
            if (data?.id) {
                navigate(`chats/${data.id}`);
            }
        },
    })
};

export const useUpdateChatQuery = () => {
    const queryClient = useQueryClient();
    const { updateChat } = useChats();

    return useMutation({
        mutationFn: ({ id, params }: { id: number, params: ICreateChatRequest }) => updateChat(id, params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats',] })
        },
    })
};

export const useDeleteChatQuery = () => {
    const queryClient = useQueryClient();
    const { deleteChat } = useChats();

    return useMutation({
        mutationFn: ((id: number) => deleteChat(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats',] })
        }
    })
};