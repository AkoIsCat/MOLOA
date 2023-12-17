import styled from 'styled-components';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { writingComment } from '../../api/Comments/CommentsAxios';

const CommentForm = ({ postRefetch, commentRefetch, commentReply }) => {
  const commentRef = useRef();

  const { id } = useParams();

  const checkLogin = () => {
    const blockUserId = localStorage.getItem('userId');
    if (!blockUserId) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    return blockUserId;
  };

  const onSubmitComment = async (e) => {
    e.preventDefault();
    const loginIsValid = checkLogin();
    if (loginIsValid) {
      if (commentRef.current.value.length === 0) {
        alert('내용을 입력해 주세요.');
        return;
      }
      const response = await writingComment({
        post_id: id,
        user_id: loginIsValid,
        parent_comment_id: null,
        content: commentRef.current.value,
      });
      alert(response.message);
      postRefetch();
      commentRefetch();
      commentRef.current.value = '';
    }
  };
  return (
    <CommentFormBox onSubmit={onSubmitComment}>
      <Textarea
        ref={commentRef}
        commentReply={commentReply}
        placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 법적으로 문제가 될 수 있습니다.&#10;Shift+Enter 키를 동시에 누르면 줄바꿈이 됩니다."
      ></Textarea>
      <CommentButton type="submit">등록</CommentButton>
    </CommentFormBox>
  );
};

export default CommentForm;

const CommentFormBox = styled.form`
  display: flex;
  align-items: center;
`;

const Textarea = styled.textarea`
  width: ${(props) => (props.commentReply ? '84%' : '80%')};
  min-height: 80px;
  margin: 30px 0px;
  padding: 10px;
  font-size: 14px;
  outline: none;
  background: #1e2225;
  color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  resize: vertical;
`;

const CommentButton = styled.button`
  width: 11%;
  height: 100px;
  border: 0;
  border-radius: 10px;
  margin: 0 15px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: #c1c1c1;
  }
`;
