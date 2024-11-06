import { useEffect, useState } from "react";
import sprite from "../../images/svg/sprite.svg";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { SubmitHandler, useForm } from "react-hook-form";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useAuth } from "../../hooks/useAuth";
import { selectError, selectLoading, useAppSelector } from "../../redux/selectors";
import { CustomAlert } from "../helpers/styles/CustomAlert";
import { inputStyles } from "../helpers/styles/stylesHelper";

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

    const submit: SubmitHandler<MyForm> = ({ email, password }) => {
        login({ email, password });
    };
    
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', color: theme.palette.gray.G800,
            backgroundColor: theme.palette.primary.main, height: "100vh"
        }}>
            <Box sx={{ padding: '96px 60px', width: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width={32} height={32}><use href={`${sprite}#logo`} /></svg>
                    <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: '700' }}>Sales Assistant</Typography>
                </Box>
                <Typography variant="h2" sx={{ fontSize: '32px', fontWeight: '500', margin: '40px 0', textAlign: 'center' }}>Login</Typography>
                {error &&
                    <CustomAlert severity="error" title={error} width="320px" />}
                <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                    <Button
                        type="button"
                        onClick={() => setError("Please enter email and password.")}
                        sx={{width: '320px', }}>
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
                        {...register("email", { required: true })}
                        type="email"
                        name="email"
                        placeholder="Email"
                        label="Email"
                        variant="filled"
                        fullWidth
                        sx={{ ...inputStyles, border: `1px solid ${theme.palette.gray.G400}`, marginBottom: '16px' }}
                        slotProps={{
                            htmlInput: {
                                autoComplete: "username" 
                            }
                        }}

                    />
                    <TextField
                        {...register("password", { required: true })}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        label="Password"
                        name="password"
                        variant="filled"
                        fullWidth
                        sx={{ ...inputStyles, border: `1px solid ${theme.palette.gray.G400}`, }}
                        slotProps={{
                            input: {
                                endAdornment: passwordValue &&
                                    <InputAdornment position="end">
                                        <button
                                            onClick={handlePasswordToggle}>
                                            <RemoveRedEyeIcon
                                                sx={{ color: theme.palette.primary.dark }} />
                                        </button>
                                    </InputAdornment>
                            },
                            htmlInput: {
                                autoComplete: "current-password"
                            }
                        }}
                    />
                    <Button component="button"
                        type="submit"
                        disabled={isLoading}
                        sx={{ width: '320px', marginTop: '16px', }}>
                        Log in
                    </Button>
                </Box>
            </Box>
            <Box aria-hidden="true"
                sx={{
                    backgroundImage: `url(${theme.palette.backgroundImage})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh', maxWidth: '1000px', width: '100%',
                }} />
        </Box>
    );
};
