import { getFormattedDate, getScoreColor } from "../helpers/functions";
import { useThemeContext } from "../helpers/styles/ThemeContextProvider";
import { useTheme } from "@emotion/react";
import { IUpworkFeedDetailItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";
import { useState } from "react";

interface FeedInfoProps {
    data: IUpworkFeedDetailItemDTO | undefined; 
}

export const FeedInfo: React.FC<FeedInfoProps> = ({ data }) => {
    const { themeMode } = useThemeContext();
    const theme: any = useTheme();
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    const score = data?.score;

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    const getTruncatedText = (text: string) => {
        if (isExpanded) return text;
        return text.length > 470 ? text.slice(0, 470) + '...' : text;
    };

    return (
        <>
            {data &&
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
                        <div style={{ display: "flex", textAlign: "center", justifyContent: "space-between", gap: "16px" }}>
                            {score && <div
                                style={{
                                    display: 'inline-block',
                                    width: "37px",
                                    height: '28px',
                                    padding: '2px 8px',
                                    lineHeight: '26px',
                                    fontSize: '16px',
                                    borderRadius: '20px',
                                    backgroundColor: getScoreColor(score, themeMode),
                                    color: theme.palette.primary.dark,
                                    fontWeight: '500',
                                }}
                            >
                                {score}
                            </div>}
                            <h2 style={{
                                maxWidth: "573px",
                                margin: "0",
                                color: theme.palette.primary.contrastText,
                                fontSize: '16px',
                                fontWeight: '400',
                                textAlign: "left",
                            }}
                            >{data?.title}</h2>
                        </div>
                        <div style={{ color: theme.palette.gray.G700 }}>{getFormattedDate(data.published)}</div>
                    </div>
                    <div>
                        <div style={{
                            height: isExpanded ? 'auto' : '144px',
                            overflow: isExpanded ? 'visible' : 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            padding: "8px 0",
                        }}>
                            {getTruncatedText(data.description)}
                        </div>
                        {data.description.length > 470 &&
                            <button
                                onClick={toggleExpand}
                                style={{
                                    border: "none", backgroundColor: "inherit", padding: "0",
                                    color: theme.palette.primary.contrastText,
                                    fontSize: '16px', fontWeight: '400', textDecoration: 'underline', cursor: "pointer",
                                }}
                            >{isExpanded ? 'Collapse' : 'Expand'}</button>}
                    </div>
                </div>
            }
        </>
    )
};