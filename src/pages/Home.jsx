import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import Header from '../components/Header/Header';
import Background from '../components/UI/BackBox';
import LeftAside from '../components/Home/LeftAside/LeftAside';
import RightAside from '../components/Home/RightAside/RightAside';
import MainContents from '../components/Home/MainContents/MainContents';
import Footer from '../components/UI/Footer';
import TopButton from '../components/UI/TopButton';

const Home = () => {
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  return (
    <div>
      {(isPc || isTablet) && (
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
            <TopButton />
          </Container>
          <Footer />
        </Background>
      )}
      {isMobile && (
        <Background>
          <Header />
          <Container>
            <MainContent>
              <MainContents />
            </MainContent>
            <LeftSide>
              <LeftAside />
            </LeftSide>
            <LeftSide>
              <RightAside />
            </LeftSide>
            <TopButton />
            <Footer />
          </Container>
        </Background>
      )}
    </div>
  );
};

export default Home;

export const Container = styled.div`
  display: flex;
  height: auto;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }
`;

const LeftSide = styled.aside`
  width: 21%;
  height: auto;
  background: #1e2225;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${(props) => props.theme.mobile} {
    width: 97%;
    padding: 0;
    margin: 10px 0;
    padding-left: 20px;
  }
`;

const MainContent = styled.main`
  width: 58%;
  height: 100%;
  background: #1e2225;
  margin: 20px;

  @media ${(props) => props.theme.mobile} {
    width: 97%;
    margin-top: 10px;
    padding: 0;
  }
`;
