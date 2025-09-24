import React from 'react';
import styled from 'styled-components';

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
];

const ServerList = ({ selectServer, serverNumber }) => {
  const serverListItem = (
    <ServerListBox>
      <ul>
        {server.map((item, index) => (
          <ServerListli
            borderFirst="true"
            key={item.name}
            onClick={() => {
              alert('현재는 사용할 수 없는 기능입니다.');
              // selectServer({
              //   server: item.name,
              //   number: index,
              // });
            }}
            active={serverNumber === index && 'true'}
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
        guild="true"
        itemList={serverListItem}
      />
    </ServerWrap>
  );
};

export default ServerList;

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
const ServerListBox = styled.div`
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
