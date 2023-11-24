import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignButton = ({ name, idStatus, pwStatus }) => {
  const navigate = useNavigate();

  return (
    <SignInBtn
      disabled={!(idStatus.status && pwStatus.status)}
      onClick={() => navigate('/community')}
    >
      {name}
    </SignInBtn>
  );
};

export default SignButton;

const SignInBtn = styled.button`
  width: 85%;
  height: ${(props) => (props.name === '로그인' ? '30px' : '50px')};
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
