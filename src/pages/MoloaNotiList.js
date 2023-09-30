import styled from 'styled-components';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import { Container } from './Home';
import Footer from '../components/UI/Footer';

const MoloaNotiList = () => {
  return (
    <Background>
      <Header />
      <ContainerBox>모로아 공지사항 목록</ContainerBox>
      <Footer />
    </Background>
  );
};

export default MoloaNotiList;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
`;
