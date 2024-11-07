import { NotificationEvents } from "../interfaces-submodule/enums/notification/notification-events.enum";
import { BaseRoutes } from "../interfaces-submodule/enums/routes/base-routes.enum";
import { MessagesRoutesEnum } from "../interfaces-submodule/enums/routes/messages-routes.enum";
import { ISubscriptionToChatMessagesDTO } from "../interfaces-submodule/interfaces/dto/message/isubscription-to-chat-messages.dto";

export const socketUrl = `${process.env.REACT_APP_BASE_URL}${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}`;

export const handleDisconnect = (socket: any, requestBody: ISubscriptionToChatMessagesDTO) => {
    socket.emit(MessagesRoutesEnum.Unsubscribe, requestBody);
    socket.off(NotificationEvents.ChatResponse);
};

export const handleConnect = (socket: any, requestBody: ISubscriptionToChatMessagesDTO) => {
    socket.emit(MessagesRoutesEnum.Subscribe, requestBody);
};