import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

import Notice from '../UI/Notice';
import Loading from '../UI/Loading';

const RankingBox = ({
  characterList,
  className,
  currentClassEngraving,
  currentClassEngraving2,
  serverName,
}) => {
  const navigate = useNavigate();

  const RenderCharacterList = () => {
    if (!characterList) {
      return <Loading />;
    }

    const filteredCharacters = characterList.filter((item) => {
      const isClassMatch =
        !className || className === '전체' || item.class === className;
      const isServerMatch =
        !serverName || serverName === '전체' || item.server === serverName;
      const hasEngravingMatch =
        (!currentClassEngraving.click ||
          (item.engravings &&
            item.engravings.some(
              (engraving) => engraving.name === currentClassEngraving.name
            ))) &&
        (!currentClassEngraving2.click ||
          (item.engravings &&
            item.engravings.some(
              (engraving) => engraving.name === currentClassEngraving2.name
            )));
      return isClassMatch && isServerMatch && hasEngravingMatch;
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
          <RenderCharacterList />
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
