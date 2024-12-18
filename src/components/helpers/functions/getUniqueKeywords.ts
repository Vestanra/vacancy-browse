import { IUpworkFeedItemDTO } from "../../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

export const getUniqueKeywords = (arr: IUpworkFeedItemDTO[]) => {
    const keyArr = arr.map(el => el.keywords).flat().filter(Boolean)
    return [...new Set(keyArr)]
};