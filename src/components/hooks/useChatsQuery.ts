import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { selectIsAuth, useAppSelector } from "../../redux/selectors";
import { FeedsParams, IChatItemsArray } from "../helpers/types";
import { useChats } from "./useChats";

export const useChatsQuery = (params: FeedsParams = {}) => {
    const { getAllChats } = useChats();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IChatItemsArray, any> = useQuery({
        queryKey: ['chats', ],
        queryFn: () => getAllChats(),
        enabled: isAuth,
    });
    return { data, isLoading, isSuccess, isError, error };
};