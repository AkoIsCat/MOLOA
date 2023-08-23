import styled from 'styled-components';
import { nanoid } from 'nanoid';

import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import { Container } from './Home';
import CommonContentBox from '../component/UI/Home/RightAside/CommonContentBox';
import Loading from '../component/UI/Loading';

import { useEffect, useState } from 'react';
import Footer from '../component/UI/Footer';

const lostArkKey = process.env.REACT_APP_LOSTARK_KEY;

const Guild = () => {
  const [guildRanking, setGuildRanking] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(); // 서버 네비게이션
  const [selectServer, setSelectServer] = useState(false); // 초기 서버 선택 여부
  const [serverName, setServerName] = useState(); // 선택된 서버 이름

  useEffect(() => {
    if (serverName !== undefined) {
      const loadGuildRanking = async () => {
        try {
          const response = await fetch(
            `https://developer-lostark.game.onstove.com/guilds/rankings?serverName=${serverName}
          `,
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${lostArkKey}`,
              },
            }
          );
          const responseData = await response.json();

          setGuildRanking(responseData);
          setIsLoading(false);
        } catch (err) {
          console.log('LostArk loadGuildRanking error!!');
        }
      };

      loadGuildRanking();
    }
  }, [serverName]);

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
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    setSelectServer(true);
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

  return (
    <Background>
      <Header />
      <ContainerBox>
        <RankingWrap>
          {!selectServer && (
            <SelectServerPhrases>
              서버를 먼저 선택해 주세요.
            </SelectServerPhrases>
          )}
          {selectServer && isLoading && <Loading />}
          {selectServer && !isLoading && (
            <>
              <Notice>
                ※ 길드 순위는 서버별로 일정 순위까지만 표시됩니다.
              </Notice>
              <RankIndexWrap>
                <div>
                  <ul>
                    <li className="rank">순위</li>
                    <li className="guildName">길드명</li>
                    <li className="serverName">서버</li>
                    <li className="memberCount">인원</li>
                    <li className="masterName">길드마스터</li>
                    <li className="guildMessage">길드소개</li>
                  </ul>
                </div>
                <div style={{ margin: '15px 0' }}>
                  <ul style={{ flexDirection: 'column', border: '0' }}>
                    {guildRanking &&
                      guildRanking.map((item) => (
                        <div className="listWrap" key={nanoid()}>
                          <li className="rank">{item.Rank}</li>
                          <li className="guildName">{item.GuildName}</li>
                          <li className="serverName">{serverName}</li>
                          <li className="memberCount">{item.MemberCount}</li>
                          <li className="masterName">{item.MasterName}</li>
                          <li className="guildMessage">{item.GuildMessage}</li>
                        </div>
                      ))}
                  </ul>
                </div>
              </RankIndexWrap>
            </>
          )}
        </RankingWrap>
        <ServerWrap>
          <CommonContentBox
            title="서버"
            equipment="true"
            guild="true"
            itemList={serverListItem}
          />
        </ServerWrap>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Guild;

const ContainerBox = styled(Container)`
  min-height: 100vh;
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-around;

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    flex-direction: column-reverse;
  }
`;

const RankingWrap = styled.div`
  @media ${(props) => props.theme.desktop} {
    width: 77%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 72%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const ServerWrap = styled.div`
  padding: 30px 0px;
  height: auto;
  width: 18%;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.mobile} {
    margin-top: 40px;
    width: 90%;
    padding: 0 25px;
    text-align: center;
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
  color: ${(props) => (props.active ? '#fff' : '#c1c1c1')};
  cursor: pointer;

  border-radius: ${(props) =>
    props.borderFirst
      ? '10px 0 0 10px'
      : props.borderEnd
      ? '0 10px 10px 0'
      : ''};

  &:hover {
    color: #fff;
  }
`;

const SelectServerPhrases = styled.div`
  width: 60%;
  height: 10vh;
  font-family: 'Nanum Gothic';
  background: #373e44;
  color: #fff;
  font-size: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  border-radius: 10px;

  @media ${(props) => props.theme.mobile} {
    font-size: 14px;
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

  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;
