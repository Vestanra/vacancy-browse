import { Navigate } from "react-router-dom";
import { Login } from "../components/Login"
import { selectUserData, useAppSelector } from "../redux/selectors";

export const LogInPade = () => {
    const { email } = useAppSelector(selectUserData);
    if (email) {
        return <Navigate to={"/"} replace/>
    }
    
    return (
        <Login/>
    )
}