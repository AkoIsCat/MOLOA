import styled from 'styled-components';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getDetailPosts,
  removePosts,
  increaseLike,
} from '../api/Posts/PostAxios';
import {
  getComments,
  writingComment,
  deleteComment,
} from '../api/Comments/CommentsAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import Side from '../components/Community/Side';
import PostsButton from '../components/UI/PostsButton';
import DetailTable from '../components/Community/PostsDetail/DetailTable';
import Comment from '../components/Community/PostsDetail/Comment';

const PostsDetail = () => {
  const { id } = useParams();
  const commentRef = useRef();

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
            />
            <CommentForm onSubmit={onSubmitComment}>
              <Textarea
                ref={commentRef}
                placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 법적으로 문제가 될 수 있습니다.&#10;Shift+Enter 키를 동시에 누르면 줄바꿈이 됩니다."
              ></Textarea>
              <CommentButton type="submit">등록</CommentButton>
            </CommentForm>
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

const CommentForm = styled.form`
  display: flex;
  align-items: center;
`;

const Textarea = styled.textarea`
  width: 80%;
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
