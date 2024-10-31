import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { toast } from 'sonner';

type RequestType = InferRequestType<typeof client.api.workspaces['$post']>['form'];
type ResponseType = InferResponseType<typeof client.api.workspaces['$post']>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async(form) => {
      const res = await client.api.workspaces['$post']({form});
      if(!res.ok) {
        throw new Error('Failed to create workspace');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['workspaces']});
      toast.success('Workspace created successfully');
    },
    onError: () => {
      toast.error('Failed to create workspace');
    }
  });

  return mutation;
};