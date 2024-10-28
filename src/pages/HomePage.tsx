import { useAuth } from "../components/hooks/useAuth";
import { TableFeeds } from "../components/TableFeeds";
import { useThemeContext } from "../components/ThemeContextProvider";

export const HomePage = () => {
    //toggleTheme
    const { toggleTheme, themeMode } = useThemeContext();
    const { logout } = useAuth();

    //logout

    return (
        <div>
            <div>HomePage</div>
            <button onClick={() => logout()}>logout</button>
            <div>thema: { themeMode }</div>
            <button onClick={toggleTheme}>toggle theme</button>
            <TableFeeds/>
        </div>        
    )
};
