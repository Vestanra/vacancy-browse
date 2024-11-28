import Select, { GroupBase, components } from "react-select"
import { useTheme } from "@emotion/react";
import sprite from "../../images/svg/sprite.svg";
import { optionsItemsPerPage } from "../helpers/defultValue/defaultParamas";
import { ItemsPerPageOption, SelectedItemsPerPageProps } from "../../types/types";

export const SelectedItemsPerPage: React.FC<SelectedItemsPerPageProps> = ({ selectedItemsPerPage, setSelectedItemsPerPage, setParams }) => {
    const theme: any = useTheme();    

    const CustomDropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <svg width={16} height={16} color={theme.palette.gray.G400}><use href={`${sprite}#select`} /></svg>
            </components.DropdownIndicator>
        );
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            width: "100px",
            height: "48px",
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.main,
            padding: "0",
            paddingRight: "12px",
            fontSize: "14px",
            fontWeight: '400',
        }),
        menu: (provided: any) => ({
            ...provided,
            width: "100px",
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.main,
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            padding: 0,
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: theme.palette.primary.dark, 
            fontSize: "14px",             
            fontWeight: "500",
        }),
    };

    return (
        <Select<ItemsPerPageOption, false, GroupBase<ItemsPerPageOption>>
            options={optionsItemsPerPage}
            placeholder={selectedItemsPerPage.toString()}
            menuPlacement="top"
            isSearchable={false}
            styles={customStyles}
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: CustomDropdownIndicator,
            }}
            onChange={(value) => {
                const pageSize = value?.value;
                if(pageSize) setSelectedItemsPerPage(pageSize);                
                setParams((prev: any) => ({
                    ...prev,
                    pageSize,
                }));
            }
            }
        />
    )
}