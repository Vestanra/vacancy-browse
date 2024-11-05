import { Outlet, useNavigate } from "react-router-dom";
import { useThemeContext } from "../components/helpers/styles/ThemeContextProvider";
import sprite from "../images/svg/sprite.svg";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useFeedsData } from "./hooks/useFeedsQuery";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export const Layout: React.FC = () => {
    const theme: any = useTheme();
    const { toggleTheme, themeMode } = useThemeContext();
    const { isError, isLoading, error } = useFeedsData();
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();

    const handleSideBar = () => {
        setIsSidebar(!isSidebar)
    };

    // useEffect(() => {
    //     if (isError && error?.status === 401) { 
    //         navigate('/login'); 
    //     }
    // }, [isError, error, navigate]);

    
    return (
        <div >
            {isLoading ? <Loader />
                : isError
                    ? (<div>Error: {error.message}</div>)
                    :
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme.palette.gray.G100 }}>
                        <Box sx={{ display: "flex", width: "1440px", }}>
                            {isSidebar && <Sidebar />}
                            <div style={{ margin: "0 auto", width: "1120px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", padding: '24px 20px' }}>
                                    <button onClick={handleSideBar}>
                                        {isSidebar
                                            ? <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#collapse-menu`} /></svg>
                                            : <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#lines`} /></svg>
                                        }
                                    </button>
                                    <button onClick={toggleTheme}>
                                        {themeMode === "light"
                                            ? <svg width={24} height={24} ><use href={`${sprite}#dark-mode`} /></svg>
                                            : <svg width={24} height={24} ><use href={`${sprite}#light-mode`} /></svg>}
                                    </button>
                                </Box>
                                <Outlet />
                            </div>
                        </Box>
                    </div>
            }
        </div>
    )
};