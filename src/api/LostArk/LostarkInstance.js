import axios from 'axios';

const BASE_URL = 'https://developer-lostark.game.onstove.com';
const key = import.meta.env.VITE_LOSTARK_KEY;

const createAxiosInstance = (url) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers.authorization = `bearer ${key}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const LostarkAuthInstance = () => {
  return createAxiosInstance(BASE_URL);
};

export const LostArkCharacterInstance = () => {
  const url = `${BASE_URL}/armories/characters`;
  return createAxiosInstance(url);
};

export const LostArkCharacterExistInstance = () => {
  const url = `${BASE_URL}/characters`;
  return createAxiosInstance(url);
};
