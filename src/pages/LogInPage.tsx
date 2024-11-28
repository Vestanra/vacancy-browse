import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuth, useAppSelector } from "../redux/selectors";
import { Login } from "../components/Auth/Login";

export const LogInPade = () => {
    const location = useLocation();
    const path = location.state?.from?.pathname || '/';
    const isAuth = useAppSelector(selectIsAuth);

    if (isAuth) {
        return <Navigate to={path} replace/>
    }
    
    return (
        <Login/>
    )
}