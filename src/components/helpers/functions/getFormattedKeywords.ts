export const getFormattedKeywords = (arr: string[]) => {
    if (arr.length === 0) return []
    return [
        { label: 'ALL', value: 'ALL' },
        ...arr.map(el => ({ label: el, value: el }))
    ];
};