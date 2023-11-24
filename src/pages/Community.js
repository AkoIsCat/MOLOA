import styled from 'styled-components';
import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import { Message } from './Character';
import SignIn from '../components/Community/SignIn';

const Coummunity = () => {
  const toggle = true;

  return (
    <Background>
      <Header />
      <ContainerBox>
        {!toggle && <Message>페이지 준비 중 입니다.</Message>}
        {toggle && (
          <>
            <Side>
              <SignIn />
            </Side>
            <Section></Section>
          </>
        )}
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Coummunity;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
`;

const Side = styled.aside`
  width: 20vw;
  height: auto;
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Section = styled.section`
  width: 100%;
  background: ;
`;
