import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getDetailPosts,
  removePosts,
  increaseLike,
} from '../api/Posts/PostAxios';
import { getComments, deleteComment } from '../api/Comments/CommentsAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import Side from '../components/Community/Side';
import PostsButton from '../components/UI/PostsButton';
import DetailTable from '../components/Community/PostsDetail/DetailTable';
import Comment from '../components/Community/PostsDetail/Comment';
import CommentForm from '../components/UI/CommentForm';

const PostsDetail = () => {
  const { id } = useParams();

  const {
    data: postDetail,
    isLoading: postDetailIsLoading,
    refetch: postRefetch,
  } = useQuery(['posts-detail', id], () => getDetailPosts({ postId: id }), {
    refetchOnWindowFocus: false,
  });

  const {
    data: commentList,
    isLoading: commentListIsLoading,
    refetch: commentRefetch,
  } = useQuery(['comment', id], () => getComments(id), {
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => a.comment_id - b.comment_id),
  });

  const isItPostSameId =
    !postDetailIsLoading &&
    localStorage.getItem('userId') === postDetail.post.writer_id;

  const navigate = useNavigate();

  const checkLogin = () => {
    const blockUserId = localStorage.getItem('userId');
    if (!blockUserId) {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    return blockUserId;
  };

  const onClickWrite = () => {
    const loginIsValid = checkLogin();
    if (loginIsValid) {
      navigate('/board-posts');
    }
  };

  const onClickLike = async () => {
    const loginIsValid = checkLogin();
    if (loginIsValid) {
      const response = await increaseLike({ userId: loginIsValid, postId: id });
      alert(response.message);
    }
  };

  const onClickModify = () => {
    const loginIsValid = checkLogin();
    if (loginIsValid) {
      navigate(`/${id}/modify`, {
        state: postDetail.post,
      });
    }
  };

  const onClickRemove = async () => {
    const loginIsValid = checkLogin();
    if (loginIsValid) {
      if (window.confirm('게시글이 삭제됩니다. 정말 삭제 하시겠습니까?')) {
        const response = await removePosts({ postId: id });
        alert(response.message);
        navigate('/community');
      }
    }
  };

  const onClickCommentRemove = async (commentId) => {
    const loginIsValid = checkLogin();
    if (loginIsValid) {
      if (window.confirm('댓글을 삭제 하시겠습니까?')) {
        const response = await deleteComment(commentId);
        alert(response.message);
        commentRefetch();
        postRefetch();
      }
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
              {isItPostSameId && (
                <PostsButton name="수정" onClick={onClickModify} />
              )}
              {isItPostSameId && (
                <PostsButton name="삭제" onClick={onClickRemove} />
              )}
              <PostsButton name="글쓰기" onClick={onClickWrite} />
            </ButtonWrap>
          </section>
          <section>
            <Comment
              postIsLoading={postDetailIsLoading}
              commentIsLoading={commentListIsLoading}
              postDetail={postDetail}
              commentList={commentList}
              onClickCommentRemove={onClickCommentRemove}
              postRefetch={postRefetch}
              commentRefetch={commentRefetch}
            />
            <CommentForm
              postRefetch={postRefetch}
              commentRefetch={commentRefetch}
            />
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

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;
