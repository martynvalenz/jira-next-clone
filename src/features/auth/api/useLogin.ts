import { useMutation } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';

type RequestType = InferRequestType<typeof client.api.auth.login['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;

export const useLogin = () => {
  const mutation = useMutation<
    ResponseType,
    RequestType,
    RequestType
  >({
    mutationFn: async(json) => {
      const res = await client.api.auth.login['$post']({json});
      return await res.json();
    },
  });

  return mutation;
};