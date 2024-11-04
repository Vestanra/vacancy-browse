import Select, { GroupBase, components  } from "react-select";
import { KeywordOption, ReviewSelectProps, } from "../helpers/types";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import sprite from "../../images/svg/sprite.svg";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { getDisplayValue, getFormattedKeywords } from "../helpers/functions";

export const ReviewSelect: React.FC<ReviewSelectProps> = ({ setParams, setSelectedScore, setSelectedKeyWords, setSelectedTitle, selectedReview, setSelectedReview, setCurrentPage }) => {

    const theme: any = useTheme();    
    const initialValue = ["Like", "Dislike"];

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            height: '44px',
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.main,
            padding: "0",
            paddingRight: "12px",
            fontSize: "14px",
            fontWeight: '400',
            border: `1px solid ${state.isFocused ? theme.palette.primary.contrastText : theme.palette.gray.G400}`,
            boxShadow: state.isFocused && 'none',
            '&:hover': {
                border: `1px solid ${theme.palette.primary.contrastText}`,
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.main,
            fontSize: "14px",
            fontWeight: '500',
            padding: 0,
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            padding: 0,
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: theme.palette.primary.dark,
            fontSize: "14px",
            fontWeight: "400",
            padding: "0",
            margin: "0",
            textAlign: "start",
        }),
    };
    
    const CustomOption = (props: any) => {
        const { data } = props;       
        const isAllOption = data.value === "ALL" && selectedReview.length === initialValue.length
        const notAllSelect = data.value === "ALL" && selectedReview.length < initialValue.length && selectedReview.length > 0;
        const isSelected = selectedReview.includes(data.value) || isAllOption;

        let content;
        if (notAllSelect) {
            content = <svg width={20} height={20}><use href={`${sprite}#not-select`} /></svg>
        } else {
            content = <Box sx={{ width: "20px", height: "20px", border: `2px solid ${theme.palette.gray.G400}`, borderRadius: "2px" }}></Box>
        }

        if (isSelected) {
            content = <svg width={20} height={20}><use href={`${sprite}#is-select`} /></svg>
        }

        return (
            <components.Option {...props}>
                <Box sx={{ display: "flex", gap: "8px" }}>{ content }<span>{data.label}</span></Box>
            </components.Option>
        );
    };

    const CustomDropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <svg width={16} height={16} color={theme.palette.gray.G400}><use href={`${sprite}#select`} /></svg>
            </components.DropdownIndicator>
        );
    };

    return (
        <Select<KeywordOption, true, GroupBase<KeywordOption>>
            isMulti
            name="score"
            options={getFormattedKeywords(initialValue)}
            placeholder={getDisplayValue(selectedReview, initialValue)}
            isSearchable={false}
            onChange={(word) => {                
                let newWords = word.map(el => el.value)
                let searchWord: string[] = [];

                if (newWords.includes("ALL")) {
                    selectedReview.length > 0 ? searchWord = [] : searchWord = initialValue;
                } else {
                    searchWord = [...selectedReview];
                    newWords.forEach((newWord) => {
                        const index = searchWord.indexOf(newWord);
                        if (index !== -1) {
                            searchWord.splice(index, 1);
                        } else {
                            searchWord.push(newWord);
                        }
                    });
                }
                setSelectedReview(searchWord)
                setSelectedScore([]); 
                setSelectedKeyWords([]);
                setSelectedTitle('')
                setCurrentPage(1)
                
                setParams((prevParams: any) => {
                    if (searchWord.length === 0) {
                        const { searchParameters, ...rest } = prevParams;
                        return { ...rest };
                    }
                    return {
                        ...prevParams,
                        pageNumber: 1,
                        searchParameters: [
                            {
                                searchQuery: searchWord,
                                searchBy: UpworkFeedSearchBy.Review
                            }
                        ],
                    };
                });
            }}
            styles={customStyles}
            components={{                
                Option: CustomOption,
                IndicatorSeparator: () => null,
                DropdownIndicator: CustomDropdownIndicator,
            }}
        />
    );
};