import { useThemeContext } from "../components/helpers/styles/ThemeContextProvider";
import sprite from "../images/svg/sprite.svg";
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";


export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { toggleTheme, themeMode } = useThemeContext();
    const theme: any = useTheme(); 
    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
                <Button type="button" sx={{padding: '0px'}} >
                    <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#collapse-menu`} /></svg>
                </Button>
                <Button onClick={toggleTheme}>
                    {themeMode === "light"
                        ? <svg width={24} height={24} ><use href={`${sprite}#dark-mode`} /></svg>
                        : <svg width={24} height={24} ><use href={`${sprite}#light-mode`} /></svg>}
                </Button>
            </Box>
            {children}
        </>
    )
};