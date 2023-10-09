import styled from 'styled-components';

import Notice from '../UI/Notice';
import CharacterRank from './CharacterRank';

const RankingBox = ({
  characterList,
  className,
  currentClassEngraving,
  currentClassEngraving2,
  serverName,
  engraving,
}) => {
  return (
    <RankingWrap>
      <>
        <Notice
          Instructions={
            '※ 랭킹 순위는 모로아에 등록된 캐릭터를 기준으로 합니다.'
          }
        />
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
          <CharacterRank
            characterList={characterList}
            className={className}
            serverName={serverName}
            currentClassEngraving={currentClassEngraving}
            currentClassEngraving2={currentClassEngraving2}
            engraving={engraving}
          />
        </RankIndexWrap>
      </>
    </RankingWrap>
  );
};

export default RankingBox;

const RankingWrap = styled.div`
  width: 50vw;

  @media ${(props) => props.theme.tablet} {
    width: 80vw;
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
