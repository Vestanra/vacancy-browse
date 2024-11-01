import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateFeed } from "./useUpdateFeed";

export const useUpdateFeedQuery = () => {
    const queryClient = useQueryClient();
    const updateFeedById = useUpdateFeed();

    return useMutation({
        mutationFn: ({ id, params }: { id: string; params: {} }) => updateFeedById(id, params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feeds'] });
        },
        onError: (error: any) => {
            console.error('Error: ', error);
        }
    });
};