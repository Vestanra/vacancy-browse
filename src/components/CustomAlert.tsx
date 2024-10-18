import React from 'react';
import Alert from '@mui/material/Alert';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useTheme } from '@emotion/react';

interface CustomAlertProps {
    severity: 'error' | 'warning' | 'info' | 'success';
    children: React.ReactNode;
    sx?: React.CSSProperties;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ severity, children, sx }) => {
    const theme: any = useTheme();
    
    return (
        <Alert
            severity={severity}
            sx={sx}
            iconMapping={{
                error: <DangerousIcon sx={{ color: theme.palette.alertError.E600 }} />, 
                // warning: <WarningIcon />,
                // info: <InfoIcon />,
                // success: <SuccessIcon />,
            }}
        >
            {children}
        </Alert>
    );
};