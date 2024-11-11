import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { IMessageDTO } from "../../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { Loader } from "../Loader";
import sprite from "../../images/svg/sprite.svg";
import { useTheme } from "@emotion/react";
import { Button, CustomTextarea, Form, FormWrap, Li, } from "../helpers/styles/ChatItem.styled";
import { useMessage } from "../../hooks/useMessages";
import { selectUserId, useAppSelector } from "../../redux/selectors";
import { useFetchMessages } from "../../hooks/useFetchMessages";

export const ChatItem = () => {
    const theme: any = useTheme();
    const chatListRef = useRef<HTMLUListElement>(null);
    const accountId = useAppSelector(selectUserId);
    
    const [content, setContent] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [messages, setMessages] = useState<IMessageDTO[]>([]);    

    const { id } = useParams<{ id: string }>();
    const { sendMessage } = useMessage();   
    const { isLoading } = useFetchMessages({id, setMessages});
    useSocket({ id: id || '', setMessages, setIsFetching });

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [messages, isFetching]);
        
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
        setMessages((prev => [...prev, {
            id: Date.now().toString(),
            content,
            created: new Date(Date.now()).toISOString(),
            isBot: false,
            accountId,
            chatId: parseInt(id || '0'),
        }
        ]));
        setIsFetching(true)
    };

    return (
        <>
            {isLoading
                ? <Loader />
                : <div style={{ display: "flex", flexDirection: "column", height: "100vh", }}>
                    <ul className="custom-scrollbar" ref={chatListRef}
                        style={{ width: "800px", margin: "0 auto", flex: "1", overflowY: "auto" }}>
                        {messages.length > 0 && messages.map((el) => (
                            el.isBot
                                ? <Li key={el.id} style={{ backgroundColor: theme.palette.gray.G200 }}>
                                    <svg width={24} height={24} style={{ color: theme.palette.primary.contrastText, flexShrink: "0" }}><use href={`${sprite}#subtract`} /></svg>
                                    <div>{el.content}</div>
                                </Li>
                                : <Li key={el.id} style={{ border: `1px solid ${theme.palette.gray.G300}` }}>
                                    <svg width={24} height={24} color={theme.palette.gray.G600} style={{ flexShrink: "0" }}><use href={`${sprite}#chat-avatar`} /></svg>
                                    <div>{el.content}</div>
                                </Li>
                        ))}
                        {isFetching &&
                            <Li style={{ backgroundColor: theme.palette.gray.G200, }}>
                                <svg width={24} height={24} style={{ color: theme.palette.primary.contrastText, flexShrink: "0" }}><use href={`${sprite}#subtract`} /></svg>
                                <div>looking for answer...</div>
                            </Li>}
                    </ul>
                    <FormWrap
                        style={{ backgroundColor: theme.palette.gray.G100 }}>
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
                                style={{ backgroundColor: content ? theme.palette.primary.contrastText : "transparent" }}
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