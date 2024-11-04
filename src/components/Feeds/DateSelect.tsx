import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../helpers/styles/datePickerStyle.css';
import { DataSelectProps } from "../helpers/types";
import { UpworkFeedSearchBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-search-by.enum";

export const DateSelect: React.FC<DataSelectProps> =
    ({ setParams, setSelectedScore, setSelectedKeyWords, setSelectedTitle, setSelectedReview, setCurrentPage }) => {
        const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
        const [startDate, endDate] = dateRange;
            
        useEffect(() => {
            if (startDate && endDate) {
                const formattedDateRange = `${startDate.toISOString()} - ${endDate.toISOString()}`;
                setSelectedKeyWords([]);
                setSelectedScore([]);
                setSelectedTitle('');
                setSelectedReview([]);
                setCurrentPage(1);
                setParams((prev: any) => ({
                    ...prev,
                    pageNumber: 1,
                    searchParameters: [
                        {
                            searchQuery: formattedDateRange,
                            searchBy: UpworkFeedSearchBy.Published
                        }
                    ],
                }));
            }
        }, [dateRange, endDate, setCurrentPage, setParams, setSelectedKeyWords, setSelectedReview, setSelectedScore, setSelectedTitle, startDate]);

        return (
            <DatePicker
                selectsRange
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                onChange={(update: [Date | null, Date | null]) => {
                    setDateRange(update);
                }}
                isClearable
                fixedHeight={true}
                maxDate={new Date()}
                calendarStartDay={1}
            />
        );
    };
