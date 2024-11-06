import { refreshUser } from "../redux/operationsAuth";
import { useAppDispatch } from "../redux/store";
import { updateFeed } from "../services/apiService";

export const useUpdateFeed = () => {
    const dispatch = useAppDispatch();
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
    }
    return updateFeedById;
};