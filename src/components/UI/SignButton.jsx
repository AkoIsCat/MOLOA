import styled from 'styled-components';

const SignButton = (props) => {
  return (
    <SignInBtn
      disabled={!(props.idStatus.status && props.pwStatus.status)}
      name={props.name}
      onClick={props.onClick}
      type="submit"
    >
      {props.name}
    </SignInBtn>
  );
};

export default SignButton;

const SignInBtn = styled.button`
  width: 85%;
  height: ${(props) => (props.name === '로그인' ? '30px' : '50px')};
  border-radius: 10px;
  border: 0;
  margin: 5px;
  cursor: pointer;
  font-family: 'Nanum Gothic';

  &:enabled {
    background: skyblue;
    &:hover {
      background: #358ed0;
    }
  }
`;
