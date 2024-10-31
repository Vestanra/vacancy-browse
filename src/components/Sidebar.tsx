import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import sprite from "../images/svg/sprite.svg";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const theme: any = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/feeds/chat');
    }

    return (
        <Box sx={{
            display: "flex", alignItems: "center", flexDirection:"column", width: "320px",
            backgroundColor: theme.palette.primary.main, height: "auto", minHeight: "100vh"
        }}>
            <Button
                component="button"
                onClick={handleClick}
                sx={{
                    width: '288px', marginTop: '16px', textTransform: 'none', height: '48px', textAlign: 'center',
                    color: theme.palette.gray.G800,
                    border: `2px solid ${theme.palette.blue.BA300}`, borderRadius: '8px',
                    '&:hover': { backgroundColor: theme.palette.blue.B100, },
                }}>
                <svg width={16} height={16} color={theme.palette.gray.G800}><use href={`${sprite}#plus`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>New chat</span>
            </Button>
        </Box>
    )
}