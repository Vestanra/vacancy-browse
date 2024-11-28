import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { IUpworkResponseListFeedsDto } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import { useFeeds } from "./useFeeds";
import { selectIsAuth, useAppSelector } from "../redux/selectors";
import { defaultParams } from "../components/helpers/defultValue/defaultParamas";
import { IUpworkFeedDetailItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";
import { FeedsParams } from "../types/types";

export const useFeedsData = (params: FeedsParams = {}) => {
    const { getAllFeeds } = useFeeds();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IUpworkResponseListFeedsDto, any> = useQuery({
        queryKey: ['feeds', params],
        queryFn: () => getAllFeeds({...defaultParams, ...params}),
        enabled: isAuth,
    });
    return { data, isLoading, isSuccess, isError, error };
};

export const useFeedByIdQuery = (id: string) => {
    const { getFeed } = useFeeds();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IUpworkFeedDetailItemDTO, any> = useQuery({
        queryKey: ['feed', id,],
        queryFn: () => getFeed(id),
        enabled: isAuth && Boolean(id),
    });
    return { data, isLoading, isSuccess, isError, error };
};

export const useUpdateFeedQuery = () => {
    const queryClient = useQueryClient();
    const { updateFeedById } = useFeeds();

    return useMutation({
        mutationFn: ({ id, params }: { id: string; params: {} }) => updateFeedById(id, params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feeds'] });
        },
        onError: (error: any) => {
            console.error('Error: ', error);
        }
    });
};