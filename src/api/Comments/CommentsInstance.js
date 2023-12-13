import axios from 'axios';

export const CommentsInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/comments',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};
