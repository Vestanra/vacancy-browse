import { useParams } from "react-router-dom";

export const FeedPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>Feed by id - { id }</div>
    )
}