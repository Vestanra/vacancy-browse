export const getScoreColor = (score: number, themeMode: string) => {
    let backgroundColor;
    if (score >= 80) {
        backgroundColor = themeMode === 'light' ? '#C4E5F5' : '#295266';
    } else if (score >= 60) {
        backgroundColor = themeMode === 'light' ? 'C9F0C9' : '#2D662D';
    } else if (score >= 40) {
        backgroundColor = themeMode === 'light' ? '#F0E4A8' : '#705C0B';
    } else if (score >= 20) {
        backgroundColor = themeMode === 'light' ? '#FAD2B4' : '#6B3920';
    } else {
        backgroundColor = themeMode === 'light' ? '#FAC8D0' : '#7A2C39';
    }
    return backgroundColor
};