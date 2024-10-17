import { Navigate } from "react-router-dom";
import { useAppSelector, selectAccessToken  } from "../redux/selectors"

export const PrivateRoute = ({ children }: {children: JSX.Element}) => {
    const accessToken = useAppSelector(selectAccessToken);
    
    return accessToken ? children : <Navigate to="/login" replace/>
}