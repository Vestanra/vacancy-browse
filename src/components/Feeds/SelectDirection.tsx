import { useTheme } from "@emotion/react";
import sprite from "../../images/svg/sprite.svg";
import { SelectDirectionProps } from "../helpers/types";
export const SelectDirection: React.FC<SelectDirectionProps> = ({setParams, sortBy}) => {
    const theme: any = useTheme();   
    const handleClick = () => {
        setParams((prev: any) => ({
            ...prev,
            sortDirection: prev.sortDirection === "desc" ? "asc" : "desc",
            sortBy,
        }));
    };

    return (
        <div onClick={handleClick}>
            <svg width={16} height={16} color={theme.palette.gray.G400}><use href={`${sprite}#sort-select`} /></svg>  
          </div>    
    )
}