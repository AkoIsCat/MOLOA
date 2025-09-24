import styled from 'styled-components';

const CommentDetail = ({
  item,
  postDetail,
  onClickCommentRemove,
  onClickReply,
}) => {
  return (
    <CommentDiv
      writer={localStorage.getItem('userId') === item.user_id && true}
      key={`comment ${item.comment_id}`}
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
        <div>
          {item.content.split('\n').map((line, index) => (
            <p key={`comment ${line} ${index}`}>{line}</p>
          ))}
        </div>
        <p
          className="add_comment"
          onClick={() => onClickReply(item.comment_id)}
        >
          답글
        </p>
      </div>
    </CommentDiv>
  );
};

export default CommentDetail;

const CommentDiv = styled.div`
  width: 100%;
  padding: 20px 0px;
  border-bottom: 1px solid #c1c1c1;
  // margin: 10px 0;
  background: ${(props) => props.writer && 'rgba(109, 114, 118, 0.3)'};

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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .add_comment {
    font-size: 13px;
    cursor: pointer;
    margin: 0 2px 6px 0px;
  }
`;
