import { Box, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { PopoverButtonsProps } from "../helpers/types";
import sprite from "../../images/svg/sprite.svg";

export const PopoverButtons: React.FC<PopoverButtonsProps> = ({setIsRenameAction, id, handleOpenModal }) => {
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
                onClick={handleOpenModal}
                sx={{ width: '288px', border: "none", display: "flex", alignItems: "center", justifyContent: "left" }}
            >
                <svg width={18} height={19} color={theme.palette.gray.G800}><use href={`${sprite}#delete`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "400", marginLeft: "8px" }}>Delete</span>
            </Button>
        </Box>
    )
};