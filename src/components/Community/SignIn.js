import styled from 'styled-components';
import InputField from '../UI/InputField';
import SignTitle from '../UI/SignTitle';

const SignIn = () => {
  return (
    <Wrap>
      <ItemWrap>
        <SignTitle size="small" title="아이디" />
        <InputField type="id" />
      </ItemWrap>
      <ItemWrap>
        <SignTitle size="small" title="비밀번호" />
        <InputField type="password" />
      </ItemWrap>
      <SignInBtn>로그인</SignInBtn>
      <ItemWrap>
        <div className="info">아이디가 없으신가요?</div>
        <div className="signup">회원가입</div>
      </ItemWrap>
    </Wrap>
  );
};

export default SignIn;

const Wrap = styled.div`
  width: 95%;
  height: 200px;
  background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  border-radius: 10px;
`;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;

  .info {
    font-size: 14px;
  }

  .signup {
    margin-left: 10px;
    font-size: 14px;
    color: blue;
    cursor: pointer;
  }
`;

const SignInBtn = styled.button`
  width: 85%;
  height: 30px;
  background: white;
  border-radius: 10px;
  border: 1px solid #d4d4d8;
  margin: 5px 0;
`;
