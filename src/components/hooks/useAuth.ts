import { logIn, refreshUser } from "../../redux/operationsAuth";
import { logOut } from "../../redux/sliceAuth";
import { useAppDispatch } from "../../redux/store";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const login = ({ email, password }: { email: string, password: string }) => {
        dispatch(logIn({ email, password }));
    };

    const logout = () => {
        dispatch(logOut())
    };

    const refresh = async () => {
        await dispatch(refreshUser())
    }

    return {
        login,
        logout,
        refresh,
    };
};
