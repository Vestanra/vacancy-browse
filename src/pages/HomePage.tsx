import { useThemeContext } from "../components/ThemeContextProvider";
import { useAppDispatch } from "../redux/helpers";
import { logout } from "../redux/sliceAuth";

export const HomePage = () => {
    //toggleTheme
    const { toggleTheme, themeMode } = useThemeContext();

    //logout
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout())
    };
    
    return (
        <div>
            <div>HomePage</div>
            <button onClick={handleLogout}>logout</button>
            <div>thema: { themeMode }</div>
            <button onClick={toggleTheme}>toggle theme</button>
        </div>        
    )
};
