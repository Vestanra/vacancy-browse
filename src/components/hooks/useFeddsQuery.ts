import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import { useFeeds } from "./useFeeds";
import { selectIsAuth, useAppSelector } from "../../redux/selectors";
import { FeedsParams } from "../types";

const defaultParams = {
    pageSize: 5,
    pageNumber: 1,
    sortDirection: "asc",
    // searchParameters: [
    //     {
    //         searchQuery:  [""],
    //         searchBy: "keywords"
    //     }
    // ],
    sortBy: "published"
};

export const useFeedsData = (params: FeedsParams = {}) => {
    const getAllFeeds = useFeeds();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IUpworkResponseListFeedsDto, any> = useQuery({
        queryKey: ['feeds', params],
        queryFn: () => getAllFeeds({...defaultParams, ...params}),
        enabled: isAuth,
    });

    useEffect(() => {
        if (isError) {
            console.log("react query is error")
        }
    }, [isError])
   
    useEffect(() => {
        if (isSuccess) {
            console.log("react query is success")
        }
    }, [isSuccess])

    return { data, isLoading, isSuccess, isError, error };
};
