import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getDetailPosts,
  removePosts,
  increaseLike,
} from '../api/Posts/PostAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import Side from '../components/Community/Side';
import PostsButton from '../components/UI/PostsButton';
import DetailTable from '../components/Community/PostsDetail/DetailTable';

const PostsDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ['posts-detail', id],
    () => getDetailPosts({ postId: id }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const isItSameId =
    !isLoading && localStorage.getItem('userId') === data.post.writer_id;

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
      state: data.post,
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
          <DetailTable
            data={data}
            isLoading={isLoading}
            onClickLike={onClickLike}
          />
          <ButtonWrap>
            <PostsButton onClick={() => navigate('/community')} name="목록" />
            {isItSameId && <PostsButton name="수정" onClick={onClickModify} />}
            {isItSameId && <PostsButton name="삭제" onClick={onClickRemove} />}
            <PostsButton name="글쓰기" onClick={onClickWrite} />
          </ButtonWrap>
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
