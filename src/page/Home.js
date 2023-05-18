import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import LeftAside from '../component/UI/Home/LeftAside/LeftAside';
import RightAside from '../component/UI/Home/RightAside/RightAside';
import MainContents from '../component/UI/Home/MainContents/MainContents';
import Footer from '../component/UI/Footer';

// style components
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
      {isPc && (
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
          <Footer />
        </Background>
      )}
      {isTablet && (
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
            <Footer />
          </Container>
        </Background>
      )}
    </div>
  );
};

export default Home;
