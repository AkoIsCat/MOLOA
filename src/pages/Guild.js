import styled from 'styled-components';
import { useState } from 'react';
import { getGuildRanking } from '../api/LostArk/LostarkAxios';
import { useQuery } from 'react-query';

import Header from '../components/Header/Header';
import Background from '../components/UI/BackBox';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import ServerList from '../components/Guild/ServerList';
import RankingBox from '../components/Guild/RankingBox';

const Guild = () => {
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date();
  const contentUpdateTime = new Date();
  contentUpdateTime.setDate(
    date.getDate() + (date.getDay() - WEEKDAY.indexOf('수') + 1)
  );
  contentUpdateTime.setHours(10);
  contentUpdateTime.setMinutes(0);
  contentUpdateTime.setSeconds(0);

  const [selectServer, setSelectServer] = useState(false); // 초기 서버 선택 여부
  const [serverName, setServerName] = useState(); // 선택된 서버 이름

  const { data: guildRanking, isLoading: guildRankingIsLoading } = useQuery(
    ['guildRank', serverName],
    () => getGuildRanking(serverName),
    {
      refetchOnWindowFocus: false,
      staleTime: contentUpdateTime.getTime() - date.getTime(),
      enabled: !!selectServer,
    }
  );

  const getSelectedData = (isSelected, serverName) => {
    setSelectServer(isSelected);
    setServerName(serverName);
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        <RankingBox
          isSelect={selectServer}
          serverName={serverName}
          guildRanking={guildRanking}
          isLoading={guildRankingIsLoading}
        />
        <ServerList getSelectedData={getSelectedData} />
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Guild;

const ContainerBox = styled(Container)`
  min-height: 75vh;
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-around;

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
    flex-direction: column-reverse;
  }
`;
