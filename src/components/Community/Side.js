import styled from 'styled-components';

import SignIn from './SignIn';

const Side = () => {
  return (
    <SideWrap>
      <SignIn />
    </SideWrap>
  );
};

export default Side;

const SideWrap = styled.aside`
  width: 20vw;
  height: auto;
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
