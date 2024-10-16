import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/helpers"
import { refreshUser } from "../redux/operationsAuth";

export const RefreshUser = ({ children }: { children: JSX.Element }) => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const refresh = async () => {
            setIsRefreshing(true);
            await dispatch(refreshUser());
            setIsRefreshing(false)
        }
        refresh()
        
    }, [dispatch])
    
    return isRefreshing ?  <div>Loading...</div> : children;
}