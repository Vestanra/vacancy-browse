import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { getFormattedDate } from "../helpers/functions";
import sprite from "../../images/svg/sprite.svg";
import { FeedInfoProps } from "../helpers/types";

const key = ["Tags", "Categories", "Published"];

export const FeedMatchedBlogs: React.FC<FeedInfoProps> = ({ data, matchedItem, setMatchedItem }) => {
    const theme: any = useTheme();

    const handleSelect = (url: string) => {
        setMatchedItem((prev: any) => {
            if (prev.includes(url)) {
                return prev.filter((el: any) => el !== url);
            } else {
                return [...prev, url];
            }
        });
    };

    return (
        <ul style={{ listStyleType: 'none', padding: "0 0 8px 0", margin: "0", fontSize: "14px", }}>
            {data
                && data.map((el: any) => (
                    <li key={el.docId} style={{
                        padding: "8px",
                        borderBottom: `1px dashed ${theme.palette.gray.G300}`
                    }} >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
                            <div>
                                <h2 style={{ margin: "0 0 12px 0" }}>
                                    <a href={el.link} target="_blank" rel="noopener noreferrer"
                                        style={{
                                            color: theme.palette.primary.contrastText,
                                            fontSize: '16px',
                                            fontWeight: '400',
                                        }}
                                    >{el.title}</a>
                                </h2>
                                {key.map((key) => {
                                    const item = el.infoBlock?.find((i: any) => i.key === key && i.value !== "");
                                    if (!item) return null;
                                    const value = key === "Published" ? getFormattedDate(item.value) : item.value;
                                
                                    return (
                                        <div key={key} style={{ display: "flex", gap: "8px" }}>
                                            <div style={{ width: "101px", flexShrink: 0, fontSize: "14px", color: theme.palette.gray.G600 }}>{item.key}: </div>
                                            <div>{value}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div onClick={() => handleSelect(el.link)}>
                                {matchedItem.includes(el.link)
                                    ? <svg width={20} height={20}><use href={`${sprite}#is-select`} /></svg>
                                    : <Box sx={{ width: "20px", height: "20px", border: `2px solid ${theme.palette.gray.G400}`, borderRadius: "2px" }}></Box>
                                }
                            </div>
                        </div>
                    </li>
                ))}
        </ul>
    )
};