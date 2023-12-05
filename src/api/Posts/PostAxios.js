import { PostsInstance } from './Postsinstance';

export const writingPosts = async (data) => {
  try {
    const response = await PostsInstance().post(`/`, {
      id: data.id,
      post_title: data.post_title,
      post_contents: data.post_contents,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const getPosts = async () => {
  try {
    const response = await PostsInstance().get(`/`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
