import {
  getFirebaseData,
  updateCharacterProfile,
} from '../api/Firebase/FirebaseAxios';
import {
  getCharacterExist,
  getProfile,
  getEngravings,
} from '../api/LostArk/LostarkAxios';
import removeTag from './removeTag';

export const updateCharacter = async (
  name,
  engraving,
  activeArkPassive,
  arkPassiveData
) => {
  // 모로아 db 유무 체크
  const data = await getFirebaseData(`CharacterSearch/${name}`);

  // 캐릭터 유무 체크
  const characterExist = await getCharacterExist(name);

  // 캐릭터 정보 조회
  const profileData = await getProfile(name);

  // 각인 조회s
  const engravingsData = await getEngravings(name);

  let engravingItem = []; // 각인을 담을 배열
  const evolution =
    activeArkPassive && arkPassiveData.filter((item) => item.Name === '깨달음');

  // 활성화 된 직각 추출
  if (engravingsData && activeArkPassive === null) {
    for (let i = 0; i < engraving.length; i++) {
      for (let j = 0; j < engravingsData.Effects.length; j++) {
        const split = engravingsData.Effects[j].Name.split(' Lv. ');
        if (split[0] === engraving[i]) {
          engravingItem.push({ name: split[0], level: split[1] });
        }
      }
    }
  } else {
    for (let i = 0; i < engraving.length; i++) {
      for (let j = 0; j < evolution.length; j++) {
        const engravingArkPassive = removeTag(
          evolution[j].Description,
          'FONT'
        ).slice(8);
        const [name, level] = engravingArkPassive.split(' Lv.');
        if (name === engraving[i]) {
          engravingItem.push({ name, level });
        }
      }
    }
  }

  if (data) {
    // 이미 등록된 닉네임인 경우 조회수를 업데이트
    const updatedData = {
      ...data,
      level: profileData.ItemAvgLevel,
      guild: profileData.GuildName,
      engravings: engravingItem,
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
      level: profileData.ItemAvgLevel,
      class: profileData.CharacterClassName,
      engravings: engravingItem,
      guild: profileData.GuildName,
    };
    await updateCharacterProfile(name, newData);
  }
};
