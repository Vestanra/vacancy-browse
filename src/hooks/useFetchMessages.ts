import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { getMessages } from "../services/messageService";
import { refreshUser } from "../redux/operationsAuth";
import { FetchMessagesProps } from "../components/helpers/types";

export const useFetchMessages = ({ id, setMessages}: FetchMessagesProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const data = await getMessages(id);
        setMessages(data);
      } catch (err: any) {
        if (err.status === 401 || err.status === 403) {
          await dispatch(refreshUser());
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [dispatch, id, setMessages]);

  return { isLoading };
};