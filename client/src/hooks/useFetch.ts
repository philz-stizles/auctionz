import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { auth0Audience } from '../utils/constants';

type Props = {
  endpoint: string;
  isAuth?: boolean;
  init: any;
};

const useFetch = <T>({ endpoint, isAuth = false, init }: Props) => {
  const [data, setData] = useState<T>(init);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        let config: { [key: string]: any } = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (isAuth) {
          const accessToken = await getAccessTokenSilently();
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        const res = await fetch(`${auth0Audience}${endpoint}`, config);
        const data = await res.json();

        if (!isMounted) {
          return;
        }

        if (data) {
          setData(data);
        }
        setIsLoading(false);
        
      } catch (error: any) {
        setIsLoading(false);
        console.log(error);
        setError(error.message);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, getAccessTokenSilently, isAuth]);

  return { data, isLoading, error };
};

export default useFetch;
