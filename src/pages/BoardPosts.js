import styled from 'styled-components';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';

const BoardPosts = () => {
  return (
    <Background>
      <Header />
      <ContainerBox>글 작성</ContainerBox>
      <Footer />
    </Background>
  );
};

export default BoardPosts;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
`;
