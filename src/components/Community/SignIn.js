import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignInValidation from '../../hooks/useSignInValidation';

import InputField from '../UI/InputField';
import SignTitle from '../UI/SignTitle';
import SignButton from '../UI/SignButton';
import TopButton from '../UI/TopButton';

const SignIn = ({ nickname, onClickLogout, onClickSignIn }) => {
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

  const onSubmitButton = async (e) => {
    e.preventDefault();
    onClickSignIn(inputData);
  };

  return (
    <Wrap>
      {!nickname && (
        <form>
          <ItemWrap>
            <SignTitle size="small" title="아이디" />
            <InputField type="id" onChange={onChangeId} />
          </ItemWrap>
          <ItemWrap>
            <SignTitle size="small" title="비밀번호" />
            <InputField type="password" onChange={onChangePw} />
          </ItemWrap>
          <ItemWrap center={true}>
            <SignButton
              name="로그인"
              data={inputData}
              idStatus={idStatus}
              pwStatus={pwStatus}
              onClick={onSubmitButton}
            />
          </ItemWrap>
          <ItemWrap center={true}>
            <div className="info">아이디가 없으신가요?</div>
            <div className="signup" onClick={() => navigate('/signup')}>
              회원가입
            </div>
          </ItemWrap>
        </form>
      )}
      {nickname && (
        <>
          <ItemWrap>{nickname}님, 어서오세요!</ItemWrap>
          <LogOutBtn onClick={onClickLogout}>로그아웃</LogOutBtn>
        </>
      )}
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
  justify-content: ${(props) => (props.center === true ? 'center' : '')};

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

const LogOutBtn = styled.button`
  width: 85%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  margin: 5px 0;
  cursor: pointer;
  font-family: 'Nanum Gothic';

  &:enabled {
    background: skyblue;
    &:hover {
      background: #358ed0;
    }
  }
`;
