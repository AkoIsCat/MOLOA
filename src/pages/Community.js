import styled from 'styled-components';
import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import { Message } from './Character';
import SignIn from '../components/Community/SignIn';
import { useEffect, useState } from 'react';
import { getNickname, signInData } from '../api/Sign/SignAxios';

const Coummunity = () => {
  const toggle = false;
  const [nickname, setNickname] = useState(undefined);

  const getNicknameData = async () => {
    const response = await getNickname();
    setNickname(response.nickname);
  };

  useEffect(() => {
    toggle && getNicknameData();
  }, [toggle, nickname]);

  const onClickSignIn = async (data) => {
    const response = await signInData(data);
    if (response.success) {
      localStorage.setItem('userId', data.id);
      const nicknameRes = await getNickname();
      setNickname(nicknameRes.nickname);
      alert('로그인에 성공하였습니다.');
    } else if (response.data.error) {
      alert('아이디나 비밀번호가 일치하지 않습니다.');
    }
  };

  const onClickLogout = () => {
    localStorage.removeItem('userId');
    setNickname(undefined);
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        {!toggle && <Message>페이지 준비 중 입니다.</Message>}
        {toggle && (
          <>
            <Side>
              <SignIn
                nickname={nickname}
                onClickLogout={onClickLogout}
                onClickSignIn={onClickSignIn}
              />
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
