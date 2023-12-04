import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchingDataLoader } from 'src/components/AnonLoader/fechingDataLoader';
import { localStorageSet } from 'src/utils/localStorage';

export const Authorize = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const redirectUri = searchParams.get('redirect_uri');
  const navigate = useNavigate();
  console.log('hello');
  useEffect(() => {
    console.log({ username, redirectUri });
    if (username != null && redirectUri != null) {
      localStorageSet('redirectUri', redirectUri);
      navigate(`/verify/${username}`);
    }
  }, [username, redirectUri]);
  return <FetchingDataLoader />;
};
