import React from 'react';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import sprite from "../../../images/svg/sprite.svg";

interface CustomAlertProps {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    width?: string;
}
export const CustomAlert: React.FC<CustomAlertProps> = ({ severity, title, width = "280px" }) => {
    const theme: any = useTheme();
    
    const getAlertDetails = (severity: string) => {
        switch (severity) {
            case 'error':
                return { title: 'Error', iconId: 'error', colorIcon: theme.palette.alertError.E600, backgroundColor: theme.palette.alertError.E200 };
            case 'warning':
                return { title: 'Warning', iconId: 'warning', colorIcon: theme.palette.alertWarning.E600, backgroundColor: theme.palette.alertWarning.E200 };
            case 'info':
                return { title: 'Information', iconId: 'info', colorIcon: theme.palette.alertInfo.E600, backgroundColor: theme.palette.alertInfo.E200 };
            case 'success':
                return { title: 'Success', iconId: 'success', colorIcon: theme.palette.alertSuccess.E600, backgroundColor: theme.palette.alertSuccess.E200 };
            default:
                return { title: 'Error', iconId: 'error', colorIcon: theme.palette.alertError.E600, backgroundColor: theme.palette.alertError.E200 };
        }
    };

    const { title: alertTitle, iconId, colorIcon, backgroundColor } = getAlertDetails(severity);
    
    return (
        <Box sx={{
            display: "flex", gap: "8px",
            width: { width }, height: '64px', padding: "8px 12px",
            marginBottom: "16px",
            fontSize: '16px', fontWeight: '600',
            borderRadius: '8px',
            color: theme.palette.primary.dark, backgroundColor: { backgroundColor },
        }}>
            <svg width={24} height={24} color={colorIcon}><use href={`${sprite}#${iconId}`} /></svg>
            <div style={{display: "flex", gap: "4px", flexDirection: "column"}}>
                <span>{alertTitle}</span>
                <span style={{fontSize: '14px', fontWeight: '400',}}>{title}</span>
            </div>
        </Box>
    )
};                    