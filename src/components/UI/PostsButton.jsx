import styled from 'styled-components';

const PostsButton = (props) => {
  return (
    <Btn onClick={props.onClick} type="button" name={props.name}>
      {props.name}
    </Btn>
  );
};

export default PostsButton;

const Btn = styled.button`
  width: 8%;
  height: 40px;
  border-radius: 10px;
  border: 0;
  margin: 5px;
  cursor: pointer;
  font-family: 'Nanum Gothic';
  background: ${(props) =>
    props.name === '삭제'
      ? '#fe5555'
      : props.name === '글쓰기'
      ? 'skyblue'
      : '#6d7276'};

  &:hover {
    background: ${(props) =>
      props.name === '삭제'
        ? '#DC2F2D'
        : props.name === '글쓰기'
        ? '#358ed0'
        : '#4B535A'};
  }
`;
