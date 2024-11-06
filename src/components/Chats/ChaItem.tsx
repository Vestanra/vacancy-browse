import { useParams } from "react-router-dom"
import { io, Socket } from "socket.io-client";
import { useMessagesQuery, useSendMessageQuery } from "../../hooks/useMessagesQuery";
import { getAccessToken } from "../helpers/functions/getTokens";
import { useEffect, useMemo, useState } from "react";
import { handleConnect, handleDisconnect, socketUrl } from "../../services/socket";
import { IMessageDTO } from "../../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { Loader } from "../Loader";
import { TextareaAutosize } from "@mui/material";


export const ChatItem = () => {
    const { id } = useParams<{ id: string }>();
    const [text, setText] = useState<string>("")
    const accessToken = getAccessToken();
    const { data, refetch, isLoading } = useMessagesQuery(id as string);
    const { mutate: sendMessage } = useSendMessageQuery();

    const chatsData: IMessageDTO[] = useMemo(() => {
        return data || []
    }, [data]);

    useEffect(() => { console.log(data) }, [data])

    useEffect(() => {
        const socket: Socket = io(socketUrl, {
            transports: ["websocket"],
            timeout: 10000,
        });

        const requestBody = {
            chatId: parseInt(id || '0'),
            accessToken
        };

        socket.on('connect', () => handleConnect(socket, requestBody));
        socket.on('connect_error', (err) => { console.error('Помилка підключення:', err) });
        socket.on('disconnect', () => handleDisconnect(socket, requestBody));
        socket.on("chat_response", () => refetch());
        
        return () => {
            socket.disconnect();
        };
    }, [accessToken, id, refetch]);
    
    

    const handleClick = () => {
        const chatId = parseInt(id || "0")
        if (!chatId || !text) return;
        const params = {
            chatId,
            content: text
        }
        sendMessage(params);
        setText('')
    };


    return (
        <>
            {isLoading
                ? <Loader />
                : <div>
                    <div>Id: {id}</div>
                    <ul>
                        {chatsData.length > 0 && chatsData.map((el) => {
                            return <li key={el.id}>{el.content}</li>;
                        })}
                    </ul>
                    <form >
                        <TextareaAutosize
                            name="message"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{
                                width: "800px",
                                resize: "none"
                            }}
                        />
                        <button type="button" onClick={handleClick}>button</button>
                    </form>
                </div>
            }
        </>
    )
};