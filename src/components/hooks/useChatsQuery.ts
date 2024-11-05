import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { selectIsAuth, useAppSelector } from "../../redux/selectors";
import { IChatItemsArray } from "../helpers/types";
import { useChats } from "./useChats";

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