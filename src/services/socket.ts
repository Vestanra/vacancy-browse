import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { MessagesRoutesEnum } from "../interfaces-submodule/enums/routes/messages-routes.enum";
import { ISubscriptionToChatMessagesDTO } from "../interfaces-submodule/interfaces/dto/message/isubscription-to-chat-messages.dto";

export const socketUrl = `${process.env.REACT_APP_BASE_URL}${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}`;

export const handleDisconnect = (socket: any, requestBody: ISubscriptionToChatMessagesDTO) => {
    socket.emit("unsubscribe", requestBody);
    socket.off("chat_response");
    console.log("disconnect", requestBody.chatId);    
};

export const handleConnect = (socket: any, requestBody: ISubscriptionToChatMessagesDTO) => {
    socket.emit("subscribe", requestBody);
    console.log("connect", requestBody.chatId)
};