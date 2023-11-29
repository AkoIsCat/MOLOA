import styled from 'styled-components';

const SignButton = (props) => {
  return (
    <SignInBtn
      disabled={
        props.name === '글쓰기' || props.name === '목록'
          ? false
          : !(props.idStatus.status && props.pwStatus.status)
      }
      name={props.name}
      onClick={props.onClick}
    >
      {props.name}
    </SignInBtn>
  );
};

export default SignButton;

const SignInBtn = styled.button`
  width: ${(props) =>
    props.name === '글쓰기' || props.name === '목록' ? '8%' : '85%'};
  height: ${(props) =>
    props.name === '로그인' ? '30px' : props === '회원가입' ? '50px' : '40px'};
  border-radius: 10px;
  border: 0;
  margin: 5px;
  cursor: pointer;
  font-family: 'Nanum Gothic';

  &:enabled {
    background: ${(props) => (props.name === '목록' ? '#6D7276' : 'skyblue')};
    &:hover {
      background: ${(props) => (props.name === '목록' ? '#4B535A' : '#358ed0')};
    }
  }
`;
