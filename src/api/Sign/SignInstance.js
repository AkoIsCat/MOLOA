import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';

export const SignInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/auth',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};
