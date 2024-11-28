export const getAccessToken = () => {
    const tokens = localStorage.getItem('token');
    if (tokens === null || tokens === "") {
        return null;
    };
    const data = JSON.parse(tokens);
    return data.accessToken
};

export const getRefreshToken = () => {
    const tokens = localStorage.getItem('token');
    if (tokens === null || tokens === "") {
        return null;
    };
    const data = JSON.parse(tokens);
    return data.refreshToken
};