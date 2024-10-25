import { useMutation } from '@tanstack/react-query';
import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<typeof client.api.auth.logout['$post']>;

export const useLogout = () => {
  const router = useRouter();
  const mutation = useMutation<
    ResponseType,
    Error
  >({
    mutationFn: async(json) => {
      const res = await client.api.auth.logout['$post']({json});
      return await res.json();
    },
    onSuccess: () => {
      // window.location.reload();
      router.refresh();
    }
  });

  return mutation;
};