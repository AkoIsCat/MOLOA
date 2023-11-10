import { useQuery } from 'react-query';

const useGetFirebaseData = (queryKey, queryFn, path, staleTime, selectFn) => {
  const { data, isLoading } = useQuery([`${queryKey}`], () => queryFn(path), {
    refetchOnWindowFocus: false,
    staleTime: staleTime,
    select: (data) => (selectFn ? selectFn(data) : data),
  });
  return { data, isLoading };
};

export default useGetFirebaseData;
