export const inputStyles = {
    background: 'transparent',
    height: '60px',
    width: '320px',
    borderRadius: '8px',
    '& .MuiFilledInput-root': {
        background: 'transparent',
        '&:before': { display: 'none' },
        '&:after': { display: 'none' },
        '&:hover': {
            background: 'transparent', 
        },
        '&.Mui-focused': {
            background: 'transparent', 
        },
    },
    '& .MuiFilledInput-input': {
        background: 'transparent',        
    },        
};