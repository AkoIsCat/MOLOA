import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignInValidation from '../../hooks/useSignInValidation';

import InputField from '../UI/InputField';
import SignTitle from '../UI/SignTitle';
import SignButton from '../UI/SignButton';
import TopButton from '../UI/TopButton';
import { signInData } from '../../api/Sign/SignAxios';

const SignIn = () => {
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
  });

  const [idStatus, pwStatus] = useSignInValidation(inputData);

  const navigate = useNavigate();

  const onChangeId = (e) => {
    setInputData({
      ...inputData,
      id: e.target.value,
    });
  };

  const onChangePw = (e) => {
    setInputData({
      ...inputData,
      password: e.target.value,
    });
  };

  const onSubmitButton = async () => {
    const response = await signInData(inputData);
    if (response.success) {
      alert('로그인에 성공하였습니다.');
    } else if (response.error) {
      alert('아이디나 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Wrap>
      <ItemWrap>
        <SignTitle size="small" title="아이디" />
        <InputField type="id" onChange={onChangeId} />
      </ItemWrap>
      <ItemWrap>
        <SignTitle size="small" title="비밀번호" />
        <InputField type="password" onChange={onChangePw} />
      </ItemWrap>
      <SignButton
        name="로그인"
        idStatus={idStatus}
        pwStatus={pwStatus}
        onClick={() => onSubmitButton()}
      />
      <ItemWrap>
        <div className="info">아이디가 없으신가요?</div>
        <div className="signup" onClick={() => navigate('/signup')}>
          회원가입
        </div>
      </ItemWrap>
      <TopButton />
    </Wrap>
  );
};

export default SignIn;

const Wrap = styled.div`
  width: 85%;
  height: 220px;
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
  align-items: flex-end;
  margin: 10px 0;

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

  .message {
    height: auto;
    margin: 10px 0;
    font-size: 12px;
    height: 5px;
    color: #ed895d;
  }
`;
