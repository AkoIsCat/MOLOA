import styled from 'styled-components';

const InputField = (props) => {
  return (
    <Input
      type={props.type}
      id={props.type}
      onChange={props.onChange}
      autoComplete="off"
    />
  );
};

export default InputField;

const Input = styled.input`
  height: 30px;
  padding: 0 4px;
  width: 55%;
  border: 0;
  border-bottom: 1px solid #d4d4d8;
  background: none;
  outline: none;
  font-size: 16px;
  color: #fff;

  &:focus {
    border-bottom: 1px solid #a75f6e;
  }
`;
