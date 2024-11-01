import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import sprite from "../../images/svg/sprite.svg";

interface FeedHeaderProps {
    handleClick: (e: any) => void;
    title: string | any; 
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({ handleClick, title }) => {
    const theme: any = useTheme();
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 32px" }}>
            <div>
                <NavLink to={'/feeds'}
                    style={{ color: theme.palette.primary.contrastText, textDecoration: "none", }}>Upwork feed
                    <span style={{ color: theme.palette.gray.G700 }}> &gt;</span>
                </NavLink>
                <h1 style={{
                    fontSize: "24px", fontWeight: "500", margin: "0",
                    maxWidth: "770px", color: theme.palette.gray.G800
                }}>{title}</h1>
            </div>
            <Button
                component="button"
                onClick={handleClick}
                sx={{
                    width: '278px', textTransform: 'none', height: '48px', textAlign: 'center',
                    color: theme.palette.gray.G800,
                    border: `2px solid ${theme.palette.blue.BA300}`, borderRadius: '8px',
                    '&:hover': { backgroundColor: theme.palette.blue.B100, },
                }}
            >
                <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#send`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>Save & Generate response</span>
            </Button>
        </Box>
    )
};