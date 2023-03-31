import styled from 'styled-components';

import Aside from '../component/UI/Character/Side/Aside';
import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import { Container } from './Home';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContainerBox = styled(Container)`
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

// 3 0.35
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
  width: 760px;
  height: auto;
  background: #292e33;
  padding: 30px 0;
  margin: 0 5px 0 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  width: 95%;
  height: 95%;
  background: #181c1e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  .image {
    width: 75%;
    height: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: contain;
    }
  }
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    width: 600px;
    height: auto;
    margin: 10px;
    justify-content: center;

    .trueInner {
      width: auto;
      display: flex;
      flex-direction: column;
      margin: 0 40px;

      div {
        display: flex;
        margin: 5px 0;

        .desc {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .falseInner {
      width: auto;
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        margin-bottom: 10px;

        .desc {
          display: flex;
          flex-direction: column;
        }
      }
    }

    p {
      margin: 0;
      font-family: 'Nanum Gothic';
      color: #fff;
      margin: 4px 0 4px 7px;
    }

    .type {
      font-size: 13px;
    }

    .name {
      font-size: 14px;
      font-family: 'Nanum Gothic Bold';
    }
  }
`;

const ImageBox = styled.div`
  width: 55px;
  height: 55px;
  background: ${(props) =>
    props.exist === '전설'
      ? 'linear-gradient(135deg, #362003 0%, #9e5f04 100%)'
      : props.exist === '영웅'
      ? 'linear-gradient(135deg, #261331 0%, #480d5d 100%)'
      : props.exist === '희귀'
      ? 'linear-gradient(135deg, #111f2c 0%, #113d5d 100%)'
      : '#292e33'};
  border-radius: 10px;

  img {
    object-fit: contain;
  }
`;

const ImageBoxColor = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.exist === '전설'
      ? 'linear-gradient(135deg, #362003 0%, #9e5f04 100%)'
      : props.exist === '영웅'
      ? 'linear-gradient(135deg, #261331 0%, #480d5d 100%)'
      : props.exist === '희귀'
      ? 'linear-gradient(135deg, #111f2c 0%, #113d5d 100%)'
      : '#292e33'};
  border-radius: 10px;
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
  const [colosseums, setColosseums] = useState(); // PVP
  const [collectibles, setCollectibles] = useState(); // 수집품

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

    const loadColosseums = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/colosseums`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setColosseums(responseData);
      } catch (err) {
        console.log('LostArk Colosseumn error!!');
      }
    };

    const loadCollectibles = async () => {
      try {
        const response = await fetch(
          `${commonCharacterUrl}/${id}/collectibles`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `bearer ${lostArkKey}`,
            },
          }
        );
        const responseData = await response.json();

        setCollectibles(responseData);
      } catch (err) {
        console.log('LostArk Collectibles error!!');
      }
    };

    loadCharacterTrue();
    loadProfile();
    loadEquipment();
    loadAvatars();
    loadCombatSkills();
    loadEngravings();
    loadCards();
    loadGems();
    loadColosseums();
    loadCollectibles();
  }, [loadCharacterUrl, isExist, commonCharacterUrl, id]);

  // ------------------------- 아바타 탭
  const trueInner = [
    { type: '무기 아바타' },
    { type: '머리 아바타' },
    { type: '상의 아바타' },
    { type: '하의 아바타' },
  ];

  const falseInner = [
    {
      type: '무기 덧입기 아바타',
      TypeAs: '무기 아바타',
    },
    {
      type: '머리 덧입기 아바타',
      TypeAs: '머리 아바타',
    },
    {
      type: '상의 덧입기 아바타',
      TypeAs: '상의 아바타',
    },
    {
      type: '하의 덧입기 아바타',
      TypeAs: '하의 아바타',
    },
    {
      type: '얼굴1 아바타',
      TypeAs: '얼굴1 아바타',
    },
    {
      type: '얼굴2 아바타',
      TypeAs: '얼굴2 아바타',
    },
    {
      type: '악기 아바타',
      TypeAs: '악기 아바타',
    },
  ];

  const isInnerFalse = avatars && avatars.filter((item) => !item.IsInner);

  const avatarItem = avatars && (
    <ContentWrap>
      <div className="image">
        <img src={profile.CharacterImage} alt="캐릭터 이미지" />
      </div>
      <ListWrap>
        <div className="content">
          <div className="trueInner">
            {trueInner.map((item, index) => (
              <div key={index}>
                <ImageBox
                  exist={
                    avatars[index].Grade === '전설' && avatars[index].IsInner
                      ? avatars[index].Grade
                      : ''
                  }
                >
                  {avatars[index].Grade === '전설' && avatars[index].IsInner ? (
                    <img src={avatars[index].Icon} alt="무기아바타" />
                  ) : (
                    ''
                  )}
                </ImageBox>
                <div className="desc">
                  <p className="type">{avatars[index].Type}</p>
                  <p className="name">
                    {avatars[index].Grade === '전설' && avatars[index].IsInner
                      ? avatars[index].Name
                      : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="falseInner">
            {falseInner.map((item, index) => (
              <div key={index}>
                <ImageBox>
                  {isInnerFalse.map((items, index) =>
                    items.Type === item.TypeAs ? (
                      <ImageBoxColor key={index} exist={items.Grade}>
                        <img src={items.Icon} alt="아바타" />
                      </ImageBoxColor>
                    ) : (
                      ''
                    )
                  )}
                </ImageBox>
                <div className="desc">
                  <p className="type">{item.type}</p>
                  {isInnerFalse.map((items, index) =>
                    items.Type === item.TypeAs ? (
                      <p key={index} className="name">
                        {items.Name !== '' ? items.Name : '아바타 없음'}
                      </p>
                    ) : (
                      ''
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ListWrap>
    </ContentWrap>
  );
  // ------------------------- 요까지 아바타

  const navMenu = [
    {
      name: '전투',
      first: true,
      content: '전투탭',
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
      content: avatarItem,
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
