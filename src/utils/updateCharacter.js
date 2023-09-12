import {
  getFirebaseData,
  updateCharacterProfile,
} from '../api/Firebase/FirebaseAxios';
import {
  getCharacterExist,
  getProfile,
  getEngravings,
} from '../api/LostArk/LostarkAxios';

export const updateCharacter = async (name, engraving) => {
  // 모로아 db 유무 체크
  const data = await getFirebaseData(`CharacterSearch/${name}`);

  // 캐릭터 유무 체크
  const characterExist = await getCharacterExist(name);

  // 캐릭터 정보 조회
  const profileData = await getProfile(name);

  // 각인 조회
  const engravingsData = await getEngravings(name);

  let engravingItem = []; // 각인을 담을 배열

  // 활성화 된 직각 추출
  if (engravingsData) {
    for (let i = 0; i < engraving.length; i++) {
      for (let j = 0; j < engravingsData.Effects.length; j++) {
        const split = engravingsData.Effects[j].Name.split(' Lv. ');
        if (split[0] === engraving[i]) {
          engravingItem.push({ name: split[0], level: split[1] });
        }
      }
    }
  }

  if (data) {
    // 이미 등록된 닉네임인 경우 조회수를 업데이트
    const updatedData = {
      ...data,
      views: data.views + 1,
    };
    await updateCharacterProfile(name, updatedData);

    // db에 존재하지 않고, 로아에 실제로 있는 캐릭터만 추가 가능
  } else if (!data && characterExist) {
    // 새로운 닉네임인 경우 데이터를 추가
    const newData = {
      name: name,
      views: 1,
      server: profileData.ServerName,
      level: profileData.ItemMaxLevel,
      class: profileData.CharacterClassName,
      engravings: engravingItem,
      guild: profileData.GuildName,
    };
    await updateCharacterProfile(name, newData);
  }
};
