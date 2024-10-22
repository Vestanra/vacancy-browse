import { useQuery } from "@tanstack/react-query";
import { useFeeds } from "./hooks/useFeeds";

export const Feeds = () => {
    const allFeeds = useFeeds();
    const { data, error, isLoading } = useQuery({
        queryKey: ['feeds'],
        queryFn: allFeeds,
    })

    console.log(data)

    const handleGetFeeds = async() => {
        const a = await allFeeds({pageNumber: 2})
        console.log(a)
    };

    return (
        <>
            <div>Feeds</div>
            <button type="button" onClick={handleGetFeeds}>get feeds</button>
        </>
    )
}