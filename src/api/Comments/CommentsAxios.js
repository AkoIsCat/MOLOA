import { CommentsInstance } from './CommentsInstance';

export const getComments = async (postId) => {
  try {
    const response = await CommentsInstance().get(`/${postId}`, {
      params: {
        postId,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
