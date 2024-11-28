import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuth, useAppSelector } from "../../redux/selectors";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuth = useAppSelector(selectIsAuth);
    const location = useLocation();

    return isAuth ? children : <Navigate to="/login"  state={{ from: location }} replace/>
}