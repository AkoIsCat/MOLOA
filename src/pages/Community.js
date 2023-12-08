import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/Posts/PostAxios';
import { useQuery } from 'react-query';
import { dateTransformation } from '../utils/dateTransformation';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import { Message } from './Character';
import Side from '../components/Community/Side';
import Loading from '../components/UI/Loading';
import PostsButton from '../components/UI/PostsButton';

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
              <Table border="1">
                <thead>
                  <tr>
                    <th className="number">번호</th>
                    <th className="title">제목</th>
                    <th className="writer">작성자</th>
                    <th className="date">등록일</th>
                    <th className="views">조회수</th>
                    <th className="like">좋아요</th>
                  </tr>
                </thead>
                <tbody>
                  {postsListisLoading && (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  )}
                  {!postsListisLoading &&
                    postsList.map((item) => (
                      <tr key={item.post_id}>
                        <td className="number">{item.post_id}</td>
                        <td
                          className="title"
                          onClick={() =>
                            navigate(`/posts-detail/${item.post_id}`)
                          }
                        >
                          {item.post_title}
                        </td>
                        <td className="writer">{item.writer}</td>
                        <td className="date">
                          {dateTransformation(item.post_date)}
                        </td>
                        <td className="views">{item.view_count}</td>
                        <td className="like">{item.like_count}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
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

const Table = styled.table`
  margin-right: 20px;
  border: none;
  border-top: 1px solid lightgray;
  color: #c1c1c1;
  border-collapse: collapse;

  td {
    border-bottom: 1px solid lightgray;
  }

  thead {
    height: 30px;
    border-bottom: 1px solid lightgray;
    background: ;
  }

  tbody {
    height: 30px;
  }

  .number,
  .writer,
  .date,
  .views,
  .like {
    width: 5vw;
    text-align: center;
    height: 40px;
  }

  .title {
    width: 35vw;
    cursor: pointer;
  }
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;
