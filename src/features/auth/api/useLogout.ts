import { useMutation } from '@tanstack/react-query';
import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.auth.logout['$post']>;

export const useLogout = () => {
  const router = useRouter();
  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async(json) => {
      const res = await client.api.auth.logout['$post']({json});
      if(!res.ok) {
        throw new Error('Failed to logout');
      }
      return await res.json();
    },
    onSuccess: () => {
      // window.location.reload();
      router.refresh();
      toast.success('Logged out successfully');
    },
    onError: () => {
      toast.error('Failed to logout');
    }
  });

  return mutation;
};