import { getFeeds } from "../../apiService";
import { getAccessToken, getRefreshToken } from "./getTokens";
import { useAuth } from "./useAuth";

export const useFeeds = () => {
    const { logout, refresh } = useAuth();

    const allFeeds = async (params = {}) => {
        let accessToken = getAccessToken();
        try {        
            const data = await getFeeds(accessToken, params);
            return data
        } catch (error: any) {
            if (error.status === 401) {
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    logout();
                    return;
                };          
                refresh();
                accessToken = getAccessToken();
                return await getFeeds(accessToken, params);
            } else if (error.status === 401) {
                 logout();
            } else {
                console.log("Something went wrong")
            }          
        };
    };

    return allFeeds;
};