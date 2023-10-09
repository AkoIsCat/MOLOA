import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loading from '../UI/Loading';
import { updateCharacter } from '../../utils/updateCharacter';

const CharacterRank = ({
  characterList,
  className,
  serverName,
  currentClassEngraving,
  currentClassEngraving2,
  engraving,
}) => {
  const navigate = useNavigate();

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
    <RankIndexWrap>
      <ul style={{ flexDirection: 'column', border: '0' }}>
        {filteredCharacters.map((item, index) => (
          <div className="listWrap" key={item.name}>
            <li className="rank">{index + 1}</li>
            <li
              className="guildName"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/character/${item.name}`);
                updateCharacter(item.name, engraving);
              }}
            >
              {item.name}
            </li>
            <li className="serverName">{item.level}</li>
            <li className="memberCount">{item.class}</li>
            <li className="masterName">
              {item.engravings !== undefined &&
                item.engravings.map((engraving, idx) =>
                  engraving !== undefined ? (
                    <div key={`${engraving.name} ${idx}`}>
                      <span className="enName">{engraving.name}</span>
                      <span className="enLevel">{engraving.level}</span>
                    </div>
                  ) : (
                    <li
                      className="masterName"
                      key={`${engraving.name} ${idx}`}
                    ></li>
                  )
                )}
            </li>
            <li className="memberCount">{item.server}</li>
            <li className="guildName">{item.guild}</li>
          </div>
        ))}
      </ul>
    </RankIndexWrap>
  );
};

export default CharacterRank;

const RankIndexWrap = styled.div`
  width: auto;
  margin: 15px 0;
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
