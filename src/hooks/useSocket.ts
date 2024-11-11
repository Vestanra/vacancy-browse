import { Manager, Socket } from "socket.io-client";
import { NotificationEvents } from "../interfaces-submodule/enums/notification/notification-events.enum";
import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { MessagesRoutesEnum } from "../interfaces-submodule/enums/routes/messages-routes.enum";
import { ISubscriptionToChatMessagesDTO } from "../interfaces-submodule/interfaces/dto/message/isubscription-to-chat-messages.dto";
import { getAccessToken } from "../components/helpers/functions/getTokens";
import { useEffect } from "react";
import { IMessageDTO } from "../interfaces-submodule/interfaces/dto/message/imessage-dto";
import { SocketProps } from "../components/helpers/types";

const manager = new Manager(`${process.env.REACT_APP_BASE_URL}`, {
    transports: ["websocket"],
    timeout: 10000,
});

export const socketUrl = `${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}`;

export const useSocket = ({ id, setMessages, setIsFetching}: SocketProps) => {
    const accessToken = getAccessToken();
    const mySocket = manager.socket(socketUrl);
   
    const handleConnect = (socket: Socket, requestBody: ISubscriptionToChatMessagesDTO) => {
        socket.emit(MessagesRoutesEnum.Subscribe, requestBody);
    };

    const handleDisconnect = (socket: Socket, requestBody: ISubscriptionToChatMessagesDTO) => {
        socket.emit(MessagesRoutesEnum.Unsubscribe, requestBody);
        socket.off(NotificationEvents.ChatResponse);        
    };
    
    useEffect(() => {
        const requestBody: ISubscriptionToChatMessagesDTO = {
            chatId: parseInt(id || '0'),
            accessToken,
        };

        if (!mySocket.connected) {
            mySocket.connect();
        }
        mySocket.on("connect", () => handleConnect(mySocket, requestBody));
        mySocket.on("disconnect", () => handleDisconnect(mySocket, requestBody));
        mySocket.on(NotificationEvents.ChatResponse, (message) => {
            setMessages((prevMessages: IMessageDTO[]) => [...prevMessages, message]);
            setIsFetching(false);           
        });

        return () => {
            if (mySocket) {
                handleDisconnect(mySocket, requestBody);
                mySocket.disconnect();
            }
        };
    }, [id, accessToken, mySocket, setMessages, setIsFetching]);
};