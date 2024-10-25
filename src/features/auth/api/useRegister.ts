import { useMutation } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
type RequestType = InferRequestType<typeof client.api.auth.signup['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.auth.signup['$post']>;

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation<
    ResponseType,
    RequestType,
    RequestType
  >({
    mutationFn: async(json) => {
      const res = await client.api.auth.signup['$post']({json});
      return await res.json();
    },
    onSuccess: () => {
      router.refresh();
    }
  });

  return mutation;
};