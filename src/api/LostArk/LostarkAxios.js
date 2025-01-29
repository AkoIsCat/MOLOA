import {
  LostarkAuthInstance,
  LostArkCharacterInstance,
} from './LostarkInstance';

export const getNotificationList = async () => {
  try {
    const { data } = await LostarkAuthInstance().get(
      '/news/notices?type=%EA%B3%B5%EC%A7%80'
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Notification error');
  }
};

export const getCalenderIsland = async () => {
  try {
    const { data } = await LostarkAuthInstance().get('/gamecontents/calendar');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Calender error');
  }
};

export const getEventList = async () => {
  try {
    const { data } = await LostarkAuthInstance().get('/news/events');
    return data;
  } catch (error) {
    throw new Error('Event error');
  }
};

export const getGuildRanking = async (serverName) => {
  try {
    const { data } = await LostarkAuthInstance().get(`/guilds/rankings`, {
      params: {
        serverName: serverName,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Guild error');
  }
};

export const getCharacterExist = async (id) => {
  try {
    const { data } = await LostarkAuthInstance().get(
      `/characters/${id}/siblings`
    );
    return data;
  } catch (error) {
    throw new Error('Character Exist error');
  }
};

export const getCharacterData = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}`);
    return data;
  } catch (error) {
    throw new Error('Character error');
  }
};

export const getProfile = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/profiles`);
    return data;
  } catch (error) {
    throw new Error('Profile error', error);
  }
};

export const getEquipment = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/equipment`);
    return data;
  } catch (error) {
    throw new Error('Equipment error');
  }
};

export const getAvatars = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/avatars`);
    return data;
  } catch (error) {
    throw new Error('Avatars error');
  }
};

export const getCombatSkills = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(
      `/${id}/combat-skills`
    );
    return data;
  } catch (error) {
    throw new Error('Combat Skills error');
  }
};

export const getEngravings = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/engravings`);
    return data;
  } catch (error) {
    throw new Error('Engravings error');
  }
};

export const getCards = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/cards`);
    return data;
  } catch (error) {
    throw new Error('Cards error');
  }
};

export const getGems = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/gems`);
    return data;
  } catch (error) {
    throw new Error('Gems error');
  }
};

export const getCollectibles = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(
      `/${id}/collectibles`
    );
    return data;
  } catch (error) {
    throw new Error('Collectibles error');
  }
};

export const getArkpassive = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/arkpassive`);
    return data;
  } catch (error) {
    throw new Error('Arkpassive error');
  }
};
