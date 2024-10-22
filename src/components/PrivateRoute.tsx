import { Navigate } from "react-router-dom";
import { useAppSelector, selectUserData  } from "../redux/selectors"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { email } = useAppSelector(selectUserData);
    
    return email ? children : <Navigate to="/login" replace/>
}