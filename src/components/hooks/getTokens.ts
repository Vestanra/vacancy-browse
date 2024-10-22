export const getTokens = () => {
    const tokens = localStorage.getItem('token');
    if (tokens === null || tokens === "") {
            return null;
    };
    return JSON.parse(tokens);
}

export const getAccessToken = () => {
    const tokens = localStorage.getItem('token');
    if (tokens === null || tokens === "") {
        return null;
    };
    const data = JSON.parse(tokens);
    console.log(data.accessToken)
    return data.accessToken    
}

export const getRefreshToken = () => {
    const tokens = localStorage.getItem('token');
    if (tokens === null || tokens === "") {
        return null;
    };
    const data = JSON.parse(tokens);
    return data.refreshToken    
}