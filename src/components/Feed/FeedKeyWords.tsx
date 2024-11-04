import { Box } from "@mui/material";
import { IUpworkFeedDetailItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";
import { useTheme } from "@emotion/react";
import sprite from "../../images/svg/sprite.svg";

interface FeedInfoProps {
    data: IUpworkFeedDetailItemDTO | undefined; 
}

export const FeedKeyWords: React.FC<FeedInfoProps> = ({ data }) => {
    const theme: any = useTheme();
    const keywords = data?.keywords;
    const type = data?.review?.type
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
            <Box sx={{ display: "flex", flexWrap: "wrap"}}>
                {keywords && keywords.map((keyword) => (
                <Box
                    key={keyword}
                        sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        fontSize: '14px',
                        borderRadius: '20px',
                        backgroundColor: theme.palette.gray.G200,
                        padding: '2px 8px',
                        margin: '4px',
                    }}
                >
                    {keyword}
                </Box>
            ))}
            </Box>
            <div>
                {type === "Like" ? <svg width={20} height={20}><use href={`${sprite}#like`} /></svg> :
                    type === "Dislike" ? <svg width={20} height={20}><use href={`${sprite}#dislike`} /></svg> :
                        null}
            </div>
        </Box>
    );
};