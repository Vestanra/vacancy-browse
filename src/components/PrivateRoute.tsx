import { Navigate } from "react-router-dom";
import { useAppSelector, selectIsAuth  } from "../redux/selectors"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuth = useAppSelector(selectIsAuth);
    
    return isAuth ? children : <Navigate to="/login" replace/>
}