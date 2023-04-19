import { useCookie } from 'react-cookie';

const Cookie = () => {
  const [cookies, setCookie, removeCookie] = useCookie(['name']);
};

export default Cookie;
