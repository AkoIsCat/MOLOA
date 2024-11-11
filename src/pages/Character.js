import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/UI/Loading';
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
  getArkpassive,
} from '../api/LostArk/LostarkAxios';
import { useGetLostArkData } from '../hooks/useGetLostArkData';

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
import TopButton from '../components/UI/TopButton';

const Character = () => {
  const [currentTab, setCurrentTab] = useState(0); // 네비게이션 탭
  const [currentGems, setCurrentGems] = useState([]); // 스킬 - 보석 정보 전달
  const [timer, setTimer] = useState();

  const { id } = useParams();

  const {
    data: holdingCharacter,
    isLoading: holdingCharacterIsLoading,
    refetch: refetchHoldingCharacter,
  } = useGetLostArkData('characterList', id, getCharacterExist, Infinity);

  const isExist = holdingCharacter && true;

  const {
    data: profile,
    isLoading: profileIsLoading,
    refetch: refetchProfile,
    dataUpdatedAt,
  } = useGetLostArkData('profile', id, getProfile, Infinity);

  const {
    data: equipment,
    isLoading: equipmentIsLoading,
    refetch: refetchEquipment,
  } = useGetLostArkData('equipment', id, getEquipment, Infinity);

  const {
    data: avatars,
    isLoading: avatarsIsLoading,
    refetch: refetchAvartars,
  } = useGetLostArkData('avatars', id, getAvatars, Infinity);

  const {
    data: engraving,
    isLoading: engravingIsLoading,
    refetch: refetchEngraving,
  } = useGetLostArkData('engraving', id, getEngravings, Infinity);

  const {
    data: combatSkills,
    isLoading: combatSkillsIsLoading,
    refetch: refetchSkills,
  } = useGetLostArkData('combatSkills', id, getCombatSkills, Infinity);

  const {
    data: cards,
    isLoading: cardsIsLoading,
    refetch: refetchCards,
  } = useGetLostArkData('cards', id, getCards, Infinity);

  const {
    data: gems,
    isLoading: gemsIsLoading,
    refetch: refetchGems,
  } = useGetLostArkData('gems', id, getGems, Infinity);

  const {
    data: collectibles,
    isLoading: characterIsLoading,
    refetch: refetchCollectibles,
  } = useGetLostArkData('collectibles', id, getCollectibles, Infinity);

  const {
    data: arkpassive,
    isLoading: arkpassiveIsLoading,
    refetch: refetchArkpassive,
  } = useGetLostArkData('arkpassive', id, getArkpassive, Infinity);

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때마다 업데이트
    // 데이터가 업데이트 됐었던 시점을 기준으로 함
    setTimer(
      dataUpdatedAt !== 0
        ? ~~((new Date().getTime() - dataUpdatedAt) / (60 * 1000))
        : 0
    );
    setCurrentTab(0);
  }, [dataUpdatedAt]);

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  const getTransGems = useCallback((data) => {
    setTimeout(() => {
      setCurrentGems(data);
    }, 0);
  }, []);

  const onClickUpdateBtn = () => {
    setTimer(0);
    refetchHoldingCharacter();
    refetchAvartars();
    refetchCards();
    refetchCollectibles();
    refetchEngraving();
    refetchEquipment();
    refetchGems();
    refetchProfile();
    refetchSkills();
    refetchArkpassive();
  };

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
          arkpassive={arkpassive}
          arkpassiveIsLoading={arkpassiveIsLoading}
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
            <Aside
              collectibles={collectibles}
              collectiblesIsLoading={characterIsLoading}
              profile={profile}
              profileIsLoading={profileIsLoading}
            />
            <Section>
              <NaviWrap>
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
                <UpdateBox>
                  <TimerMessage>
                    {timer < 60 ? `${timer}분 전` : `${~~(timer / 60)}시간 전`}
                  </TimerMessage>
                  <UpdateButton
                    disabled={timer >= 5 ? false : true}
                    onClick={onClickUpdateBtn}
                  >
                    갱신하기
                  </UpdateButton>
                </UpdateBox>
              </NaviWrap>
              <InnerSection>{navMenu[currentTab].content}</InnerSection>
            </Section>
          </ContentBox>
        )}
        {isExist && characterIsLoading && <Loading />}
        <TopButton />
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

const UpdateBox = styled.div`
  display: flex;
  align-items: center;
`;

const TimerMessage = styled.p`
  font-family: 'Nanum Gothic';
  margin: 0 10px;
  color: #f1ffff;
  font-size: 13px;
`;

const UpdateButton = styled.button`
  width: 85px;
  height: 30px;
  margin-right: 30px;
  border: 0;
  border-radius: 10px;
  font-family: 'Nanum Gothic';
  background: #40444f;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background: #292e33;
    color: black;
  }
`;

const NaviWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
