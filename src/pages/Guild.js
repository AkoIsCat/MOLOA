import styled from 'styled-components';
import { getGuildRanking } from '../api/LostArk/LostarkAxios';
import { useGetLostArkData } from '../hooks/useGetLostArkData';
import { useSelector, useDispatch } from 'react-redux';
import { SELECT_GUILD } from '../redux/modules/guildSlice';

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

  const { server } = useSelector((state) => state.guild);
  const { serverNumber } = useSelector((state) => state.guild);

  const dispatch = useDispatch();
  const selectServer = (payload) => dispatch(SELECT_GUILD(payload));

  const { data: guildRanking, isLoading: guildRankingIsLoading } =
    useGetLostArkData(
      'guildRank',
      server,
      getGuildRanking,
      contentUpdateTime.getTime() - date.getTime()
    );

  return (
    <Background>
      <Header />
      <ContainerBox>
        <RankingBox
          serverName={server}
          guildRanking={guildRanking}
          isLoading={guildRankingIsLoading}
        />
        <ServerList selectServer={selectServer} serverNumber={serverNumber} />
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
