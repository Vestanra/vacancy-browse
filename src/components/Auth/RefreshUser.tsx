import { useEffect } from "react";
import { selectIsRefreshing, useAppSelector } from "../../redux/selectors";
import { useAppDispatch } from "../../redux/store";
import { refreshUser } from "../../redux/operationsAuth";
import { Loader } from "../Loader";

export const RefreshUser = ({ children }: { children: JSX.Element }) => {
    const isRefreshing = useAppSelector(selectIsRefreshing);
    const dispatch = useAppDispatch();  

    useEffect(() => {
        const refresh = async () => {
            await dispatch(refreshUser());
        }
        refresh()
    }, [dispatch])

    return isRefreshing ? <Loader/> : children;
}
   