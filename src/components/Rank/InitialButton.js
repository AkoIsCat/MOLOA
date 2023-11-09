import styled from 'styled-components';

const InitialButton = () => {
  return <Btn>선택 초기화</Btn>;
};

export default InitialButton;

const Btn = styled.button`
  width: 100px;
  height: 40px;
  background: #292e33;
  border-radius: 10px;
  color: #bcbabd;
  border: 0;
  cursor: pointer;
  font-family: 'Nanum Gothic';

  &:hover {
    color: #fff;
    background: #353c42;
  }
`;
