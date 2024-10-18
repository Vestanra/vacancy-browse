import { Navigate } from "react-router-dom";
import { Login } from "../components/Login"
import { selectAccessToken, useAppSelector } from "../redux/selectors";

export const LogInPade = () => {
    const accessToken = useAppSelector(selectAccessToken);
    if (accessToken) {
        return <Navigate to={"/"} replace/>
    }
    
    return (
        <Login/>
    )
}