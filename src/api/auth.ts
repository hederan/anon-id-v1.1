import { localStorageDelete, localStorageGet } from 'src/utils/localStorage';
import { jwtDecode } from 'jwt-decode';

export const verifyToken = () => {
  const token = localStorageGet('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      localStorageDelete('token');
      return false;
    }
    return true;
  }
  return false;
};
