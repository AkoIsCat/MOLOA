import styled from 'styled-components';

const SignTitle = (props) => {
  return <Title size={props.size}>{props.title}</Title>;
};

export default SignTitle;

const Title = styled.p`
  width: ${(props) => (props.size === 'small' ? '70px' : '140px')};
  margin: 0;
  margin-right: 10px;
  font-size: 16px;
  color: #c1c1c1;
  display: flex;
  justify-content: flex-end;
`;
