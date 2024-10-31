import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
type RequestType = InferRequestType<typeof client.api.auth.signup['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.auth.signup['$post']>;

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    RequestType,
    RequestType
  >({
    mutationFn: async(json) => {
      const res = await client.api.auth.signup['$post']({json});
      if(!res.ok) {
        throw new Error('Failed to sign up');
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Signed up successfully');
      router.refresh();
      queryClient.invalidateQueries({queryKey: ['current']});
    },
    onError: () => {
      toast.error('Failed to sign up');
    }
  });

  return mutation;
};