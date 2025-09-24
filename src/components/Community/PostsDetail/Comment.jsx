import styled from 'styled-components';
import { useState } from 'react';

import Loading from '../../UI/Loading';
import CommentForm from '../../UI/CommentForm';
import CommentDetail from './CommentDetail';
import ReplyDetail from './ReplyDetail';

const Comment = ({
  postIsLoading,
  commentIsLoading,
  postDetail,
  commentList,
  onClickCommentRemove,
  postRefetch,
  commentRefetch,
}) => {
  const [replyToggle, setReplyToggle] = useState({
    toggle: false,
    id: undefined,
  });

  const onClickReply = (id) => {
    setReplyToggle((prev) => {
      if (prev.toggle === false) {
        return {
          toggle: true,
          id,
        };
      }
      return {
        toggle: prev.id === id ? !prev.toggle : prev.toggle,
        id,
      };
    });
  };

  if (postIsLoading || commentIsLoading) {
    return <Loading />;
  }
  return (
    <>
      <CommentCount count={!postIsLoading && postDetail.post.comment_count}>
        <p>댓글 {!postIsLoading && postDetail.post.comment_count}개</p>
      </CommentCount>
      {!commentIsLoading &&
        commentList.map((item) => (
          <CommentWrap key={item.comment_id}>
            <CommentDetail
              item={item}
              postDetail={postDetail}
              onClickCommentRemove={onClickCommentRemove}
              onClickReply={onClickReply}
            />
            {replyToggle.toggle && replyToggle.id === item.comment_id && (
              <div>
                <CommentForm
                  commentReply="true"
                  commentId={item.comment_id}
                  postRefetch={postRefetch}
                  commentRefetch={commentRefetch}
                  setReplyToggle={setReplyToggle}
                />
              </div>
            )}
            {item.replies.map((childItem) => (
              <ReplyDetail childItem={childItem} postDetail={postDetail} />
            ))}
          </CommentWrap>
        ))}
    </>
  );
};

export default Comment;

const CommentCount = styled.div`
  width: 95%;
  color: #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
`;

const CommentWrap = styled.div`
  width: 95%;
  // border-bottom: 1px solid #c1c1c1;
  padding: 0px 0;
`;
