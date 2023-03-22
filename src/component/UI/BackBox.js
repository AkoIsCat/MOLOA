import styled from 'styled-components';

const BackBox = styled.div`
  background: #1e2225;
  border-left: 1px solid #373e44;
  border-right: 1px solid #373e44;
  width: 1302px;
  height: auto;
  margin: 0 auto;
`;

const Background = (props) => {
  return <BackBox>{props.children}</BackBox>;
};

export default Background;
