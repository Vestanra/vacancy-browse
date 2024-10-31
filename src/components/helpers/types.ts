import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { IUpworkFeedItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";

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
  selected: string[];
  setSelected: (prev: any) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  feedsData: IUpworkFeedItemDTO[];
  setSelectedScore: (prev: any) => void;
  setSelectedTitle: (prev: any) => void;
  setSelectedReview: (prev: any) => void;
  setCurrentPage: (prev: any) => void;
};

export interface ScoreSelectProps {
  selected: string[];
  setSelected: (prev: any) => void;
  setSelectedKeyWords: (prev: any) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: any) => void;
  setSelectedReview: (prev: any) => void;
  setCurrentPage: (prev: any) => void;
};

export interface DataSelectProps {
  setSelectedScore: (prev: any) => void;
  setSelectedKeyWords: (prev: any) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: any) => void;  
  setSelectedReview: (prev: any) => void;
  setCurrentPage: (prev: any) => void;
};

export interface TitleSelectProps {
  setSelectedScore: (prev: any) => void;
  setSelectedKeyWords: (prev: any) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  selectTitle: string;
  setSelectedTitle: (prev: any) => void;
  setSelectedReview: (prev: any) => void;
  setCurrentPage: (prev: any) => void; 
};

export interface SelectDirectionProps {
  setParams: (params: Partial<FeedsParams> | {}) => void;
  sortBy: UpworkFeedSortBy;
};

export interface TableHeaderProps {
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: any) => void;
};

export interface ReviewSelectProps {
  setSelectedScore: (prev: any) => void;
  setSelectedKeyWords: (prev: any) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: any) => void;
  setSelectedReview: (prev: any) => void;
  selectedReview: string[];
  setCurrentPage: (prev: any) => void;
};

export interface TableFooterProps {
  data?: IUpworkResponseListFeedsDto;
  selectedItemsPerPage: number;
  setSelectedItemsPerPage: (prev: any) => void; 
  setParams: (params: Partial<FeedsParams> | {}) => void;
  currentPage: number;
  setCurrentPage: (prev: any) => void; 
};

export interface SelectedItemsPerPageProps {
  selectedItemsPerPage: number;
  setSelectedItemsPerPage: (prev: any) => void; 
  setParams: (params: Partial<FeedsParams> | {}) => void;
};

export interface ItemsPerPageOption {
    value: number; 
    label: string;
}
