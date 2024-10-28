import { getFeeds } from "../../apiService"
import { refreshUser } from "../../redux/operationsAuth";
import { useAppDispatch } from "../../redux/store";

export const useFeeds = () => {
    const dispatch = useAppDispatch();
    const getAllFeeds = async (params: {}) => {
        try {
            const result = await getFeeds(params);
            return result;
        } catch (error: any) {
            console.log(error.status)
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await getFeeds(params);
                return result;
            }
        }
    }
    return getAllFeeds
};