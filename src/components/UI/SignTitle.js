import styled from 'styled-components';

const SignTitle = (props) => {
  return <Title size={props.size}>{props.title}</Title>;
};

export default SignTitle;

const Title = styled.p`
  width: ${(props) => (props.size === 'small' ? '70px' : '140px')};
  margin-right: 0px;
  font-size: 16px;
`;
