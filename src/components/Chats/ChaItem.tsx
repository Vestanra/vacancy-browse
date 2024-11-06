import { useParams } from "react-router-dom"
import { io, Socket } from "socket.io-client";
import { useMessagesQuery, useSendMessageQuery } from "../../hooks/useMessagesQuery";
import { getAccessToken } from "../helpers/functions/getTokens";
import { useEffect, useMemo, useRef, useState } from "react";
import { handleConnect, handleDisconnect, socketUrl } from "../../services/socket";
import { IMessageDTO } from "../../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { Loader } from "../Loader";
import sprite from "../../images/svg/sprite.svg";
import { useTheme } from "@emotion/react";
import { Button, CustomTextarea, Form, FormWrap, Li, } from "../helpers/styles/ChatItem.styled";

export const ChatItem = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [myMessage, setMyMessage] = useState<string>('')
    
    const { data, refetch, isLoading } = useMessagesQuery(id as string);
    const { mutate: sendMessage } = useSendMessageQuery();

    const accessToken = getAccessToken();
    const theme: any = useTheme();
    const chatListRef = useRef<HTMLUListElement>(null);

    const chatsData: IMessageDTO[] = useMemo(() => {
        return data || []
    }, [data]);
    
    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }        
    }, [chatsData, isFetching]);

    useEffect(() => {
        setIsFetching(false);
        setMyMessage('');
    },[chatsData])

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
        socket.on("chat_response", () => {
            refetch();
        });
        
        return () => {
            socket.disconnect();
        };
    }, [accessToken, id, refetch]);
    
    

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const chatId = parseInt(id || "0");
        if (!chatId || !content.trim()) return;

        const params = {
            chatId,
            content
        }

        sendMessage(params);
        setContent('');
        setIsFetching(true);
        setMyMessage(content);
    };

    return (
        <>
            {isLoading
                ? <Loader />
                : <div style={{ display: "flex", flexDirection: "column", height: "100vh", }}>
                    <ul className="custom-scrollbar" ref={chatListRef}
                        style={{ width: "800px", margin: "0 auto", flex: "1", overflowY: "auto" }}>
                        {chatsData.length > 0 && chatsData.map((el) => (
                            el.isBot
                                ? <Li key={el.id} style={{backgroundColor: theme.palette.gray.G200}}>
                                    <svg width={24} height={24} style={{ color: theme.palette.primary.contrastText, flexShrink: "0" }}><use href={`${sprite}#subtract`} /></svg>
                                    <div>{el.content}</div>
                                </Li>
                                : <Li key={el.id} style={{border: `1px solid ${theme.palette.gray.G300}`}}>
                                    <svg width={24} height={24} color={theme.palette.gray.G600} style={{ flexShrink: "0" }}><use href={`${sprite}#chat-avatar`} /></svg>
                                    <div>{el.content}</div>
                                </Li>
                        ))}
                        {isFetching &&                            
                            <Li style={{border: `1px solid ${theme.palette.gray.G300}`}}>
                                <svg width={24} height={24} color={theme.palette.gray.G600} style={{ flexShrink: "0" }}><use href={`${sprite}#chat-avatar`} /></svg>
                                <div>{myMessage }</div>
                            </Li>}
                        {isFetching &&                            
                            <Li style={{backgroundColor: theme.palette.gray.G200, }}>
                                <svg width={24} height={24} style={{ color: theme.palette.primary.contrastText, flexShrink: "0" }}><use href={`${sprite}#subtract`} /></svg>
                                <div>looking for answer...</div>
                            </Li>}
                    </ul>
                    <FormWrap
                        style={{ backgroundColor: theme.palette.gray.G100}}>
                        <Form >
                            <CustomTextarea
                                name="message"
                                value={content}
                                placeholder="Write a question..."
                                onChange={(e) => setContent(e.target.value)}
                                backgroundclr={theme.palette.primary.main}
                                clr={theme.palette.primary.dark}
                                borderclr={theme.palette.gray.G300}
                                hover={theme.palette.primary.contrastText}
                            />
                            <Button
                                onClick={(e) => handleClick(e)}
                                disabled={isFetching}
                                style={{backgroundColor: content ? theme.palette.primary.contrastText : "transparent"}}
                            >
                                <svg width={20} height={20} color={content ? theme.palette.primary.main : theme.palette.gray.G800}><use href={`${sprite}#chat-send`} /></svg>
                            </Button>
                        </Form>
                    </FormWrap>
                </div>
            }
        </>
    );
};