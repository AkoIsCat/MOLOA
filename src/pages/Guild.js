import styled from 'styled-components';

import Header from '../components/Header/Header';
import Background from '../components/UI/BackBox';
import { Container } from './Home';
import ServerList from '../components/Guild/ServerList';
import RankingBox from '../components/Guild/RankingBox';

import { useEffect, useState } from 'react';
import Footer from '../components/UI/Footer';
import { getGuildRanking } from '../api/LostArk/LostarkAxios';

const Guild = () => {
  const [guildRanking, setGuildRanking] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectServer, setSelectServer] = useState(false); // 초기 서버 선택 여부
  const [serverName, setServerName] = useState(); // 선택된 서버 이름

  useEffect(() => {
    if (serverName !== undefined) {
      const loadGuildRanking = async () => {
        try {
          const data = await getGuildRanking(serverName);
          setGuildRanking(data);
          setIsLoading(false);
        } catch (err) {
          console.log('LostArk loadGuildRanking error!!');
        }
      };

      loadGuildRanking();
    }
  }, [serverName]);

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
          isLoading={isLoading}
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
