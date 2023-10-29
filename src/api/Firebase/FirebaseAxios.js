import { FirebaseInstance, FirebaseUpdeteInstance } from './FirebaseInstance';

export const getFirebaseData = async (path) => {
  try {
    const { data } = await FirebaseInstance().get(`/${path}.json`);
    return data;
  } catch {
    throw new Error('Firebase Request error');
  }
};

export const updateCharacterProfile = async (id, data) => {
  try {
    await FirebaseUpdeteInstance().put(`/CharacterSearch/${id}.json`, data);
  } catch {
    throw new Error('Firebase Update error');
  }
};
