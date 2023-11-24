import styled from 'styled-components';

const SignTitle = (props) => {
  return <Title size={props.size}>{props.title}</Title>;
};

export default SignTitle;

const Title = styled.p`
  width: ${(props) => (props.size === 'small' ? '70px' : '120px')};
  margin: 0;
  margin-right: 10px;
  font-size: ${(props) => (props.size === 'small' ? '16px' : '30px')};
  color: #c1c1c1;
  display: flex;
  justify-content: flex-end;
`;
