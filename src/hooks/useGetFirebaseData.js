import { useQuery } from '@tanstack/react-query';
import { getFirebaseData } from '../api/Firebase/FirebaseAxios';

const useGetFirebaseData = (queryKey, path, staleTime, selectFn) => {
  const { data, isLoading } = useQuery({
    queryKey:
      queryKey.key === 'notification'
        ? [`${queryKey}`, `${queryKey.id}`]
        : [`${queryKey}`],
    queryFn: () => getFirebaseData(path),
    refetchOnWindowFocus: false,
    staleTime: staleTime,
    select: (data) => (selectFn ? selectFn(data) : data),
  });
  return { data, isLoading };
};

export default useGetFirebaseData;
