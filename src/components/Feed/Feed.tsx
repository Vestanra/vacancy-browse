import { useParams } from "react-router-dom";
import { useFeedByIdQuery } from "../../hooks/useFeedByIdQuery";
import { FeedHeader } from "./FeedHeader";
import { FeedSection } from "./FeedSection";
import { FeedInfo } from "./FeedInfo";
import { FeedKeyWords } from "./FeedKeyWords";
import { FeedMatchedCases } from "./FeedMatchedCases";
import { FeedMatchedBlogs } from "./FeedMatchedBlogs";
import { Loader } from "../Loader";
import { useState } from "react";
import { useUpdateFeedQuery } from "../../hooks/useUpdateFeedQuery";

export const FeedById = () => {
    const { id } = useParams<{ id: string }>();
    const { mutate, } = useUpdateFeedQuery();
    
    const { data, isLoading, } = useFeedByIdQuery(id as string);
    const [matchedBlogs, setMatchedBlogs] = useState([]);
    const [matchedCases, setMatchedCases] = useState([]);

    const handleClick = () => {
        if (matchedBlogs.length === 0 && matchedCases.length === 0) return;
        
        const newMatchedBlogs = matchedBlogs.map(el => ({ link: el, selected: true }));
        const newMatchedCases = matchedCases.map(el => ({ link: el, selected: true }));
        
        const params = {
            matchedBlogs: newMatchedBlogs,
            matchedCases: newMatchedCases,
        }

        if (id) {
            mutate({ id, params });
            setMatchedBlogs([]);
            setMatchedCases([]);
        }
    };

    return (
        <>
            {isLoading
                ? <Loader />
                : <div>
                    <FeedHeader
                        handleClick={handleClick}
                        title={data?.title}
                    />
                    <div>
                        <FeedSection title={"Project info"}>
                            <FeedInfo data={data} />
                        </FeedSection>
                        {data?.keywords &&
                            <FeedSection title={"Keywords"}>
                                <FeedKeyWords data={data} />
                            </FeedSection>
                        }
                        {data?.matchedCasesData &&
                            <FeedSection title={"Matched cases"}>
                                <FeedMatchedCases
                                    data={data?.matchedCasesData}
                                    matchedItem={matchedCases}
                                    setMatchedItem={setMatchedCases}
                                />
                            </FeedSection>
                        }
                        {data?.matchedBlogsData &&
                            <FeedSection title={"Matched blogs"}>
                                <FeedMatchedBlogs
                                    data={data?.matchedBlogsData}
                                    setMatchedItem={setMatchedBlogs}
                                    matchedItem={matchedBlogs}
                                />
                            </FeedSection>
                        }
                    </div>
                </div>
            }
        </>
    )
};
