import { Box, Button } from "@mui/material";
import sprite from "../images/svg/sprite.svg";
import { useTheme } from "@emotion/react";
import { PopoverButtonsProps } from "./helpers/types";

export const PopoverButtons: React.FC<PopoverButtonsProps> = ({setIsRenameAction}) => {
    const theme: any = useTheme();
    return (
        <Box sx={{ width: '288px', }}>
            <Button
                onClick={() => setIsRenameAction(true)}
                sx={{ width: '288px', border: "none", display: "flex", alignItems: "center", justifyContent: "left" }}
            >
                <svg width={18} height={18} color={theme.palette.gray.G800}><use href={`${sprite}#rename`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>Rename</span>
            </Button>
            <Button
                sx={{ width: '288px', border: "none", display: "flex", alignItems: "center", justifyContent: "left" }}
            >
                <svg width={18} height={19} color={theme.palette.gray.G800}><use href={`${sprite}#delete`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>Delete</span>
            </Button>
        </Box>
    )
};