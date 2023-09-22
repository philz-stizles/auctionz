import { useQuery } from '@tanstack/react-query';

const useQ = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['auctions'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json()
      ),
  });

  return { isLoading, error, data };
};

export default useQ;
