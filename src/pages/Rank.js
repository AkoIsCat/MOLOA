import styled from 'styled-components';
import { useState } from 'react';
import { getFirebaseData } from '../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';

import Header from '../components/Header/Header';
import Background from '../components/UI/BackBox';
import { Container } from './Home';
import RankingBox from '../components/Rank/RankingBox';
import ServerList from '../components/Rank/ServerList';
import ClassListBox from '../components/Rank/ClassListBox';
import EngravingsListBox from '../components/Rank/EngravingsListBox';
import Footer from '../components/UI/Footer';

const Rank = () => {
  const [serverName, setServerName] = useState(); // 선택된 서버 이름
  const [currentClassTab, setCurrentClassTab] = useState(); // 직업 네비게이션
  const [className, setClassName] = useState(); // 선택된 직업 이름
  const [currentClassEngraving, setCurrentClassEngraving] = useState({
    click: false,
  }); // 직각 네비게이션
  const [currentClassEngraving2, setCurrentClassEngraving2] = useState({
    click: false,
  }); // 직각2 네비게이션

  const { data: characterList } = useQuery(
    'characterList',
    () => getFirebaseData('CharacterSearch'),
    {
      select: (data) => {
        const changeArray = changeObjectToObjectArray(data);
        const sortCharacterList = sortArray(changeArray);
        return sortCharacterList;
      },
      refetchOnWindowFocus: false,
    }
  );

  const { data: classList, isLoading: classIsLoading } = useQuery(
    'classList',
    () => getFirebaseData('ClassList'),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const { data: jobEngravings } = useQuery(
    'jobEngravings',
    () => getFirebaseData('JobEngraving'),
    {
      select: (data) => Object.values(data),
      refetchOnWindowFocus: false,
    }
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

  const getSelectedData = (serverName) => {
    setServerName(serverName);
  };

  const getSelectedClassData = (className, engraving1, engraving2, tab) => {
    setClassName(className);
    setCurrentClassEngraving(engraving1);
    setCurrentClassEngraving2(engraving2);
    setCurrentClassTab(tab);
  };

  const getSelectedEngravingsData = (engraving1, engraving2) => {
    setCurrentClassEngraving(engraving1);
    setCurrentClassEngraving2(engraving2);
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        <RankingBox
          characterList={characterList}
          className={className}
          currentClassEngraving={currentClassEngraving}
          currentClassEngraving2={currentClassEngraving2}
          serverName={serverName}
          engraving={jobEngravings}
        />
        <ServerWrap>
          <ClassListBox
            classList={classList}
            isLoading={classIsLoading}
            getSelectedClassData={getSelectedClassData}
          />
          <EngravingsListBox
            classList={classList}
            className={className}
            currentClassTab={currentClassTab}
            getSelectedEngravingsData={getSelectedEngravingsData}
          />
          <ServerList getSelectedData={getSelectedData} />
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
  width: auto;
  margin: 100px 20px 100px 0;
`;
