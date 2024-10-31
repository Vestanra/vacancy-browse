export const getDisplayValue = (value: string[], keyWords: string[]) => {
        if (value.length === 0 || value.length === keyWords.length) return "ALL";
        if (value.length === 1) return value[0];
        return `${value.length} selected`;
};