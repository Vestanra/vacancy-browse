import { useTheme } from "@emotion/react";
import sprite from "../../images/svg/sprite.svg";
import { TableHeaderProps } from "../helpers/types";
import { defaultParams } from "../helpers/defultValue/defaultParamas";
import { Box, Button } from "@mui/material";

export const TableHeader: React.FC<TableHeaderProps> = ({setParams, setSelectedTitle}) => {
    const theme: any = useTheme(); 
    const handleClick = () => {
        setParams(defaultParams)
        setSelectedTitle('')
    }
    return (
        <Box sx={{display: 'flex', gap: '8px', alignItems: 'center', }}>
            <Box sx={{width: '600px', height: '48px', padding: '12px', border: `2px solid ${theme.palette.gray.G400}`, borderRadius: '8px', display: 'flex', alignItems: 'center'}}>IT Networking 2</Box>
            <Button type="submit"                        
                        sx={{
                            width: '158px', textTransform: 'none', height: '48px', textAlign: 'center',
                            padding: '12px 16px',  fontSize: '16px', fontWeight: '500',
                            display: 'flex', justifyContent: 'space-between',
                            color: theme.palette.gray.G800,
                            border: `2px solid ${theme.palette.blue.BA300}`, borderRadius: '8px',
                            '&:hover': {backgroundColor: theme.palette.blue.B100,},
                        }}
                onClick={handleClick}>
                <span>Refresh RSS</span>
                <svg width={16} height={16} color={theme.palette.gray.G800}><use href={`${sprite}#refresh`} /></svg>
            </Button>            
        </Box>
    )
};