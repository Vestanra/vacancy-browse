import { useState, useMemo, useEffect } from "react"
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";
import { debounce } from 'lodash';
import { useTheme } from "@emotion/react";
import { TitleSelectProps } from "../../types/types";

export const TitleSelect: React.FC<TitleSelectProps> =
    ({ setParams, setSelectedScore, setSelectedKeyWords, selectTitle, setSelectedTitle, setSelectedReview, setCurrentPage }) => {
        const [inputValue, setInputValue] = useState<string>(selectTitle);
        const theme: any = useTheme();

        const debouncedSetTitle = useMemo(
            () =>
                debounce((value: string) => {
                    setSelectedTitle(value);
                    setSelectedKeyWords([]);
                    setSelectedScore([]);
                    setSelectedReview([]);
                    setCurrentPage(1);
                    setParams((prev: any) => ({
                        ...prev,
                        pageNumber: 1,
                        searchParameters: [
                            {
                                searchQuery: value,
                                searchBy: UpworkFeedSearchBy.Title
                            }
                        ],
                    }));
                }, 1000),
            [setCurrentPage, setParams, setSelectedKeyWords, setSelectedReview, setSelectedScore, setSelectedTitle]
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            debouncedSetTitle(newValue);
        };

        useEffect(() => {
            return () => {
                debouncedSetTitle.cancel();
            };
        }, [debouncedSetTitle]);

        return (
            <input
                style={{
                    width: '100%', height: "44px", border: `2px solid ${theme.palette.gray.G400}`, borderRadius: '4px', padding: '10px', outline: 'none',
                    backgroundColor: theme.palette.primary.main, color: theme.palette.primary.dark,
                }}
                type="text"
                onFocus={(e) => e.target.style.borderColor =  theme.palette.primary.contrastText} 
                onBlur={(e) => e.target.style.borderColor = theme.palette.gray.G400}
                value={inputValue}
                onChange={handleChange}
            />
        )
    };