import axios from 'axios';

const BASE_URL = 'https://developer-lostark.game.onstove.com';
const key = process.env.REACT_APP_LOSTARK_KEY;

export const LostarkAuthInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      config.headers.authorization = `bearer ${key}`;
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const LostArkCharacterInstance = () => {
  const url = 'https://developer-lostark.game.onstove.com/armories/characters';
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

export const LostArkCharacterExistInstance = () => {
  const url = 'https://developer-lostark.game.onstove.com/characters';
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
