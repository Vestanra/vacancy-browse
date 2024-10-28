import { useNavigate } from "react-router-dom";
import { logIn, refreshUser, logOut } from "../../redux/operationsAuth";
import { useAppDispatch } from "../../redux/store";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = ({ email, password }: { email: string, password: string }) => {
        dispatch(logIn({ email, password }));
    };

    const logout = () => {
        dispatch(logOut())
        navigate("/login");
    };

    const refresh = () => {
        dispatch(()=>refreshUser())
    }

    return {
        login,
        logout,
        refresh,
    };
};
