import styled from 'styled-components';

const InputField = (props) => {
  return <Input type={props.type} onChange={props.onChange} />;
};

export default InputField;

const Input = styled.input`
  height: 30px;
  padding: 0 4px;
  border-radius: 10px;
  width: 150px;
  border: 1px solid #d4d4d8;
`;
