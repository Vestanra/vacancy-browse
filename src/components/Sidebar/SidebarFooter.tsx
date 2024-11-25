import { useTheme } from "@emotion/react";
import { Box, Button, Popover, } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { selectUserName, useAppSelector } from "../../redux/selectors";
import sprite from "../../images/svg/sprite.svg";

export const SidebarFooter = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme: any = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isFeedsPage = location.pathname === '/';

    const { logout } = useAuth();

    const userName = useAppSelector(selectUserName);

    const openPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const closePopover = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                padding: "12px 0",
                position: 'fixed',
                bottom: 0,
                borderTop: `1px solid ${theme.palette.gray.G200}`,
                backgroundColor: theme.palette.primary.main,
            }}>
            <Button
                component="button"
                onClick={() => navigate('/')}
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
                onClick={openPopover}
                sx={{
                    width: '288px',
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: anchorEl ? `${theme.palette.gray.G200}` : "transparent",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#avatar`} /></svg>
                    <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>{userName ? userName : "user"}</span>
                </div>
                <svg width={14} height={14} color={theme.palette.gray.G800}><use href={`${sprite}#arrow-right`} /></svg>
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={closePopover}
                sx={{
                    marginBottom: "6px",
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ width: '288px', padding: '8px', }}>
                    <Button onClick={()=>logout()}
                        sx={{ width: '100%', border: "none", display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <svg width={16} height={20} color={theme.palette.gray.G800}><use href={`${sprite}#logout`} /></svg>
                        <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>Logout</span>
                    </Button>
                </Box>
            </Popover>
        </Box>
    )
};