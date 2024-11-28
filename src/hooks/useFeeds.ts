import { getFeeds } from "../services/feedsService"
import { refreshUser } from "../redux/operationsAuth";
import { useAppDispatch } from "../redux/store";
import { getFeedById } from "../services/feedsService";
import { updateFeed } from "../services/feedsService";

export const useFeeds = () => {
    const dispatch = useAppDispatch();
    
    const getAllFeeds = async (params: {}) => {
        try {
            const result = await getFeeds(params);
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await getFeeds(params);
                return result;
            }
        }
    };

    const getFeed = async (id: string) => {
        try {
            const result = await getFeedById(id);
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await getFeedById(id);
                return result;
            }
        }
    };

    const updateFeedById = async (id: string, params: {}) => {
        try {
            const result = await updateFeed(id, params);
            return result;
        } catch (error: any) {
            if (error.status === 401) {
                const refreshResult = await dispatch(refreshUser()).unwrap()
                if (!refreshResult) return;
                const result = await updateFeed(id, params);
                return result;
            }
        }
    };

    return { getAllFeeds, getFeed, updateFeedById }
};