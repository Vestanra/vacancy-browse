import { useEffect } from "react";
import { selectLoading, useAppSelector } from "../../redux/selectors";
import { useAppDispatch } from "../../redux/store";
import { refreshUser } from "../../redux/operationsAuth";

export const RefreshUser = ({ children }: { children: JSX.Element }) => {
    const isLoading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const refresh = async () => {
            await dispatch(refreshUser());
        }
        refresh()
    }, [dispatch])

    return isLoading ?  <div>Loading...</div> : children;
}
   