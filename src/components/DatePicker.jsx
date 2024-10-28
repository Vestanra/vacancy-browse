import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './helpers//datePickerStyle.css';


export const DateFilter = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
                setDateRange(update);
            }}
            isClearable={true}
            maxDate={new Date()}
            className="custom-datepicker" 
            calendarClassName="custom-calendar" // Клас для календаря
            wrapperClassName="custom-datepicker-wrapper" // Клас для обгортки
        />
    );
};