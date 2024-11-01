import { getFeedById } from "../helpers/apiService"
import { refreshUser } from "../../redux/operationsAuth";
import { useAppDispatch } from "../../redux/store";

export const useFeedById = () => {
    const dispatch = useAppDispatch();
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
    }
    return getFeed;
};