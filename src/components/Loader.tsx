import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "200px" }}>
            <CircularProgress sx={{color: '#5B94FE'}} size={60}/>
        </Box>
    )
};