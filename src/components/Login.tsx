import { useEffect, useState } from "react";
import sprite from "../images/svg/sprite.svg";
import { useAppSelector, selectError, selectLoading } from "../redux/selectors";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { inputStyles } from "./helpers/stylesHelper";
import {CustomAlert} from "./CustomAlert"
import { SubmitHandler, useForm } from "react-hook-form";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useAuth } from "./hooks/useAuth";

interface MyForm {
    email: string;
    password: string;
}

export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null | undefined>(null)
    const { login } = useAuth();
    const errorMessage = useAppSelector(selectError);
    const isLoading = useAppSelector(selectLoading);
    const theme: any = useTheme();

    const { register, handleSubmit, watch } = useForm<MyForm>();
    const passwordValue = watch('password', '');
               
    useEffect(() => {
        if (errorMessage) {
            setError("Request failed")
        }
    }, [errorMessage])
    
    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);        
    };

    const submit: SubmitHandler<MyForm> = ({email, password}) => {
        login({ email, password });
    };
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', color: theme.palette.gray.G800, }}>
            <Box sx={{ padding: '96px 60px', width: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width={32} height={32}><use href={`${sprite}#logo`} /></svg>
                    <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700' }}>Sales Assistant</Typography>
                </Box>
                <Typography variant="h2" sx={{ fontSize: '32px', fontWeight: '500', margin: '40px 0', textAlign: 'center' }}>Login</Typography>
                {error &&
                    <CustomAlert severity="error" sx={{
                        width: '320px', height: '64px', padding: '0 0 0 12px', marginBottom: '16px',
                        fontSize: '16px', fontWeight: '600',
                        borderRadius: '8px', color: theme.palette.primary.dark, backgroundColor: theme.palette.alertError.E200,
                    }} >
                        Error<Typography sx={{ fontSize: '14px', fontWeight: '400', }}>{error}</Typography>
                    </CustomAlert>}
                <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                    <Button
                        type="button"
                        onClick={() => setError("Please enter email and password.")}
                        sx={{
                            width: '320px', textTransform: 'none', height: '48px', 
                            color: theme.palette.gray.G800, textAlign: 'center',
                            border: `2px solid ${theme.palette.blue.BA300}`, borderRadius: '8px',
                            '&:hover': {backgroundColor: theme.palette.blue.B100,},
                        }}>
                        <svg width={24} height={24}>
                            <use href={`${sprite}#microsoft-logo`} />
                        </svg>
                        <Typography sx={{ fontSize: '16px', fontWeight: '500', marginLeft: '8px' }}>Continue with Microsoft</Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: '8px', margin: '16px 0', alignItems: 'center', width: '320px', height: '40px', }}>
                    <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: theme.palette.gray.G300 }} />
                    <Box sx={{ color: theme.palette.gray.G600, fontWeight: '500', }}>or</Box>
                    <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: theme.palette.gray.G300 }} />
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit(submit)}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <TextField
                        {...register("email", {required: true})}
                        type="email"
                        placeholder="Email"
                        label="Email"
                        variant="filled"
                        fullWidth                        
                        sx={{ ...inputStyles, border: `1px solid ${theme.palette.gray.G400}`, marginBottom: '16px' }}

                    />
                    <TextField
                        {...register("password", {required: true})}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        label="Password"
                        variant="filled"
                        fullWidth                        
                        sx={{ ...inputStyles, border: `1px solid ${theme.palette.gray.G400}`, }}
                        slotProps={{
                            input: {
                                endAdornment: passwordValue &&
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={handlePasswordToggle}
                                            sx={{ minWidth: '24px', padding: '0', }}>
                                            <RemoveRedEyeIcon
                                                sx={{ color: theme.palette.primary.dark }} />
                                        </Button>
                                    </InputAdornment>
                            }
                        }}
                    />
                    <Button component="button"
                        type="submit"
                        disabled={isLoading}
                        sx={{
                            width: '320px', marginTop: '16px', textTransform: 'none', height: '48px', textAlign: 'center',
                            color: theme.palette.gray.G800,
                            border: `2px solid ${theme.palette.blue.BA300}`, borderRadius: '8px',
                            '&:hover': {backgroundColor: theme.palette.blue.B100,},
                        }}>Log in
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    backgroundImage: `url(${theme.palette.backgroundImage})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh', maxWidth: '1000px', width: '100%', display: { xs: 'none', lg: 'block' },
                }} />
        </Box>
    );
};
