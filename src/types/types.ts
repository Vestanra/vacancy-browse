import { PaletteOptions } from "@mui/material";
import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { UpworkFeedSortBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { IChatItem } from "../interfaces-submodule/interfaces/dto/chat/dto/ichat-item";
import { IUpworkFeedItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { IUpworkFeedMatchEntityDto } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-match-entity.dto";
import { IUpworkResponseListFeedsDto } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";

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
  setSelected: (prev: string[]) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  feedsData: IUpworkFeedItemDTO[];
  setSelectedScore: (prev: string[]) => void;
  setSelectedTitle: (prev: string) => void;
  setSelectedReview: (prev: string[]) => void;
  setCurrentPage: (prev: number) => void;
};

export interface ScoreSelectProps {
  selected: string[];
  setSelected: (prev: string[]) => void;
  setSelectedKeyWords: (prev: string[]) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: string) => void;
  setSelectedReview: (prev: string[]) => void;
  setCurrentPage: (prev: number) => void;
};

export interface DataSelectProps {
  setSelectedScore: (prev: string[]) => void;
  setSelectedKeyWords: (prev: string[]) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: string) => void;  
  setSelectedReview: (prev: string[]) => void;
  setCurrentPage: (prev: number) => void;
};

export interface TitleSelectProps {
  setSelectedScore: (prev: string[]) => void;
  setSelectedKeyWords: (prev: string[]) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  selectTitle: string;
  setSelectedTitle: (prev: string) => void;
  setSelectedReview: (prev: string[]) => void;
  setCurrentPage: (prev: number) => void; 
};

export interface SelectDirectionProps {
  setParams: (params: Partial<FeedsParams> | {}) => void;
  sortBy: UpworkFeedSortBy;
};

export interface TableHeaderProps {
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: string) => void;
  setSelectedKeyWords: (prev: string[]) => void;
  setSelectedScore: (prev: string[]) => void;
  setSelectedReview: (prev: string[]) => void;
};

export interface ReviewSelectProps {
  setSelectedScore: (prev: string[]) => void;
  setSelectedKeyWords: (prev: string[]) => void;
  setParams: (params: Partial<FeedsParams> | {}) => void;
  setSelectedTitle: (prev: string) => void;
  setSelectedReview: (prev: string[]) => void;
  selectedReview: string[];
  setCurrentPage: (prev: number) => void;
};

export interface TableFooterProps {
  data?: IUpworkResponseListFeedsDto;
  selectedItemsPerPage: number;
  setSelectedItemsPerPage: (prev: number) => void; 
  setParams: (params: Partial<FeedsParams> | {}) => void;
  currentPage: number;
  setCurrentPage: (prev: number) => void; 
};

export interface SelectedItemsPerPageProps {
  selectedItemsPerPage: number;
  setSelectedItemsPerPage: (prev: number) => void; 
  setParams: (params: Partial<FeedsParams> | {}) => void;
};

export interface ItemsPerPageOption {
    value: number; 
    label: string;
};

export interface FeedInfoProps {
    data: IUpworkFeedMatchEntityDto[]; 
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
  setIsModal: (prev: boolean) => void; 
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
  setIsFetching: (prev: boolean) => void;
};

export interface CustomPaletteOptions extends PaletteOptions {
  blue?: {
      B100?: string;
      BA300?: string;
  },  
  gray?: {
    G100?: string;
    G300?: string;
    G200?: string;
    G400?: string;
    G600?: string;
    G700?: string;
    G800?: string;
  },
  alertError?: {
    E200?: string;
    E600?: string;
  };
  alertWarning?: {
    E200?: string;
    E600?: string;
  };
  alertInfo?: {
    E200?: string;
    E600?: string;
  };
  alertSuccess?: {
    E200?: string;
    E600?: string;
  };
};