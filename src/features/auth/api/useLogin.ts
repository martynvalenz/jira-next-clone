import { useMutation } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type RequestType = InferRequestType<typeof client.api.auth.login['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async(json) => {
      const res = await client.api.auth.login['$post']({json});
      if(!res.ok) {
        throw new Error('Failed to login');
      }
      return await res.json();
    },
    onSuccess: () => {
      router.refresh();
      toast.success('Logged in successfully');
    },
    onError: () => {
      toast.error('Failed to login');
    }
  });

  return mutation;
};