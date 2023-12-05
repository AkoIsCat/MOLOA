import axios from 'axios';

export const PostsInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/posts',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};
