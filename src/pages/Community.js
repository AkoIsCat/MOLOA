import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/Posts/PostAxios';
import { useQuery } from 'react-query';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import { Message } from './Character';
import Side from '../components/Community/Side';
import PostsButton from '../components/UI/PostsButton';
import ListTable from '../components/Community/ListTable';

const Coummunity = () => {
  const toggle = false;

  const navigate = useNavigate();

  const onClickWrite = () => {
    const id = localStorage.getItem('userId');
    if (id) {
      navigate('/board-posts');
    } else {
      alert('로그인 후 작성 가능합니다.');
    }
  };

  const { data: postsList, isLoading: postsListisLoading } = useQuery(
    'postsList',
    () => getPosts(),
    {
      enabled: toggle,
      staleTime: 0,
      refetchOnWindowFocus: false,
      select: (data) => data.sort((a, b) => b.post_id - a.post_id),
    }
  );

  return (
    <Background>
      <Header />
      <ContainerBox>
        {!toggle && <Message>페이지 준비 중 입니다.</Message>}
        {toggle && (
          <>
            <Side toggle={toggle} />
            <Section>
              <h1>커뮤니티</h1>
              <ListTable
                postsList={postsList}
                postsListisLoading={postsListisLoading}
              />
              <ButtonWrap>
                <PostsButton
                  onClick={() => navigate('/community')}
                  name="목록"
                />
                <PostsButton name="글쓰기" onClick={onClickWrite} />
              </ButtonWrap>
            </Section>
          </>
        )}
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Coummunity;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
`;

const Section = styled.section`
  width: 95%;

  h1 {
    color: #c1c1c1;
    margin-right: 20px;
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;
