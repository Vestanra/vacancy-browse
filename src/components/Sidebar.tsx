import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import sprite from "../images/svg/sprite.svg";
import { useNavigate } from "react-router-dom";
import { useChatsQuery } from "./hooks/useChatsQuery";
import { SidebarFooter } from "./SidebarFooter";

export const Sidebar = () => {
    const theme: any = useTheme();
    const navigate = useNavigate();

    const {data} = useChatsQuery()



    const handleClick = () => {
        navigate('/feeds/chat');
        console.log(data)
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "320px",            
            position: "relative",
            padding: "12px 16px",
            backgroundColor: theme.palette.primary.main,
            height: "auto",
            minHeight: "100vh",
            gap: "2px",            
        }}>
            <Button
                component="button"
                onClick={handleClick}
                sx={{ width: '288px', marginBottom: "12px"}}>
                <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#plus`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>New chat</span>
            </Button>
            <ul>
                {data && 
                    data.map(el => <li key={el.id}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", width: "100%", padding: "12px 0" }}>
                        <div style={{
                            width: "222px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        >{el.name}</div>
                        <button><svg width={4} height={18} color={theme.palette.gray.G800}><use href={`${sprite}#ellipsis`} /></svg></button>
                    </li>)
                }
            </ul>
            <SidebarFooter/>
        </Box>
    )
};