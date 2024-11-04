import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import { useFeeds } from "./useFeeds";
import { selectIsAuth, useAppSelector } from "../../redux/selectors";
import { FeedsParams } from "../helpers/types";
import { defaultParams } from "../helpers/defultValue/defaultParamas";

export const useFeedsData = (params: FeedsParams = {}) => {
    const getAllFeeds = useFeeds();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IUpworkResponseListFeedsDto, any> = useQuery({
        queryKey: ['feeds', params],
        queryFn: () => getAllFeeds({...defaultParams, ...params}),
        enabled: isAuth,
    });
    return { data, isLoading, isSuccess, isError, error };
};
