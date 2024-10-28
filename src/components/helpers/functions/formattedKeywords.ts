export const formattedKeywords = (arr: string[])=> {
    return [
        { label: 'ALL', value: 'ALL' },
        ...arr.map(el => ({ label: el, value: el }))
    ];
}