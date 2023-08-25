import styled from 'styled-components';
import Background from '../component/UI/BackBox';
import Header from '../component/header/Header';
import Footer from '../component/UI/Footer';
import { Container } from './Home';
import { Message } from './Character';

const Coummunity = () => {
  return (
    <Background>
      <Header />
      <ContainerBox>
        <Message>페이지 준비 중 입니다.</Message>
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
