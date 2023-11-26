import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignUpValidation from '../../hooks/useSignUpValidation';

import SignTitle from '../UI/SignTitle';
import InputField from '../UI/InputField';
import SignButton from '../UI/SignButton';
import { postSignUpData } from '../../api/Sign/SignAxios';

const SignUp = () => {
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const navigate = useNavigate();

  const [idStatus, pwStatus, nkStatus] = useSignUpValidation(inputData);

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

  const onChangeNk = (e) => {
    setInputData({
      ...inputData,
      nickname: e.target.value,
    });
  };

  const onSubmitButton = async () => {
    const response = await postSignUpData(inputData);
    if (response.success) {
      alert('회원가입이 완료되었습니다.');
      navigate('/community');
    } else if (response.error) {
      alert('이미 존재하는 아이디입니다.');
    }
  };

  return (
    <Wrap>
      <FormWrap>
        <SignTitle title="회원가입" />
        <ItemWrap>
          <SignTitle size="small" title="아이디" />
          <InputField type="id" onChange={onChangeId} />
        </ItemWrap>
        <ItemWrap>
          <div className="message">{idStatus.message}</div>
        </ItemWrap>
        <ItemWrap>
          <SignTitle size="small" title="비밀번호" />
          <InputField type="password" onChange={onChangePw} />
        </ItemWrap>
        <ItemWrap>
          <div className="message">{pwStatus.message}</div>
        </ItemWrap>
        <ItemWrap>
          <SignTitle size="small" title="닉네임" />
          <InputField type="nickname" onChange={onChangeNk} />
        </ItemWrap>
        <ItemWrap>
          <div className="message">{nkStatus.message}</div>
        </ItemWrap>
        <SignButton
          name="회원가입"
          idStatus={idStatus}
          pwStatus={pwStatus}
          onClick={onSubmitButton}
        />
      </FormWrap>
    </Wrap>
  );
};

export default SignUp;

const Wrap = styled.div`
  width: 35%;
  height: 500px;
  background: #353c42;
  margin: 55px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-family: 'Nanum Gothic';
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: #c1c1c1;
  align-items: center;
`;

const ItemWrap = styled.div`
  display: flex;
  color: #c1c1c1;
  align-items: flex-end;
  margin: 10px 0;

  .message {
    height: auto;
    margin: 10px 0;
    font-size: 12px;
    height: 5px;
    color: #ed895d;
  }
`;
