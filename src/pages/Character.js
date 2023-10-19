import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/UI/Loading';
import { useCallback } from 'react';
import {
  getCharacterExist,
  getProfile,
  getAvatars,
  getCards,
  getCollectibles,
  getCombatSkills,
  getEngravings,
  getGems,
  getEquipment,
} from '../api/LostArk/LostarkAxios';
import { useQuery } from 'react-query';

import Aside from '../components/Character/Side/Aside'; // 좌측 캐릭터 정보
import Header from '../components/Header/Header'; // 헤더
import Background from '../components/UI/BackBox'; // 배경 컨테이너
import { Container } from './Home';
import Avatar from '../components/Character/Content/Avatar'; // 아바타탭
import Equipment from '../components/Character/Content/Equipment'; // 전투탭
import CharacterList from '../components/Character/Content/CharacterList'; // 보유캐릭터탭
import Skill from '../components/Character/Content/Skill'; // 스킬탭
import Collect from '../components/Character/Content/Collect'; // 수집탭
import Footer from '../components/UI/Footer';

const Character = () => {
  const [currentTab, setCurrentTab] = useState(0); // 네비게이션 탭
  const [currentGems, setCurrentGems] = useState([]); // 스킬 - 보석 정보 전달

  const { id } = useParams();

  const { data: holdingCharacter, isLoading: holdingCharacterIsLoading } =
    useQuery(['characterList', id], () => getCharacterExist(id), {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    });

  const isExist = holdingCharacter && true;

  const { data: profile, isLoading: profileIsLoading } = useQuery(
    ['profile', id],
    () => getProfile(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: equipment, isLoading: equipmentIsLoading } = useQuery(
    ['equipment', id],
    () => getEquipment(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: avatars, isLoading: avatarsIsLoading } = useQuery(
    ['avatars', id],
    () => getAvatars(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: engraving, isLoading: engravingIsLoading } = useQuery(
    ['engraving', id],
    () => getEngravings(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: combatSkills, isLoading: combatSkillsIsLoading } = useQuery(
    ['combatSkills', id],
    () => getCombatSkills(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: cards, isLoading: cardsIsLoading } = useQuery(
    ['cards', id],
    () => getCards(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: gems, isLoading: gemsIsLoading } = useQuery(
    ['gems', id],
    () => getGems(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: collectibles, isLoading: characterIsLoading } = useQuery(
    ['collectibles', id],
    () => getCollectibles(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  const getTransGems = useCallback((data) => {
    setTimeout(() => {
      setCurrentGems(data);
    }, 0);
  }, []);

  const navMenu = [
    {
      name: '전투',
      first: true,
      content: (
        <Equipment
          equipment={equipment}
          equipmentIsLoading={equipmentIsLoading}
          engraving={engraving}
          engravingIsLoading={engravingIsLoading}
          gems={gems}
          gemsIsLoading={gemsIsLoading}
          combatSkills={combatSkills}
          combatSkillsIsLoading={combatSkillsIsLoading}
          profile={profile}
          profileIsLoading={profileIsLoading}
          cards={cards}
          cardsIsLoading={cardsIsLoading}
          getGems={getTransGems}
        />
      ),
    },
    {
      name: '스킬',
      content: (
        <Skill
          combatSkills={combatSkills}
          combatSkillsIsLoading={combatSkillsIsLoading}
          profile={profile}
          profileIsLoading={profileIsLoading}
          getGems={currentGems}
        />
      ),
    },
    {
      name: '수집',
      content: (
        <Collect
          collectibles={collectibles}
          characterIsLoading={characterIsLoading}
          profile={profile}
          profileIsLoading={profileIsLoading}
        />
      ),
    },
    {
      name: '아바타',
      content: (
        <Avatar
          profile={profile}
          profileIsLoading={profileIsLoading}
          avatars={avatars}
          avatarsIsLoading={avatarsIsLoading}
        />
      ),
    },
    {
      name: '보유 캐릭터',
      end: true,
      content: (
        <CharacterList
          holdingCharacterIsLoading={holdingCharacterIsLoading}
          holdingCharacter={holdingCharacter}
          selectMenuHandler={selectMenuHandler}
        />
      ),
    },
  ];

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
        {isExist && !characterIsLoading && (
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
                        onClick={() => {
                          selectMenuHandler(index);
                        }}
                      >
                        {item.name}
                      </NavItem>
                    ) : item.end ? (
                      <NavItem
                        borderEnd="true"
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => {
                          selectMenuHandler(index);
                        }}
                      >
                        {item.name}
                      </NavItem>
                    ) : (
                      <NavItem
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => {
                          selectMenuHandler(index);
                        }}
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
        {isExist && characterIsLoading && <Loading />}
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Character;

const ContainerBox = styled(Container)`
  min-height: 100vh;
  padding-bottom: 50px;
  height: auto;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

export const Message = styled.div`
  width: 60vw;
  height: 10vh;
  background: #373e44;
  font-family: 'Nanum Gothic';
  color: #fff;
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

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
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

  @media (max-width: 767px) {
    margin-top: 50px;
    width: 100%;
    float: none;
  }
`;

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

  @media ${(props) => props.theme.mobile} {
    width: 93%;
    margin-left: 10px;
  }
`;

const NavItem = styled.li`
  color: #fff;
  font-family: 'Nanum Gothic';
  width: auto;
  margin: 0;
  padding: 11px 13.7px;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#40444f' : '')};
  border-radius: ${(props) =>
    props.borderFirst
      ? '10px 0 0 10px'
      : props.borderEnd
      ? '0 10px 10px 0'
      : ''};

  @media ${(props) => props.theme.mobile} {
    border-radius: 0px;
    font-size: 12px;
    padding: 12px;
  }

  &:hover {
    background: #40444f;
  }
`;

const InnerSection = styled.div`
  width: 95%;
  height: auto;
  background: #292e33;
  margin: 0 5px 0 22px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    width: 94%;
    padding: 0;
    margin: 0 12px;
  }
`;
