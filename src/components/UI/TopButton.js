import styled from 'styled-components';

import { FaArrowUp } from 'react-icons/fa';

const TopButton = () => {
  return (
    <Btn>
      <FaArrowUp size="20" color="#fff" />
    </Btn>
  );
};

export default TopButton;

const Btn = styled.button`
  width: 40px;
  height: 40px;
  background: #353c42;
  border-radius: 10px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
  right: 12%;
  bottom: 2.3%;

  @media ${(props) => props.theme.tablet} {
    right: 4%;
  }
`;
