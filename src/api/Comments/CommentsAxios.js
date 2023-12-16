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

export const writingComment = async (data) => {
  try {
    const response = await CommentsInstance().post('/', data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await CommentsInstance().patch(`/${commentId}`, {
      params: {
        commentId,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
