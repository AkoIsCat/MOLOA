import styled from 'styled-components';

import Aside from '../component/UI/Character/Side/Aside'; // 좌측 캐릭터 정보
import Header from '../component/header/Header'; // 헤더
import Background from '../component/UI/BackBox'; // 배경 컨테이너
import { Container } from './Home';
import Avatar from '../component/UI/Character/Content/Avatar'; // 아바타탭
import CharacterEquipmentPart from '../component/UI/Character/Content/CharacterEquipmentPart'; // 전투탭 - 장비&악세&각인
import CharacterGemsPart from '../component/UI/Character/Content/CharacterGemsPart'; // 전투탭 - 보석
import Characteristics from '../component/UI/Character/Content/Characteristics'; // 전투탭 - 특성&각인&트포
import CharacterCards from '../component/UI/Character/Content/CharacterCards'; // 전투탭 - 카드

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react';

const ContainerBox = styled(Container)`
  min-height: 100vh;
  padding-bottom: 50px;
  height: auto;
  position: relative;
`;

const Message = styled.div`
  width: 60vw;
  height: 10vh;
  background: #373e44;
  color: white;
  font-size: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 1150px;
  height: auto;
  background: #1e2225;
  margin: 0 auto;
`;

const Section = styled.section`
  width: 820px;
  height: auto;
  background: #181c1e;
  float: right;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30px;
`;

// 네비
const Navigation = styled.nav`
  width: 354px;
  height: 41px;
  background: #292e33;
  margin: 25px 0 20px 30px;
  border-radius: 10px;
  display: flex;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const NavItem = styled.li`
  color: #fff;
  font-family: 'Nanum Gothic';
  width: auto;
  margin: 0;
  padding: 11px 9px;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#40444f' : '')};
  border-radius: ${(props) =>
    props.borderFirst
      ? '10px 0 0 10px'
      : props.borderEnd
      ? '0 10px 10px 0'
      : ''};

  &:hover {
    background: #40444f;
  }
`;

const InnerSection = styled.div`
  width: 95%;
  height: auto;
  background: #292e33;
  padding: 30px 0;
  margin: 0 5px 0 22px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const lostArkKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMjc0MTYifQ.MIy7jDe9w81yjIX8Zh4VgGCVH2IR-vz7CGF6Ceh0zdc-5HfnY31XrIwJ86r_nz1ImkS-dPxW7bO_8AaZmuII6sbdJo_dWer-kbkpA5kx1aIrtGqpvhY_fWtXY-_wmWhZrdAFJTtB8t6yVHIua_ceA7CJWM0Bn1sQ6SNWxCbq9fsHb6BGRayKuJ5JV-qAIVC5VjNyVC4iIyAdJetDWgu0c7DTR_pVOeWHbsX-CbAqqKXvRPoNII1aop4Ioa9Sbhb99iD-BuA7pfn-_D-m6axvO0-0luLu4UbwXhrE5jEVPNs7Oxf215AqosVjFb5ObX74iGzf6vyt8YqjL08UkLS8NQ';

const Character = () => {
  const [isExist, setIsExist] = useState();
  const [profile, setProfile] = useState(); // 기본 스탯
  const [equipment, setEquipment] = useState(); // 장비
  const [avatars, setAvatars] = useState(); // 아바타
  const [combatSkills, setCombatSkills] = useState(); // 스킬
  const [engraving, setEngraving] = useState(); // 각인
  const [cards, setCards] = useState(); // 카드
  const [gems, setGems] = useState(); // 보석
  // const [colosseums, setColosseums] = useState(); // PVP
  // const [collectibles, setCollectibles] = useState(); // 수집품

  const [currentTab, setCurrentTab] = useState(0);

  const { id } = useParams();
  const commonCharacterUrl = `https://developer-lostark.game.onstove.com/armories/characters`;
  const loadCharacterUrl = `https://developer-lostark.game.onstove.com/characters`;

  useEffect(() => {
    // 캐릭터 존재 여부(원정대 캐릭터)
    const loadCharacterTrue = async () => {
      try {
        const response = await fetch(`${loadCharacterUrl}/${id}/siblings`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        if (responseData) {
          setIsExist(true);
        } else {
          setIsExist(false);
        }
      } catch (err) {
        console.log('LostArk Character True of False error!!');
      }
    };

    const loadProfile = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/profiles`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setProfile(responseData);
      } catch (err) {
        console.log('LostArk Profile error!!');
      }
    };

    const loadEquipment = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/equipment`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setEquipment(responseData);
      } catch (err) {
        console.log('LostArk Equipment error!!');
      }
    };

    const loadAvatars = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/avatars`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setAvatars(responseData);
      } catch (err) {
        console.log('LostArk Avatars error!!');
      }
    };

    const loadCombatSkills = async () => {
      try {
        const response = await fetch(
          `${commonCharacterUrl}/${id}/combat-skills`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `bearer ${lostArkKey}`,
            },
          }
        );
        const responseData = await response.json();

        setCombatSkills(responseData);
      } catch (err) {
        console.log('LostArk CombatSkills error!!');
      }
    };

    const loadEngravings = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/engravings`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setEngraving(responseData);
      } catch (err) {
        console.log('LostArk Engravings error!!');
      }
    };

    const loadCards = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/cards`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setCards(responseData);
      } catch (err) {
        console.log('LostArk Cards error!!');
      }
    };

    const loadGems = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/gems`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setGems(responseData);
      } catch (err) {
        console.log('LostArk Gems error!!');
      }
    };

    // const loadColosseums = async () => {
    //   try {
    //     const response = await fetch(`${commonCharacterUrl}/${id}/colosseums`, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         authorization: `bearer ${lostArkKey}`,
    //       },
    //     });
    //     const responseData = await response.json();

    //     setColosseums(responseData);
    //   } catch (err) {
    //     console.log('LostArk Colosseumn error!!');
    //   }
    // };

    // const loadCollectibles = async () => {
    //   try {
    //     const response = await fetch(
    //       `${commonCharacterUrl}/${id}/collectibles`,
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           authorization: `bearer ${lostArkKey}`,
    //         },
    //       }
    //     );
    //     const responseData = await response.json();

    //     setCollectibles(responseData);
    //   } catch (err) {
    //     console.log('LostArk Collectibles error!!');
    //   }
    // };

    loadCharacterTrue();
    loadProfile();
    loadEquipment();
    loadAvatars();
    loadCombatSkills();
    loadEngravings();
    loadCards();
    loadGems();
    // loadColosseums();
    // loadCollectibles();
  }, [loadCharacterUrl, commonCharacterUrl, id]);

  // -------------------------- 카드

  const cardList = []; // 장착 카드 목록
  const effectList = []; // 카드 효과 목록
  const totalEffect = []; // 총 카드 효과 목록

  // 필요한 카드 정보 추출
  if (cards) {
    for (let i = 0; i <= cards.Cards.length - 1; i++) {
      cardList.push(cards.Cards[i]);
    }

    for (let key in cards.Effects) {
      const value = cards.Effects[key];

      const regex = /\d+/g;

      const lastEffectCard =
        value.Items[value.Items.length - 1] &&
        value.Items[value.Items.length - 1].Name.split('(');

      const matches =
        lastEffectCard && lastEffectCard[1] && lastEffectCard[1].match(regex);

      effectList.push({
        slots: value.CardSlots,
        index: value.Index,
        items: value.Items,
        lastEffect: lastEffectCard && lastEffectCard[0],
        awake: matches && matches,
      });
    }

    for (let j = 0; j <= effectList.length - 1; j++) {
      for (let i = 0; i <= effectList[j].items.length - 1; i++) {
        // console.log(effectList[j].items);
        totalEffect.push({
          Name: effectList[j].items[i].Name,
          Description: effectList[j].items[i].Description,
        });
      }
    }
  }

  // --------------------------

  // console.log(effectList, totalEffect);

  const equipmentItem = equipment && (
    <div
      style={{ display: 'flex', flexDirection: 'column', padding: '0 20px' }}
    >
      <CharacterEquipmentPart equipment={equipment} engraving={engraving} />
      <CharacterGemsPart gems={gems} />
      <Characteristics
        combatSkills={combatSkills}
        profile={profile}
        engraving={engraving}
      />
      <CharacterCards cards={cards} />
    </div>
  );

  // ------------------------- 요까지 장비

  const navMenu = [
    {
      name: '전투',
      first: true,
      content: equipmentItem,
    },
    {
      name: '스킬',
      content: '스킬탭',
    },
    {
      name: '수집',
      content: '수집탭',
    },
    {
      name: '아바타',
      content: <Avatar profile={profile} avatars={avatars} />,
    },
    {
      name: '보유 캐릭터',
      content: '보유 캐릭터탭',
    },
    {
      name: '길드',
      end: true,
      content: '길드탭',
    },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  // console.log(equipment);

  return (
    <Background>
      <Header />
      <ContainerBox>
        {!isExist && (
          <Message>
            전투정보실에서 검색이 불가능한 캐릭터거나 존재하지 않는 캐릭터
            입니다.
          </Message>
        )}
        {isExist && (
          <ContentBox>
            <Aside />
            <Section>
              <Navigation>
                <ul>
                  {navMenu.map((item, index) =>
                    item.first ? (
                      <NavItem
                        borderFirst="true"
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => selectMenuHandler(index)}
                      >
                        {item.name}
                      </NavItem>
                    ) : item.end ? (
                      <NavItem
                        borderEnd="true"
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => selectMenuHandler(index)}
                      >
                        {item.name}
                      </NavItem>
                    ) : (
                      <NavItem
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => selectMenuHandler(index)}
                      >
                        {item.name}
                      </NavItem>
                    )
                  )}
                </ul>
              </Navigation>
              <InnerSection>{navMenu[currentTab].content}</InnerSection>
            </Section>
          </ContentBox>
        )}
      </ContainerBox>
    </Background>
  );
};

export default Character;
