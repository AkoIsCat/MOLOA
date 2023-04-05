import styled from 'styled-components';

import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import LeftAside from '../component/UI/Home/LeftAside/LeftAside';
import RightAside from '../component/UI/Home/RightAside/RightAside';
import MainContents from '../component/UI/Home/MainContents/MainContents';

// style components
export const Container = styled.div`
  display: flex;
  height: auto;
`;

const LeftSide = styled.aside`
  width: 21%;
  height: auto;
  background: #1e2225;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainContent = styled.main`
  width: 58%;
  height: 100%;
  background: #1e2225;
  margin: 20px;
`;

console.log('홈');

const Home = () => {
  return (
    <Background>
      <Header />
      <Container>
        <LeftSide>
          <LeftAside />
        </LeftSide>
        <MainContent>
          <MainContents />
        </MainContent>
        <LeftSide>
          <RightAside />
        </LeftSide>
      </Container>
    </Background>
  );
};

export default Home;
