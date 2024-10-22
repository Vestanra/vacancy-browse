import { getFeeds } from "../../apiService";
import { refreshUser } from "../../redux/operationsAuth";
import { logOut } from "../../redux/sliceAuth";
import { useAppDispatch } from "../../redux/store";
import { getAccessToken } from "./getTokens";

export const useFeeds = () => {
    const dispatch = useAppDispatch();
    const allFeeds = async (params = {}) => {
        try {
            return await getFeeds(getAccessToken(), params);
        } catch (error: any) {
            if (error.status === 401) {
                console.log('before refresh')
                await dispatch(refreshUser())
                return await getFeeds(getAccessToken(), params)
            } else if (error.status === 403) {
                console.log('before logout')
                logOut()
            } else {
                console.log("Something went wrong")
            }            
        };
    };

    return allFeeds;
};