import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getDetailPosts,
  removePosts,
  increaseLike,
} from '../api/Posts/PostAxios';
import { getComments } from '../api/Comments/CommentsAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import Side from '../components/Community/Side';
import PostsButton from '../components/UI/PostsButton';
import DetailTable from '../components/Community/PostsDetail/DetailTable';

const PostsDetail = () => {
  const { id } = useParams();

  const { data: postDetail, isLoading: postDetailIsLoading } = useQuery(
    ['posts-detail', id],
    () => getDetailPosts({ postId: id }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: commentList, isLoading: commentListIsLoading } = useQuery(
    ['comment', id],
    () => getComments(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const isItSameId =
    !postDetailIsLoading &&
    localStorage.getItem('userId') === postDetail.post.writer_id;

  const navigate = useNavigate();

  const onClickWrite = () => {
    const blockUserId = localStorage.getItem('userId');
    if (blockUserId) {
      navigate('/board-posts');
    } else {
      alert('로그인 후 작성 가능합니다.');
    }
  };

  const onClickLike = async () => {
    const blockUserId = localStorage.getItem('userId');
    if (!blockUserId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    const response = await increaseLike({ userId: blockUserId, postId: id });
    alert(response.message);
  };

  const onClickModify = () => {
    const blockUserId = localStorage.getItem('userId');
    if (!blockUserId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    navigate(`/${id}/modify`, {
      state: postDetail.post,
    });
  };

  const onClickRemove = async () => {
    const blockUserId = localStorage.getItem('userId');
    if (!blockUserId) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    if (window.confirm('게시글이 삭제됩니다. 정말 삭제 하시겠습니까?')) {
      const response = await removePosts({ postId: id });
      alert(response.message);
      navigate('/community');
    }
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        <Side />
        <ContentsWrap>
          <section>
            <DetailTable
              data={postDetail}
              isLoading={postDetailIsLoading}
              onClickLike={onClickLike}
            />
            <ButtonWrap>
              <PostsButton onClick={() => navigate('/community')} name="목록" />
              {isItSameId && (
                <PostsButton name="수정" onClick={onClickModify} />
              )}
              {isItSameId && (
                <PostsButton name="삭제" onClick={onClickRemove} />
              )}
              <PostsButton name="글쓰기" onClick={onClickWrite} />
            </ButtonWrap>
          </section>
          <section>
            <CommentCount
              count={!postDetailIsLoading && postDetail.post.comment_count}
            >
              <p>
                댓글 {!postDetailIsLoading && postDetail.post.comment_count}개
              </p>
            </CommentCount>
            {!commentListIsLoading &&
              commentList.map((item) => (
                <CommentWrap key={item.comment_id}>
                  <Comment
                    writer={postDetail.post.writer_id === item.user_id && true}
                  >
                    <div>
                      <span className="user_nk">{item.user_nk}</span>
                      <span className="date">({item.created_at})</span>
                    </div>
                    <p className="contents">{item.content}</p>
                  </Comment>
                  {item.replies.map((childItem) => (
                    <Reply
                      key={childItem.comment_id}
                      writer={
                        postDetail.post.writer_id === childItem.user_id && true
                      }
                    >
                      <div className="reply">↳</div>
                      <div className="contents_wrap">
                        <div className="user_info">
                          <span className="user_nk">{childItem.user_nk}</span>
                          <span className="date">({childItem.created_at})</span>
                        </div>
                        <p className="contents">{childItem.content}</p>
                      </div>
                    </Reply>
                  ))}
                </CommentWrap>
              ))}
            <form>
              <Textarea
                placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 법적으로 문제가 될 수 있습니다.&#10;Shift+Enter 키를 동시에 누르면 줄바꿈이 됩니다."
              ></Textarea>
              <button>등록</button>
            </form>
          </section>
        </ContentsWrap>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default PostsDetail;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
  font-familiy: 'Nanum Gothic';
`;

const ContentsWrap = styled.div`
  width: 95%;
  margin: 40px 0;
`;

const CommentCount = styled.div`
  width: 95%;
  color: #c1c1c1;
  border-bottom: ${(props) => (props.count === 0 ? '1px solid #c1c1c1' : '')};
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;

const Textarea = styled.textarea`
  width: 85%;
  min-height: 80px;
  margin: 20px 0px;
  padding: 10px;
  font-size: 14px;
  outline: none;
  background: #1e2225;
  color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  resize: vertical;
`;

const CommentWrap = styled.div`
  width: 95%;
  border-bottom: 1px solid #c1c1c1;
  padding: 0px 0;
`;

const Comment = styled.div`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid #c1c1c1;
  background: ${(props) => (props.writer ? 'rgba(109, 114, 118, 0.3)' : '')};

  .user_nk {
    font-weight: bold;
    color: #fff;
    margin: 0 5px;
    padding: 0 5px;
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
  padding: 20px 0 0px 0;
  display: flex;
  background: ${(props) => (props.writer ? 'rgba(109, 114, 118, 0.3)' : '')};

  .reply {
    margin: 0 10px 0 5px;
    padding: 0 0px 0 10px;
    color: #c1c1c1;
  }

  .user_nk {
    font-weight: bold;
    color: #fff;
    margin: 0 5px;
  }

  .date {
    color: #c1c1c1;
    margin: 0 5px;
  }

  .contents {
    color: #c1c1c1;
    padding: 0 5px;
  }
`;
