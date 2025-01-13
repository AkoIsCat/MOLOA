import { useQuery } from 'react-query';

export const useGetLostArkData = (
  queryKey,
  id,
  queryFn,
  staleTimeValue,
  selectFn,
  enabled = !!id
) => {
  const { data, isLoading, refetch, dataUpdatedAt } = useQuery(
    [`${queryKey}`, id],
    () => queryFn(id),
    {
      enabled,
      refetchOnWindowFocus: false,
      staleTime: staleTimeValue,
      select: (data) => (selectFn ? selectFn(data) : data),
    }
  );

  return { data, isLoading, refetch, dataUpdatedAt };
};

export const useGetLostArkDataNotId = (
  queryKey,
  queryFn,
  staleTimeValue,
  selectFn
) => {
  const { data, isLoading, refetch, dataUpdatedAt } = useQuery(
    [`${queryKey}`],
    () => queryFn(),
    {
      refetchOnWindowFocus: false,
      staleTime: staleTimeValue,
      select: (data) => (selectFn ? selectFn(data) : data),
    }
  );

  return { data, isLoading, refetch, dataUpdatedAt };
};
