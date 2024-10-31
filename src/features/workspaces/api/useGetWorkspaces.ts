import {useQuery} from '@tanstack/react-query';
import {client} from '@/lib/rpc';

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async() => {
      const res = await client.api.workspaces.$get();
      if(!res.ok) throw new Error('Failed to fetch workspaces');
      
      const {data} = await res.json();
      return data;
    }
  });
};