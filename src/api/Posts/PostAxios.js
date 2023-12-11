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

export const getDetailPosts = async (data) => {
  try {
    const response = await PostsInstance().get(`/${data.postId}`, {
      params: {
        postId: data.postId,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updatePosts = async (data) => {
  try {
    const response = await PostsInstance().put(
      `/${data.postId}`,
      {
        postTitle: data.title,
        postContents: data.contents,
      },
      {
        params: {
          postId: data.postId,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const removePosts = async (data) => {
  try {
    const response = await PostsInstance().delete(`/posts/${data.postId}`, {
      params: {
        postId: data.postId,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const increaseLike = async (data) => {
  try {
    const response = await PostsInstance().post('/like', {
      userId: data.userId,
      postId: data.postId,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
