import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { auth0Audience } from '../utils/constants';

type Props = {
  endpoint: string;
  isAuth?: boolean;
};

const useRequest = ({ endpoint, isAuth = true }: Props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const sendRequest = async ({
    body,
    method,
  }: {
    body: object;
    method?: string;
  }) => {
    try {
      setIsLoading(true);
      let config: { [key: string]: any } = {
        method: method || 'POST',
        body: JSON.stringify(body),
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

      if (data) {
        setData(data);
      }

      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      setError(error.message);
    }
  };

  return { sendRequest, isLoading, data, error };
};

export default useRequest;
