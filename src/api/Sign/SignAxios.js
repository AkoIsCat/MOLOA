import { SignInstance } from './SignInstance';

export const postSignUpData = async (data) => {
  try {
    console.log(data);
    const response = await SignInstance().post(`/signup`, data);
    return response;
  } catch {
    throw new Error('Sign Request error');
  }
};
