import { useEffect } from "react";
import { selectIsRefreshing, useAppSelector } from "../../redux/selectors";
import { useAppDispatch } from "../../redux/store";
import { recoverUser, refreshUser } from "../../redux/operationsAuth";
import { Loader } from "../Loader";
import { getAccessToken } from "../helpers/functions/getTokens";

export const RefreshUser = ({ children }: { children: JSX.Element }) => {
    const isRefreshing = useAppSelector(selectIsRefreshing);
    const dispatch = useAppDispatch();
    const accessToken = getAccessToken();

    useEffect(() => {             
        if (!accessToken) return;   
        
        const refresh = async () => {            
            try {
                await dispatch(recoverUser());
            } catch (err: any) {
                if (err.status === 401 || err.status === 403) {
                    await dispatch(refreshUser());
                }                
            }            
        }
        refresh()

    }, [accessToken, dispatch]);
    
    return isRefreshing ? <Loader/> : children;
}