import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { SELECT_SERVER, INITIAL_SERVER } from '../redux/modules/serverSlice';
import { SELECT_CLASS, INITIAL_CLASS } from '../redux/modules/classSlice';
import {
  INITIAL_ENGRAVINGS,
  SELECT_ENGRAVING1,
  SELECT_ENGRAVING2,
} from '../redux/modules/jobEngravingSlice';
import useGetFirebaseData from '../hooks/useGetFirebaseData';

import Header from '../components/Header/Header';
import Background from '../components/UI/BackBox';
import { Container } from './Home';
import RankingBox from '../components/Rank/RankingBox';
import ServerList from '../components/Rank/ServerList';
import ClassListBox from '../components/Rank/ClassListBox';
import EngravingsListBox from '../components/Rank/EngravingsListBox';
import Footer from '../components/UI/Footer';
import InitialButton from '../components/Rank/InitialButton';

const Rank = () => {
  const { server } = useSelector((state) => state.server);
  const { serverNumber } = useSelector((state) => state.server);
  const { class: className } = useSelector((state) => state.class);
  const { classNumber } = useSelector((state) => state.class);
  const { engraving1 } = useSelector((state) => state.jobEngraving);
  const { engraving2 } = useSelector((state) => state.jobEngraving);

  const dispatch = useDispatch();
  const selectServer = (payload) => dispatch(SELECT_SERVER(payload));
  const selectClass = (payload) => dispatch(SELECT_CLASS(payload));
  const selectEngraving1 = (payload) => dispatch(SELECT_ENGRAVING1(payload));
  const selectEngraving2 = (payload) => dispatch(SELECT_ENGRAVING2(payload));
  const initialEngraving = () => dispatch(INITIAL_ENGRAVINGS());
  const initialClass = () => dispatch(INITIAL_CLASS());
  const initialServer = () => dispatch(INITIAL_SERVER());

  const { data: characterList } = useGetFirebaseData(
    'characterList',
    'CharacterSearch',
    0,
    (data) => {
      const changeArray = changeObjectToObjectArray(data);
      const sortCharacterList = sortArray(changeArray);
      return sortCharacterList;
    }
  );

  const { data: classList, isLoading: classIsLoading } = useGetFirebaseData(
    'classList',
    'ClassList',
    Infinity
  );

  const { data: jobEngravings } = useGetFirebaseData(
    'jobEngravings',
    'JobEngraving',
    Infinity,
    (data) => Object.values(data)
  );

  function changeObjectToObjectArray(data) {
    const changeObjectArray = Object.entries(data).map(([, value]) => ({
      name: value.name,
      views: value.views,
      class: value.class,
      engravings: value.engravings,
      guild: value.guild,
      level: value.level,
      server: value.server,
    }));

    return changeObjectArray;
  }

  function sortArray(array) {
    const sortCharacterList = array.sort((a, b) => {
      const itemMaxLevelA = parseFloat(a.level.replace(',', '')); // 쉼표 제거 후 숫자로 변환
      const itemMaxLevelB = parseFloat(b.level.replace(',', '')); // 쉼표 제거 후 숫자로 변환
      return itemMaxLevelB - itemMaxLevelA; // 내림차순으로 정렬
    });
    return sortCharacterList;
  }

  return (
    <Background>
      <Header />
      <ContainerBox>
        <RankingBox
          characterList={characterList}
          className={className}
          engraving1={engraving1}
          engraving2={engraving2}
          serverName={server}
          engraving={jobEngravings}
        />
        <ServerWrap>
          <InitialButton
            initialClass={initialClass}
            initialServer={initialServer}
            initialEngraving={initialEngraving}
          />
          <ClassListBox
            classList={classList}
            isLoading={classIsLoading}
            selectClass={selectClass}
            classNumber={classNumber}
            initialEngraving={initialEngraving}
          />
          <EngravingsListBox
            classList={classList}
            className={className}
            classNumber={classNumber}
            engraving1={engraving1}
            engraving2={engraving2}
            selectEngraving1={selectEngraving1}
            selectEngraving2={selectEngraving2}
          />
          <ServerList serverNumber={serverNumber} selectServer={selectServer} />
        </ServerWrap>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Rank;

const ContainerBox = styled(Container)`
  min-height: 100vh;
  width: auto;
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-around;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: column-reverse;
  }
`;

const ServerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: auto;
  margin: 100px 20px 100px 0;
`;
