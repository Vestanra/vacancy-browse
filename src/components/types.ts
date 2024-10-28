import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { UpworkFeedSortBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { IUpworkFeedItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

export enum SortDirection {
  Ascending = "asc",
  Descending = "desc",
}

export interface FeedsParams {
  pageSize?: number;
  pageNumber?: number;
  sortDirection?: SortDirection;
  searchParameters?: Array<{
    searchQuery: string[] | string;
    searchBy: UpworkFeedSearchBy; 
  }>;
  sortBy?: UpworkFeedSortBy;
};

export interface KeywordOption {
    label: string;
    value: string;
};

export interface KeywordSelectProps {
  selectedValue: string[];
  setSelectedValue: (prev: any) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  feedsData: IUpworkFeedItemDTO[];
};
