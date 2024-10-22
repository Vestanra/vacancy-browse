import { useEffect } from "react";
import { useAppDispatch } from "../redux/store"
import { refreshUser } from "../redux/operationsAuth";
import { selectLoading, useAppSelector } from "../redux/selectors";

export const RefreshUser = ({ children }: { children: JSX.Element }) => {
    const isLoading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const refresh = () => {
            dispatch(refreshUser());
        }
        refresh()

    }, [dispatch])

    return isLoading ?  <div>Loading...</div> : children;
}
