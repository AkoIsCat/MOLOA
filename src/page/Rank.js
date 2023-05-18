import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import { Container } from './Home';
import CommonContentBox from '../component/UI/Home/RightAside/CommonContentBox';
import SmallMenu from '../component/UI/SmallMenu';

import { useState, useEffect } from 'react';

import {
  Warlord as 워로드,
  Berserker as 버서커,
  Holyknight as 홀리나이트,
  Destoyer as 디스트로이어,
  BerserkerFemale as 슬레이어,
  BattleMaster as 배틀마스터,
  BattleMasterMale as 스트라이커,
  ForceMaster as 기공사,
  LanceMaster as 창술사,
  Infighter as 인파이터,
  Arcana as 아르카나,
  Bard as 바드,
  ElementalMaster as 소서리스,
  Summoner as 서머너,
  Demonic as 데모닉,
  Blade as 블레이드,
  Reaper as 리퍼,
  DevilHunter as 데빌헌터,
  DevilHunterFemale as 건슬링어,
  HawkEye as 호크아이,
  Blaster as 블래스터,
  Scouter as 스카우터,
  Aga as 도화가,
  WeatherArtist as 기상술사,
} from '../asset/image/classImg/index'; // 직업 아이콘
import ALL from '../asset/icon/all.png';
import Loading from '../component/UI/Loading';
import Footer from '../component/UI/Footer';
import { Fragment } from 'react';

const ContainerBox = styled(Container)`
  min-height: 100vh;
  width: auto;
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-around;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: column-reverse;
  }
`;

const RankingWrap = styled.div`
  width: 50vw;

  @media ${(props) => props.theme.tablet} {
    width: 80vw;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const ServerWrap = styled.div`
  // background: green;
  padding: 20px 0px;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    justify-content: center;
    padding: 10px;
  }
`;

const ServerList = styled.div`
  padding: 5px 0;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  background: #292e33;
  font-family: 'Nanum Gothic';

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;

    @media ${(props) => props.theme.mobile} {
      justify-content: center;
    }
  }
`;

const ServerListli = styled.li`
  width: 40%;
  margin: 8px 0;
  padding-left: 10px;
  color: ${(props) =>
    props.active ? '#fff' : props.active2 ? '#fff' : '#c1c1c1'};
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    text-align: center;
  }

  border-radius: ${(props) =>
    props.borderFirst
      ? '10px 0 0 10px'
      : props.borderEnd
      ? '0 10px 10px 0'
      : ''};

  .itemWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    @media ${(props) => props.theme.mobile} {
      align-items: center;
    }

    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      margin-bottom: 7px;

      @media ${(props) => props.theme.mobile} {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }

    div {
      @media ${(props) => props.theme.mobile} {
        margin: 0 10px;
      }
    }
  }

  .engravings {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    div {
      width: 100%;
    }
  }

  &:hover {
    color: #fff;
  }
`;

const RankIndexWrap = styled.div`
  // background: darkblue;
  width: auto;
  margin: 30px 25px;
  font-family: 'Nanum Gothic';

  ul {
    font-size: 15px;
    margin: 0;
    padding: 0 20px;
    list-style: none;
    display: flex;
    color: #c1c1c1;
    border-bottom: 1px solid #c1c1c1;

    @media ${(props) => props.theme.mobile} {
      justify-content: space-between;
      font-size: 8px;
      padding: 0;
    }

    li {
      margin: 0 10px 10px 10px;
    }

    .listWrap {
      display: flex;
      width: 100%;

      @media ${(props) => props.theme.mobile} {
        justify-content: space-between;
        font-size: 8px;
      }

      li {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .guildName {
        color: #fff;
        justify-content: flex-start;
      }

      .guildMessage {
        justify-content: flex-start;
      }
    }

    .rank {
      width: 50px;
      text-align: center;

      @media ${(props) => props.theme.mobile} {
        width: 118px;
      }
    }

    .guildName {
      margin-left: 30px;
      width: 160px;

      @media ${(props) => props.theme.mobile} {
        width: 176px;
        margin: 0;
      }
    }

    .serverName,
    .memberCount {
      margin-left: 20px;
      width: 100px;
      text-align: center;

      @media ${(props) => props.theme.mobile} {
        margin-left: 17px;
        width: 113px;
      }
    }

    .masterName {
      margin: 0 15px;
      width: 150px;
      text-align: center;
      display: flex;
      flex-direction: column;

      @media ${(props) => props.theme.mobile} {
        width: 227px;
      }

      div {
        margin-bottom: 3px;
      }

      .enName {
        width: 70px;
      }

      .enLevel {
        width: 20px;
      }
    }

    .guildMessage {
      width: 250px;
    }
  }
`;

const Notice = styled.div`
  color: #c1c1c1;
  font-family: 'Nanum Gothic';
  margin: 30px 20px;
`;

const ServerWrapWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 100px 20px 100px 0;
`;

const PopularCharacterUrl = `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch.json`;

const Rank = () => {
  const [characterList, setCharacterList] = useState();
  const [currentTab, setCurrentTab] = useState(); // 서버 네비게이션
  const [serverName, setServerName] = useState(); // 선택된 서버 이름
  const [currentClassTab, setCurrentClassTab] = useState(); // 직업 네비게이션
  const [className, setClassName] = useState(); // 선택된 직업 이름
  const [currentClassEngraving, setCurrentClassEngraving] = useState({
    click: false,
  }); // 직각 네비게이션
  const [currentClassEngraving2, setCurrentClassEngraving2] = useState({
    click: false,
  }); // 직각2 네비게이션

  const navigate = useNavigate();

  let number = 1;

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const response = await fetch(PopularCharacterUrl);
        const responseData = await response.json();

        // 객체를 객체 배열로 만들기
        const popularCharacterArray = [];
        for (const [key, value] of Object.entries(responseData)) {
          popularCharacterArray.push({
            name: value.name,
            views: value.views,
            class: value.class,
            engravings: value.engravings,
            guild: value.guild,
            level: value.level,
            server: value.server,
          });
        }
        if (popularCharacterArray) {
          const sortCharacterList = popularCharacterArray.sort((a, b) => {
            const itemMaxLevelA = parseFloat(a.level.replace(',', '')); // 쉼표 제거 후 숫자로 변환
            const itemMaxLevelB = parseFloat(b.level.replace(',', '')); // 쉼표 제거 후 숫자로 변환
            return itemMaxLevelB - itemMaxLevelA; // 내림차순으로 정렬
          });
          setCharacterList(sortCharacterList);
        }
      } catch (error) {
        console.log('PopularCharacter error!!', error);
      }
    };

    loadCharacter();
  }, []);

  const cookies = new Cookies();

  // 쿠키 설정
  const setCookie = () => {
    cookies.set('cookieName', 'cookieValue', { sameSite: 'lax' });
  };

  const server = [
    {
      name: '루페온',
    },
    {
      name: '아만',
    },
    {
      name: '카단',
    },
    {
      name: '카제로스',
    },
    {
      name: '카마인',
    },
    {
      name: '아브렐슈드',
    },
    {
      name: '실리안',
    },
    {
      name: '니나브',
    },
    {
      name: '전체',
    },
  ];

  const classList = [
    {
      image: 디스트로이어,
      name: '디트',
      fullName: '디스트로이어',
      engraving: { engraving1: '분노의 망치', engraving2: '중력 수련' },
    },
    {
      image: 버서커,
      name: '버서커',
      fullName: '버서커',
      engraving: { engraving1: '광기', engraving2: '광전사의 비기' },
    },
    {
      image: 슬레이어,
      name: '슬레',
      fullName: '슬레이어',
      engraving: { engraving1: '처단자', engraving2: '포식자' },
    },
    {
      image: 워로드,
      name: '워로드',
      fullName: '워로드',
      engraving: { engraving1: '고독한 기사', engraving2: '전투 태세' },
    },
    {
      image: 홀리나이트,
      name: '홀나',
      fullName: '홀리나이트',
      engraving: { engraving1: '심판자', engraving2: '축복의 오라' },
    },
    {
      image: 기공사,
      name: '기공',
      fullName: '기공사',
      engraving: { engraving1: '세맥타통', engraving2: '역천지체' },
    },
    {
      image: 배틀마스터,
      name: '배마',
      fullName: '배틀마스터',
      engraving: { engraving1: '오의 강화', engraving2: '초심' },
    },
    {
      image: 스트라이커,
      name: '스커',
      fullName: '스트라이커',
      engraving: { engraving1: '일격필살', engraving2: '오의난무' },
    },
    {
      image: 인파이터,
      name: '인파',
      fullName: '인파이터',
      engraving: { engraving1: '극의: 체술', engraving2: '충격 단련' },
    },
    {
      image: 창술사,
      name: '창술',
      fullName: '창술사',
      engraving: { engraving1: '절정', engraving2: '절제' },
    },
    {
      image: 건슬링어,
      name: '건슬',
      fullName: '건슬링어',
      engraving: { engraving1: '사냥의 시간', engraving2: '피스메이커' },
    },
    {
      image: 데빌헌터,
      name: '데헌',
      fullName: '데빌헌터',
      engraving: { engraving1: '강화 무기', engraving2: '핸드거너' },
    },
    {
      image: 블래스터,
      name: '블래',
      fullName: '블래스터',
      engraving: { engraving1: '포격 강화', engraving2: '화력 강화' },
    },
    {
      image: 스카우터,
      name: '스카',
      fullName: '스카우터',
      engraving: { engraving1: '아르데타인의 기술', engraving2: '진화의 유산' },
    },
    {
      image: 호크아이,
      name: '호크',
      fullName: '호크아이',
      engraving: { engraving1: '두 번째 동료', engraving2: '죽음의 습격' },
    },
    {
      image: 바드,
      name: '바드',
      fullName: '바드',
      engraving: { engraving1: '절실한 구원', engraving2: '진실된 용맹' },
    },
    {
      image: 서머너,
      name: '서머너',
      fullName: '서머너',
      engraving: { engraving1: '상급 소환사', engraving2: '넘치는 교감' },
    },
    {
      image: 소서리스,
      name: '소서',
      fullName: '소서리스',
      engraving: { engraving1: '점화', engraving2: '환류' },
    },
    {
      image: 아르카나,
      name: '알카',
      fullName: '아르카나',
      engraving: { engraving1: '황제의 칙령', engraving2: '황후의 은총' },
    },
    {
      image: 데모닉,
      name: '데모닉',
      fullName: '데모닉',
      engraving: { engraving1: '멈출 수 없는 충동', engraving2: '완벽한 억제' },
    },
    {
      image: 리퍼,
      name: '리퍼',
      fullName: '리퍼',
      engraving: { engraving1: '갈증', engraving2: '달의 소리' },
    },
    {
      image: 블레이드,
      name: '블레',
      fullName: '블레이드',
      engraving: { engraving1: '잔재된 기운', engraving2: '버스트' },
    },
    {
      image: 도화가,
      name: '도화가',
      fullName: '도화가',
      engraving: { engraving1: '만개', engraving2: '회귀' },
    },
    {
      image: 기상술사,
      name: '기상',
      fullName: '기상술사',
      engraving: { engraving1: '이슬비', engraving2: '질풍노도' },
    },
    {
      image: ALL,
      name: '전체',
      fullName: '전체',
      engraving: { engraving1: '', engraving2: '' },
    },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };
  const selectClassMenuHandler = (index) => {
    setCurrentClassTab(index);
  };
  const initialNumber = () => {
    number = 1;
  };
  const initialEngravings = () => {
    setCurrentClassEngraving(false);
    setCurrentClassEngraving2(false);
  };

  const serverListItem = (
    <ServerList>
      <ul>
        {server.map((item, index) => (
          <ServerListli
            borderFirst="true"
            key={nanoid()}
            onClick={() => {
              selectMenuHandler(index);
              setServerName(item.name);
              setCookie();
              initialNumber();
            }}
            active={currentTab === index && 'true'}
          >
            {item.name}
          </ServerListli>
        ))}
      </ul>
    </ServerList>
  );

  const classListItem = (
    <ServerList>
      <ul style={{ justifyContent: 'center' }}>
        {classList.map((item, index) => (
          <ServerListli
            borderFirst="true"
            key={nanoid()}
            onClick={() => {
              selectClassMenuHandler(index);
              setClassName(item.fullName);
              setCookie();
              initialNumber();
              initialEngravings();
            }}
            active={currentClassTab === index && 'true'}
            style={{
              width: '15%',
              fontSize: '12px',
            }}
          >
            <div className="itemWrap">
              <img src={item.image} alt={item.name} />
              <div style={{ textAlign: 'center' }}>{item.name}</div>
            </div>
          </ServerListli>
        ))}
      </ul>
    </ServerList>
  );

  const classEngravingItem = (
    <ServerList>
      <ul>
        {classList.map(
          (item, index) =>
            className &&
            currentClassTab === index && (
              <Fragment key={nanoid()}>
                <ServerListli
                  borderFirst="true"
                  key={nanoid()}
                  onClick={() => {
                    setCurrentClassEngraving({
                      index,
                      name: item.engraving.engraving1,
                      click: !currentClassEngraving.click,
                    });
                    setCookie();
                  }}
                  active={currentClassEngraving.click && 'true'}
                  style={{ width: '45%' }}
                >
                  <div className="engravings">
                    <div>
                      {classList &&
                        classList[currentClassTab].engraving.engraving1}
                    </div>
                  </div>
                </ServerListli>
                <ServerListli
                  borderFirst="true"
                  key={nanoid()}
                  onClick={() => {
                    setCurrentClassEngraving2({
                      index,
                      name: item.engraving.engraving2,
                      click: !currentClassEngraving2.click,
                    });
                    setCookie();
                  }}
                  active2={currentClassEngraving2.click && 'true'}
                  style={{ width: '45%' }}
                >
                  <div className="engravings">
                    <div>
                      {classList &&
                        classList[currentClassTab].engraving.engraving2}
                    </div>
                  </div>
                </ServerListli>
              </Fragment>
            )
        )}
      </ul>
    </ServerList>
  );

  // serverName이 전체 or 없을때 o
  // 서버가 선택됐을때(직업 전체) o
  // 직업이 선택됐을때
  // 직업과 직각이 선택됐을때
  // 서버가 선택됐고, 직업이 선택됐을때(직각 전체)
  // 서버와 직업이 선택됐고, 직각이 하나만 선택됐을때
  // 서버와 직업이 선택됐고, 직각이 둘 다 선택됐을때

  return (
    <Background>
      <Header />
      <ContainerBox>
        <RankingWrap>
          <>
            <Notice>
              ※ 랭킹 순위는 모로아에 등록된 캐릭터를 기준으로 합니다.
            </Notice>
            <RankIndexWrap>
              <div>
                <ul>
                  <li className="rank">순위</li>
                  <li className="guildName">닉네임</li>
                  <li className="serverName">레벨</li>
                  <li className="memberCount">직업</li>
                  <li className="masterName">직업각인</li>
                  <li className="memberCount">서버</li>
                  <li className="guildName">길드</li>
                </ul>
              </div>
              <div style={{ margin: '15px 0' }}>
                <ul style={{ flexDirection: 'column', border: '0' }}>
                  {!characterList && <Loading />}

                  {characterList && // 서버가 전체이거나 선택되지않고 직업이 선택되지 않은 경우(전체o)
                    (!className || className === '전체') &&
                    (!serverName || serverName === '전체') &&
                    !currentClassEngraving.click &&
                    !currentClassEngraving2.click &&
                    characterList.map((item) => (
                      <div className="listWrap" key={nanoid()}>
                        <li className="rank">{number++}</li>
                        <li
                          className="guildName"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/character/${item.name}`);
                          }}
                        >
                          {item.name}
                        </li>
                        <li className="serverName">{item.level}</li>
                        <li className="memberCount">{item.class}</li>
                        <li className="masterName">
                          {item.engravings !== undefined &&
                            item.engravings.map((items) =>
                              items !== undefined ? (
                                <div key={nanoid()}>
                                  <span className="enName">{items.name}</span>
                                  <span className="enLevel">{items.level}</span>
                                </div>
                              ) : (
                                <li className="masterName" key={nanoid()}></li>
                              )
                            )}
                        </li>
                        <li className="memberCount">{item.server}</li>
                        <li className="guildName">{item.guild}</li>
                      </div>
                    ))}
                  {characterList && // 서버가 선택됐는데 직업이 전체인 경우
                    (!className || className === '전체') &&
                    (serverName || serverName !== '전체') &&
                    !currentClassEngraving.click &&
                    !currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.server === serverName && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 전체이거나 선택되지 않고 직업이 선택된 경우(전체x)
                    (!className || className !== '전체') &&
                    (!serverName || serverName === '전체') &&
                    !currentClassEngraving.click &&
                    !currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있지 않고 직업이 선택된 경우(전체x), 직각이 둘 다 선택되어 있는 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName === '전체') &&
                    currentClassEngraving.click &&
                    currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있고 직업이 선택된 경우(전체x), 직각이 둘 다 선택되어 있지 않은 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName !== '전체') &&
                    !currentClassEngraving.click &&
                    !currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className &&
                        item.server === serverName && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있고 직업이 선택된 경우(전체x), 직각이 둘 다 선택되어 있는 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName !== '전체') &&
                    currentClassEngraving.click &&
                    currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className &&
                        item.server === serverName && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있지 않고 직업과 직각1만 선택되어있는 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName === '전체') &&
                    currentClassEngraving.click &&
                    !currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className &&
                        (item.engravings[0]?.name ===
                          currentClassEngraving.name ||
                          item.engravings[1]?.name ===
                            currentClassEngraving.name) && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있고 직업과 직각1만 선택되어있는 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName !== '전체') &&
                    currentClassEngraving.click &&
                    !currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className &&
                        item.server === serverName &&
                        (item.engravings[0]?.name ===
                          currentClassEngraving.name ||
                          item.engravings[1]?.name ===
                            currentClassEngraving.name) && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있지 않고 직업과 직각2만 선택되어있는 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName === '전체') &&
                    !currentClassEngraving.click &&
                    currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className &&
                        (item.engravings[0]?.name ===
                          currentClassEngraving2.name ||
                          item.engravings[1]?.name ===
                            currentClassEngraving2.name) && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                  {characterList && // 서버가 선택되어 있고 직업과 직각2만 선택되어있는 경우
                    (!className || className !== '전체') &&
                    (!serverName || serverName !== '전체') &&
                    !currentClassEngraving.click &&
                    currentClassEngraving2.click &&
                    characterList.map(
                      (item) =>
                        item.class === className &&
                        item.server === serverName &&
                        (item.engravings[0]?.name ===
                          currentClassEngraving2.name ||
                          item.engravings[1]?.name ===
                            currentClassEngraving2.name) && (
                          <div className="listWrap" key={nanoid()}>
                            <li className="rank">{number++}</li>
                            <li
                              className="guildName"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(`/character/${item.name}`);
                              }}
                            >
                              {item.name}
                            </li>
                            <li className="serverName">{item.level}</li>
                            <li className="memberCount">{item.class}</li>
                            <li className="masterName">
                              {item.engravings !== undefined &&
                                item.engravings.map((items) =>
                                  items !== undefined ? (
                                    <div key={nanoid()}>
                                      <span className="enName">
                                        {items.name}
                                      </span>
                                      <span className="enLevel">
                                        {items.level}
                                      </span>
                                    </div>
                                  ) : (
                                    <li
                                      className="masterName"
                                      key={nanoid()}
                                    ></li>
                                  )
                                )}
                            </li>
                            <li className="memberCount">{item.server}</li>
                            <li className="guildName">{item.guild}</li>
                          </div>
                        )
                    )}
                </ul>
              </div>
            </RankIndexWrap>
          </>
        </RankingWrap>
        <ServerWrapWrap>
          <ServerWrap>
            <CommonContentBox
              title="직업"
              equipment="true"
              rank="true"
              itemList={classListItem}
            />
          </ServerWrap>
          <ServerWrap>
            <CommonContentBox
              title="직업 각인"
              equipment="true"
              rank="true"
              itemList={classEngravingItem}
            />
          </ServerWrap>
          <ServerWrap>
            <CommonContentBox
              title="서버"
              equipment="true"
              rank="true"
              itemList={serverListItem}
            />
          </ServerWrap>
        </ServerWrapWrap>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Rank;
