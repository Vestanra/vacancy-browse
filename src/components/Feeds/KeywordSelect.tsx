import Select, { GroupBase, components  } from "react-select";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import sprite from "../../images/svg/sprite.svg";
import "../helpers/styles/overflow.css"
import { getDisplayValue, getFormattedKeywords, getUniqueKeywords } from "../helpers/functions";
import { KeywordOption, KeywordSelectProps } from "../../types/types";

export const KeywordSelect: React.FC<KeywordSelectProps> =
    ({ setParams, feedsData, selected: selectedKeyWords, setSelected: setSelectedKeyWords, setSelectedScore, setSelectedTitle, setSelectedReview, setCurrentPage }) => {

        const [initialValue, setInitialValue] = useState<string[]>([]);
        const theme: any = useTheme();

        useEffect(() => {
            if (feedsData.length > 0) {
                const newValue = getUniqueKeywords(feedsData);
                setInitialValue(newValue);
            }
        }, [feedsData]);

        const customStyles = {
            control: (provided: any, state: any) => ({
                ...provided,
                height: '44px',
                cursor: "pointer",
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.main,
                padding: "0 12px 0 0px",
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
                fontWeight: '400',
                padding: 0,
                textAlign: 'left',
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
            const isAllOption = data.value === "ALL" && selectedKeyWords.length === initialValue.length
            const notAllSelect = data.value === "ALL" && selectedKeyWords.length < initialValue.length && selectedKeyWords.length > 0;
            const isSelected = selectedKeyWords.includes(data.value) || isAllOption;

            let content;
            if (notAllSelect) {
                content = <svg width={20} height={20} style={{flexShrink: "0"}}><use href={`${sprite}#not-select`} /></svg>
            } else {
                content = <Box sx={{ width: "20px", height: "20px", border: `2px solid ${theme.palette.gray.G400}`, borderRadius: "2px", flexShrink: "0" }}></Box>
            }

            if (isSelected) {
                content = <svg width={20} height={20} style={{flexShrink: "0"}}><use href={`${sprite}#is-select`} /></svg>
            }

            return (
                <components.Option {...props}>
                    <Box sx={{ display: "flex", gap: "8px" }}>{content}<span>{data.label}</span></Box>
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

        const CustomMenuList = (props: any) => (
            <components.MenuList {...props} className="custom-scrollbar" />
        );

        return (
            <Select<KeywordOption, true, GroupBase<KeywordOption>>
                isMulti
                name="keywords"
                placeholder={getDisplayValue(selectedKeyWords, initialValue)}
                isSearchable={false}
                options={getFormattedKeywords(initialValue)}
                onChange={(word) => {
                    let newWords = word.map(el => el.value)
                    let searchWord: string[] = [];

                    if (newWords.includes("ALL")) {
                        selectedKeyWords.length > 0 ? searchWord = [] : searchWord = initialValue;
                    } else {
                        searchWord = [...selectedKeyWords];
                        newWords.forEach((newWord) => {
                            const index = searchWord.indexOf(newWord);
                            if (index !== -1) {
                                searchWord.splice(index, 1);
                            } else {
                                searchWord.push(newWord);
                            }
                        });
                    }
                
                    setSelectedKeyWords(searchWord)
                    setSelectedScore([])
                    setSelectedTitle('')
                    setSelectedReview([])
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
                                    searchBy: UpworkFeedSearchBy.Keywords
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
                    MenuList: CustomMenuList,
                }}
            />
        );
    };