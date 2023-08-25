import { FirebaseInstance } from './FirebaseInstance';

export const getFirebaseData = async (path) => {
  try {
    const { data } = await FirebaseInstance().get(`/${path}.json`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Firebase Request error');
  }
};
