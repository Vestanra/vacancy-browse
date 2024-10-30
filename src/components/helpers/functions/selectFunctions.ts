import { IUpworkFeedItemDTO } from "../../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

export const calculateKeyWords = (arr: IUpworkFeedItemDTO[]) => {
    const keyArr = arr.map(el => el.keywords).flat().filter(Boolean)
    return [...new Set(keyArr)]
};

export const formattedKeywords = (arr: string[]) => {
    if (arr.length === 0) return []
    return [
        { label: 'ALL', value: 'ALL' },
        ...arr.map(el => ({ label: el, value: el }))
    ];
};

export const displayValue = (value: string[], keyWords: string[]) => {
        if (value.length === 0 || value.length === keyWords.length) return "ALL";
        if (value.length === 1) return value[0];
        return `${value.length} selected`;
};
