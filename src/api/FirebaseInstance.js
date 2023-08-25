import axios from 'axios';

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;

export const FirebaseInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const FirebaseUpdeteInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  return instance;
};
