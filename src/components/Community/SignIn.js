import styled from 'styled-components';
import { useState } from 'react';

import InputField from '../UI/InputField';
import SignTitle from '../UI/SignTitle';
import TopButton from '../UI/TopButton';

const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Wrap>
      <ItemWrap>
        <SignTitle size="small" title="아이디" />
        <InputField type="id" onChange={onChangeId} />
      </ItemWrap>
      <ItemWrap>
        <SignTitle size="small" title="비밀번호" />
        <InputField type="password" onChangePw={onChangePw} />
      </ItemWrap>
      <SignInBtn>로그인</SignInBtn>
      <ItemWrap>
        <div className="info">아이디가 없으신가요?</div>
        <div className="signup">회원가입</div>
      </ItemWrap>
      <TopButton />
    </Wrap>
  );
};

export default SignIn;

const Wrap = styled.div`
  width: 85%;
  height: 200px;
  background: #353c42;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  border-radius: 10px;
  font-family: 'Nanum Gothic';
`;

const ItemWrap = styled.div`
  display: flex;
  color: #c1c1c1;

  .info {
    font-size: 14px;
    margin-top: 10px;
  }

  .signup {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    color: #358ed0;
    cursor: pointer;

    &:hover {
      color: skyblue;
    }
  }
`;

const SignInBtn = styled.button`
  width: 85%;
  height: 30px;
  background: #c1c1c1;
  border-radius: 10px;
  border: 0;
  margin: 5px 0;
  cursor: pointer;
  font-family: 'Nanum Gothic';

  &:hover {
    background: skyblue;
  }
`;
