import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import sprite from "../images/svg/sprite.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const theme: any = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isFeedsPage = location.pathname === '/feeds';
    console.log(isFeedsPage)

    const handleClick = () => {
        navigate('/feeds/chat');
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "320px",
            position: "relative",
            backgroundColor: theme.palette.primary.main,
            height: "auto",
            minHeight: "100vh",
            gap: "2px",            
        }}>
            <Button
                component="button"
                onClick={handleClick}
                sx={{ width: '288px', marginTop: '16px', }}>
                <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#plus`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>New chat</span>
            </Button>
            <Box
                sx={{
                    padding: "12px 0",
                    position: 'fixed',
                    bottom: 0,
                    borderTop: `1px solid ${theme.palette.gray.G200}`,
                }}>
                <Button
                    component="button"
                    onClick={() => navigate('/feeds')}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: '288px',
                        border: "none",
                        justifyContent: "left",
                        backgroundColor: isFeedsPage ? `${theme.palette.gray.G200}` : "transparent",
                    }}
                >
                    <svg width={20} height={20} color={theme.palette.gray.G800}><use href={`${sprite}#rss`} /></svg>
                    <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>Upwork feed</span>
                </Button>
                <Button
                    component="button"
                    sx={{ width: '288px', border: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#avatar`} /></svg>
                        <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>username</span>
                    </div>
                    <svg width={14} height={14} color={theme.palette.gray.G800}><use href={`${sprite}#arrow-right`} /></svg>
                </Button>
            </Box>
        </Box>
    )
};