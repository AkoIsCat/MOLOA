import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseData } from '../api/FirebaseAxios';

import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import { Container } from './Home';
import CommonContentBox from '../component/UI/Home/RightAside/CommonContentBox';

import Loading from '../component/UI/Loading';
import Footer from '../component/UI/Footer';
import { Fragment } from 'react';

const Rank = () => {
  const [characterList, setCharacterList] = useState();
  const [firebaseClassList, setClassList] = useState();
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

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await getFirebaseData('CharacterSearch');

        // 객체를 객체 배열로 만들기
        const popularCharacterArray = [];
        for (const [key, value] of Object.entries(data)) {
          popularCharacterArray.push({
            key,
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

    const loadClassList = async () => {
      try {
        const data = await getFirebaseData('ClassList');
        setClassList(data);
      } catch (err) {
        console.log(err);
        console.log('ClassList load Error!!');
      }
    };

    loadCharacter();
    loadClassList();
  }, []);

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

  const classList = firebaseClassList;

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };
  const selectClassMenuHandler = (index) => {
    setCurrentClassTab(index);
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
        {classList &&
          classList.map((item, index) => (
            <ServerListli
              borderFirst="true"
              key={nanoid()}
              onClick={() => {
                selectClassMenuHandler(index);
                setClassName(item.fullName);
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
        {classList &&
          classList.map(
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

  const renderCharacterList = () => {
    if (!characterList) {
      return <Loading />;
    }

    const filteredCharacters = characterList.filter((item) => {
      const isClassMatch =
        !className || className === '전체' || item.class === className;
      const isServerMatch =
        !serverName || serverName === '전체' || item.server === serverName;
      const isEngravingMatch =
        (!currentClassEngraving.click ||
          item.engravings.some(
            (engraving) => engraving.name === currentClassEngraving.name
          )) &&
        (!currentClassEngraving2.click ||
          item.engravings.some(
            (engraving) => engraving.name === currentClassEngraving2.name
          ));
      return isClassMatch && isServerMatch && isEngravingMatch;
    });

    return (
      <div style={{ margin: '15px 0' }}>
        <ul style={{ flexDirection: 'column', border: '0' }}>
          {filteredCharacters.map((item, index) => (
            <div className="listWrap" key={nanoid()}>
              <li className="rank">{index + 1}</li>
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
                  item.engravings.map((engraving) =>
                    engraving !== undefined ? (
                      <div key={nanoid()}>
                        <span className="enName">{engraving.name}</span>
                        <span className="enLevel">{engraving.level}</span>
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
        </ul>
      </div>
    );
  };

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
              {renderCharacterList()}
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
    align-items: center;

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
