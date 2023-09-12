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
    console.log('Notification error');
  }
};

export const getCalenderIsland = async () => {
  try {
    const { data } = await LostarkAuthInstance().get('/gamecontents/calendar');
    return data;
  } catch (error) {
    console.error(error);
    console.log('Calender error');
  }
};

export const getEventList = async () => {
  try {
    const { data } = await LostarkAuthInstance().get('/news/events');
    return data;
  } catch (error) {
    console.error(error);
    console.log('Event error');
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
    console.error(error);
    console.log('Guild error');
  }
};

export const getCharacterExist = async (id) => {
  try {
    const { data } = await LostarkAuthInstance().get(
      `/characters/${id}/siblings`
    );
    return data;
  } catch (error) {
    console.error(error);
    console.log('Character Exist error');
  }
};

export const getProfile = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/profiles`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Profile error');
  }
};

export const getEquipment = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/equipment`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Equipment error');
  }
};

export const getAvatars = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/avatars`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Avatars error');
  }
};

export const getCombatSkills = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(
      `/${id}/combat-skills`
    );
    return data;
  } catch (error) {
    console.error(error);
    console.log('Combat Skills error');
  }
};

export const getEngravings = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/engravings`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Engravings error');
  }
};

export const getCards = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/cards`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Cards error');
  }
};

export const getGems = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(`/${id}/gems`);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Gems error');
  }
};

export const getCollectibles = async (id) => {
  try {
    const { data } = await LostArkCharacterInstance().get(
      `/${id}/collectibles`
    );
    return data;
  } catch (error) {
    console.error(error);
    console.log('Collectibles error');
  }
};
