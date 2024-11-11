import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { IChatItem } from "../../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import { IUpworkFeedItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { IUpworkResponseListFeedsDto } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";

export enum SortDirection {
  Ascending = "asc",
  Descending = "desc",
}
//Feeds

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
};

export interface FeedInfoProps {
    data: any; 
    setMatchedItem: (prev: any) => void;
    matchedItem: string[];
};

export interface FeedHeaderProps {
    handleClick: (e: any) => void;
    title: string | any; 
    matchedBlogs: string[];
    matchedCases: string[];
}

//Sidebar

export interface PopoverButtonsProps {
  setIsRenameAction: (prev: any) => void;
  id: number;
  handleOpenModal: (prev: any) => void;
};

export interface ModalDeleteProps {
  name: string;
  isModal: boolean; 
  setIsModal: (prev: any) => void; 
  handleDelete: (prev: any) => void; 
};

//chat

export type IChatItemsArray = IChatItem[];

export interface FetchMessagesProps {
  id: string | undefined;
  setMessages: (prev: any) => void;
};

export interface SocketProps {
  id: string | undefined;
  setMessages: (prev: any) => void;
  setIsFetching: (prev: any) => void;
};
