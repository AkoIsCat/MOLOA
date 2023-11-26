import { SignInstance } from './SignInstance';

export const postSignUpData = async (data) => {
  try {
    const response = await SignInstance().post(`/signup`, data);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const signInData = async (data) => {
  try {
    const response = await SignInstance().post('/login', data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};
