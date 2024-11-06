import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { selectIsAuth, useAppSelector } from "../redux/selectors";
import { useFeedById } from "./useFeedById";
import { IUpworkFeedDetailItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";

export const useFeedByIdQuery = (id: string) => {
    const getFeed = useFeedById();
    const isAuth = useAppSelector(selectIsAuth);
    
    const { data, isLoading, isSuccess, isError, error }: UseQueryResult<IUpworkFeedDetailItemDTO, any> = useQuery({
        queryKey: ['feed', id,],
        queryFn: () => getFeed(id),
        enabled: isAuth && Boolean(id),
    });
    return { data, isLoading, isSuccess, isError, error };
};