import { Feeds } from "../components/Feeds";
import { useAuth } from "../components/hooks/useAuth";
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
            <Feeds/>
        </div>        
    )
};
