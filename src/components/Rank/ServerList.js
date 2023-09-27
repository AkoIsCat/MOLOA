import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';

import CommonContentBox from '../UI/CommonContentBox';

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

const ServerList = ({ getSelectedData }) => {
  const [serverName, setServerName] = useState();
  const [currentTab, setCurrentTab] = useState();

  const sendData = useCallback(() => {
    getSelectedData(serverName);
  }, [serverName, getSelectedData]);

  useEffect(() => {
    if (serverName !== '') {
      sendData();
    }
  }, [serverName, sendData]);

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  const serverListItem = (
    <ServerListBox>
      <ul>
        {server.map((item, index) => (
          <ServerListli
            borderFirst="true"
            key={item.name}
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
    </ServerListBox>
  );

  return (
    <ServerWrap>
      <CommonContentBox
        title="서버"
        equipment="true"
        rank="true"
        itemList={serverListItem}
      />
    </ServerWrap>
  );
};

export default ServerList;

export const ServerWrap = styled.div`
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

export const ServerListBox = styled.div`
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

export const ServerListli = styled.li`
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
