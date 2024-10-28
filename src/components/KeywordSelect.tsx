import Select, { GroupBase, components  } from "react-select";
import { UpworkFeedSearchBy } from "../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { KeywordOption, KeywordSelectProps } from "./types";
import { formattedKeywords } from "./helpers/functions/formattedKeywords";
import { useEffect, useState } from "react";
import { calculateKeyWords } from "./helpers/functions/calculateKeyWords";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import sprite from "../images/svg/sprite.svg";

export const KeywordSelect: React.FC<KeywordSelectProps> = ({ setParams, feedsData, selectedValue, setSelectedValue }) => {

    const [keyWords, setKeyWords] = useState<string[]>([]);
    const theme: any = useTheme();

    const displayValue = () => {
        if (selectedValue.length === 0 || selectedValue.length === keyWords.length) return "ALL";
        if (selectedValue.length === 1) return selectedValue[0];
        return `${selectedValue.length} selected`;
    };

    useEffect(() => {
        if (feedsData.length > 0) {
            const newKeyWords = calculateKeyWords(feedsData);
            setKeyWords(newKeyWords);
        }
    }, [feedsData]);

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.main, 
            padding: "12px",  
            fontSize: "14px",
            fontWeight: '400',
        }),
        menu: (provided: any) => ({
            ...provided,
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.main,
            fontSize: "14px",
            fontWeight: '500',
        }),
    };
    
    const CustomOption = (props: any) => {
        const { data } = props;       
        const isAllOption = data.value === "All" && selectedValue.length === keyWords.length
        const notAllSelect = data.value === "All" && selectedValue.length < keyWords.length && selectedValue.length > 0;
        const isSelected = selectedValue.includes(data.value) || isAllOption;

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
            name="keywords"
            options={formattedKeywords(keyWords)}
            placeholder={displayValue()}
            onChange={(word) => {                
                let newWords = word.map(el => el.value)
                let searchWord: string[] = [];

                if (newWords.includes("ALL")) {
                    selectedValue.length > 0 ? searchWord = [] : searchWord = keyWords;
                } else {
                    searchWord = [...selectedValue];
                    newWords.forEach((newWord) => {
                        const index = searchWord.indexOf(newWord);
                        if (index !== -1) {
                            searchWord.splice(index, 1);
                        } else {
                            searchWord.push(newWord);
                        }
                    });
                }
                
                setSelectedValue(searchWord) 
                
                setParams((prevParams: any) => {
                    if (searchWord.length === 0) {
                        const { searchParameters, ...rest } = prevParams;
                        return { ...rest };
                    }
                    return {
                        ...prevParams,
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
                MultiValue: () => null,
                ValueContainer: () => <div>{displayValue()}</div>,
                Option: CustomOption,
                IndicatorSeparator: () => null,
                DropdownIndicator: CustomDropdownIndicator,
            }}
        />
    );
};