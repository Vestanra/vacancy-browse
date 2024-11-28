import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import sprite from "../../images/svg/sprite.svg";
import { FeedHeaderProps } from "../../types/types";

export const FeedHeader: React.FC<FeedHeaderProps> = ({ handleClick, title, matchedCases, matchedBlogs }) => {
    const theme: any = useTheme();
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 32px" }}>
            <div>
                <NavLink to={'/'}
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
                disabled={matchedBlogs.length === 0 && matchedCases.length === 0}
                onClick={handleClick}
                sx={{ width: '278px'}}
            >
                <svg width={24} height={24} color={matchedBlogs.length === 0 && matchedCases.length === 0 ? theme.palette.gray.G400 : theme.palette.gray.G800}><use href={`${sprite}#send`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>Save & Generate response</span>
            </Button>
        </Box>
    )
};