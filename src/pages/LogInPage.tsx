import { Navigate } from "react-router-dom";
import { selectUserData, useAppSelector } from "../redux/selectors";
import { Login } from "../components/Auth/Login";

export const LogInPade = () => {
    const { email } = useAppSelector(selectUserData);
    if (email) {
        return <Navigate to={"/feeds"} replace/>
    }
    
    return (
        <Login/>
    )
}