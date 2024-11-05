import { useParams } from "react-router-dom"
import { useChatByIdQuery } from "../useChatsQuery";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { getAccessToken } from "../getTokens";

export const ChatItem = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useChatByIdQuery((id as string));
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        const token = getAccessToken();

        console.log("Підключення до чату:", id);

        const newSocket = io('https://trainee-api.chat.abcloudz.com', {
            transports: ['websocket'], 
            auth: {
                token,
            },
        });

        setSocket(newSocket);

        // newSocket.on("connect", () => {
        //     newSocket.emit("join", id);
        //     console.log("connect Socket.IO");
        // });

        // newSocket.on("message", (data: any) => {
        //     console.log("data", data);
        // });

        return () => {
            newSocket.disconnect();
            console.log("disconnect Socket.IO");
        };

    }, [id]);
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        console.log(data)
        e.preventDefault();
        if (message.trim()) {
            //???
            setMessage('');
        }
    }

    return (
        <>
            <div>Id: </div>

            <form onSubmit={handleSubmit}>
                <input type="text" name="message" value={message} onChange={handleChange} />
                <button type="submit">button</button>
            </form>
        </>
    )
};