import styled from 'styled-components';

import InnerContent from '../../UI/InnerContent';
import CommonContentBox from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';
import { FaDiscord } from 'react-icons/fa';

const DiscordList = ({ discord, discordIsLoading }) => {
  const discordItemList =
    discord &&
    discord.map((items, index) =>
      discord.length === index + 1 ? (
        <CommonContentBoxMain
          key={items.ServerName}
          id={items.ServerName}
          font="13"
          height="15"
          align="center"
          border="true"
          link="true"
          zero="true"
        >
          <div style={{ fontSize: '14px' }}>{items.ServerName}</div>
          <div
            style={{ fontSize: '10px', cursor: 'pointer' }}
            onClick={() => window.open(`${items.Address}`, '_blank')}
          >
            {items.Address}
          </div>
        </CommonContentBoxMain>
      ) : (
        <CommonContentBoxMain
          key={items.ServerName}
          id={items.ServerName}
          font="13"
          height="15"
          align="center"
          link="true"
          zero="true"
        >
          <div style={{ fontSize: '14px', padding: '0 10px' }}>
            {items.ServerName}
          </div>
          <div
            style={{ fontSize: '10px', cursor: 'pointer' }}
            onClick={() => window.open(`${items.Address}`, '_blank')}
          >
            {items.Address}
          </div>
        </CommonContentBoxMain>
      )
    );

  return (
    <InnerContent height="auto" side={true}>
      <CommonContentBox
        title="서버 디스코드"
        itemList={discordItemList}
        icon={<Discord />}
        loading={discordIsLoading}
      />
    </InnerContent>
  );
};

export default DiscordList;

const Discord = styled(FaDiscord)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;
