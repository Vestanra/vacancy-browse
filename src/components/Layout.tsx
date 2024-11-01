import { Outlet } from "react-router-dom";
import { useThemeContext } from "../components/helpers/styles/ThemeContextProvider";
import sprite from "../images/svg/sprite.svg";
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import { useFeedsData } from "./hooks/useFeedsQuery";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { Loader } from "./Loader";

export const Layout: React.FC = () => {
    const theme: any = useTheme();
    const { toggleTheme, themeMode } = useThemeContext();    
    const { isError, isLoading } = useFeedsData();
    const [isSidebar, setIsSidebar] = useState(true);

    const handleSideBar = () => {
        setIsSidebar(!isSidebar)
    }

    return (
        <div >
            {isLoading ? <Loader />
                : isError
                    ? (<div>Error: {isError}</div>)
                    :
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme.palette.gray.G100 }}>
                        <Box sx={{ display: "flex", width: "1440px", }}>
                            {isSidebar && <Sidebar />}
                            <div style={{ margin: "0 auto", width: "1120px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", padding: '24px 0' }}>
                                    <Button
                                        type="button"
                                        onClick={handleSideBar}
                                        sx={{ padding: '0px' }} >
                                        {isSidebar
                                            ? <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#collapse-menu`} /></svg>
                                            : <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#lines`} /></svg>
                                        }
                                    </Button>
                                    <Button onClick={toggleTheme}>
                                        {themeMode === "light"
                                            ? <svg width={24} height={24} ><use href={`${sprite}#dark-mode`} /></svg>
                                            : <svg width={24} height={24} ><use href={`${sprite}#light-mode`} /></svg>}
                                    </Button>
                                </Box>
                                <Outlet />
                            </div>
                        </Box>
                    </div>
            }
        </div>
    )
};