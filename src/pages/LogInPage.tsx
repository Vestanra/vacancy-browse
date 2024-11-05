import { Navigate } from "react-router-dom";
import { selectIsAuth, useAppSelector } from "../redux/selectors";
import { Login } from "../components/Auth/Login";

export const LogInPade = () => {
    const isAuth = useAppSelector(selectIsAuth);
    if (isAuth) {
        return <Navigate to={"/feeds"} replace/>
    }
    
    return (
        <Login/>
    )
}