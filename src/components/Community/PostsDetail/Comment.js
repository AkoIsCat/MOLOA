import styled from 'styled-components';

import Loading from '../../UI/Loading';

const Comment = ({
  postIsLoading,
  commentIsLoading,
  postDetail,
  commentList,
  onClickCommentRemove,
}) => {
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
            <CommentDiv
              writer={
                !postIsLoading &&
                postDetail.post.writer_id === item.user_id &&
                true
              }
            >
              <div className="comment_wrap">
                <div className="user_block">
                  <span className="user_nk">{item.user_nk}</span>
                  {item.user_id === postDetail.post.writer_id && (
                    <div className="writer">작성자</div>
                  )}
                  <span className="date">({item.created_at})</span>
                </div>
                {localStorage.getItem('userId') === item.user_id &&
                  item.is_deleted === 0 && (
                    <div className="writer_btn">
                      <span className="btn">수정</span>
                      <span>|</span>
                      <span
                        className="btn"
                        onClick={() => onClickCommentRemove(item.comment_id)}
                      >
                        삭제
                      </span>
                    </div>
                  )}
              </div>
              <div className="contents">
                {item.content.split('\n').map((line, index) => (
                  <p key={`${line} ${index}`}>{line}</p>
                ))}
              </div>
            </CommentDiv>
            {item.replies.map((childItem) => (
              <Reply
                key={childItem.comment_id}
                writer={postDetail.post.writer_id === childItem.user_id && true}
              >
                <div className="reply">↳</div>
                <div className="contents_wrap">
                  <div className="comment_wrap">
                    <div className="user_info">
                      <span className="user_nk">{childItem.user_nk}</span>
                      {childItem.user_id === postDetail.post.writer_id && (
                        <div className="writer">작성자</div>
                      )}
                      <span className="date">({childItem.created_at})</span>
                    </div>
                    {localStorage.getItem('userId') === childItem.user_id && (
                      <div className="writer_btn">
                        <span className="btn">수정</span>
                        <span>|</span>
                        <span className="btn">삭제</span>
                      </div>
                    )}
                  </div>
                  <p className="contents">{childItem.content}</p>
                </div>
              </Reply>
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

const CommentDiv = styled.div`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid #c1c1c1;
  margin: 10px 0;

  .user_block,
  .comment_wrap {
    display: flex;
  }

  .comment_wrap {
    justify-content: space-between;
  }

  .user_nk {
    font-weight: bold;
    color: #fff;
    margin: 0 5px;
    padding: 0 2px;
  }

  .writer {
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    padding: 2px 6px;
    font-size: 12px;
    color: #87ceeb;
  }

  .writer_btn {
    color: #c1c1c1;
    font-size: 13px;
    margin: 0 10px;

    .btn {
      margin: 0 3px;
      cursor: pointer;
    }
  }

  .date {
    color: #c1c1c1;
    margin: 0 5px;
  }

  .contents {
    color: #c1c1c1;
    padding: 0 10px;
  }
`;

const Reply = styled.div`
  width: 100%;
  padding: 10px 0 10px 0;
  display: flex;
  border-bottom: 1px solid #c1c1c1;

  .reply {
    margin: 0 10px 0 5px;
    padding: 0 0px 0 10px;
    color: #c1c1c1;
  }

  .user_info,
  .comment_wrap {
    display: flex;
  }

  .comment_wrap {
    justify-content: space-between;
  }

  .user_nk {
    font-weight: bold;
    color: #fff;
    margin: 0 5px;
  }

  .writer {
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    padding: 2px 6px;
    font-size: 12px;
    color: #87ceeb;
  }

  .writer_btn {
    color: #c1c1c1;
    font-size: 13px;
    margin: 0 10px;

    .btn {
      margin: 0 3px;
      cursor: pointer;
    }
  }

  .date {
    color: #c1c1c1;
    margin: 0 5px;
  }

  .contents {
    color: #c1c1c1;
    padding: 0 5px;
  }

  .contents_wrap {
    width: 100%;
  }
`;
