import styled from 'styled-components';
import { nanoid } from 'nanoid';

import Loading from '../UI/Loading';
import SelectServerPhrases from './SelectServerPhrases';
import Notice from '../UI/Notice';

const RankingBox = ({ isSelect, serverName, guildRanking, isLoading }) => {
  return (
    <>
      <RankingWrap>
        {!isSelect && (
          <SelectServerPhrases>서버를 먼저 선택해 주세요.</SelectServerPhrases>
        )}
        {isSelect && isLoading && <Loading />}
        {isSelect && !isLoading && (
          <>
            <Notice
              Instructions={
                '※ 길드 순위는 서버별로 일정 순위까지만 표시됩니다.'
              }
            />
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
    </>
  );
};

export default RankingBox;

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

const RankIndexWrap = styled.div`
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
