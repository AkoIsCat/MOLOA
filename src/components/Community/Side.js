import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getNickname } from '../../api/Sign/SignAxios';
import { signInData } from '../../api/Sign/SignAxios';

import SignIn from './SignIn';

const Side = () => {
  const [nickname, setNickname] = useState(undefined);

  const getNicknameData = async () => {
    const response = await getNickname();
    setNickname(response.nickname);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }
    getNicknameData();
  }, [nickname]);

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
    <SideWrap>
      <SignIn
        nickname={nickname}
        onClickLogout={onClickLogout}
        onClickSignIn={onClickSignIn}
      />
    </SideWrap>
  );
};

export default Side;

const SideWrap = styled.aside`
  width: 20vw;
  height: auto;
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
