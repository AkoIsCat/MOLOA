import styled from 'styled-components';

const ReplyDetail = ({ childItem, postDetail }) => {
  return (
    <Reply
      key={`reply ${childItem.comment_id}`}
      writer={localStorage.getItem('userId') === childItem.user_id && true}
    >
      <div className="info_wrap">
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
                <span className="btn">삭제</span>
              </div>
            )}
          </div>
          <div className="contents">
            <div>
              {childItem.content.split('\n').map((line, index) => (
                <p key={`reply ${line} ${index}`}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reply>
  );
};

export default ReplyDetail;

const Reply = styled.div`
  width: 100%;
  padding: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #c1c1c1;
  background: ${(props) => props.writer && 'rgba(109, 114, 118, 0.3)'};

  .info_wrap {
    display: flex;
  }

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
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .add_comment {
    font-size: 13px;
    margin: 0 3px;
    padding: 0 0 5px 0;
    cursor: pointer;
  }

  .contents_wrap {
    width: 100%;
  }
`;
