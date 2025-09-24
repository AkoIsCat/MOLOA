import styled from 'styled-components';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import SignUpForm from '../components/Community/Signup';
import { Container } from './Home';

const SignUp = () => {
  return (
    <Background>
      <Header />
      <ContainerBox>
        <SignUpForm />
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default SignUp;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 72.5vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
