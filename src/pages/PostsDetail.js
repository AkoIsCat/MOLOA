import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDetailPosts } from '../api/Posts/PostAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import SignButton from '../components/UI/SignButton';
import Side from '../components/Community/Side';
import { AiFillLike } from 'react-icons/ai';
import Loading from '../components/UI/Loading';

const PostsDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery('posts-detail', () =>
    getDetailPosts({ postId: id })
  );

  const navigate = useNavigate();

  const onClickWrite = () => {
    const id = localStorage.getItem('userId');
    if (id) {
      navigate('/board-posts');
    } else {
      alert('로그인 후 작성 가능합니다.');
    }
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        <Side />
        <ContentsWrap>
          <Table>
            <tbody>
              {isLoading && (
                <tr>
                  <td>
                    <Loading />
                  </td>
                </tr>
              )}
              {!isLoading && (
                <>
                  <tr className="title">
                    <td colSpan="2" className="title_contents">
                      {data.post_title}
                    </td>
                    <td colSpan="2" className="date">
                      {data.post_date}
                    </td>
                  </tr>
                  <tr className="head">
                    <td className="writer">{data.writer}</td>
                    <td className="view">조회: {data.view_count}</td>
                    <td className="likes">좋아요: {data.like_count}</td>
                    <td className="commentCount">댓글: {data.comment_count}</td>
                  </tr>
                  <tr className="contents">
                    <td colSpan="4">
                      <p> </p>
                      {data.post_contents.split('\n').map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </td>
                  </tr>
                  <tr className="likeBtn">
                    <td colSpan="4">
                      <LikeButton>
                        <AiFillLike size="25" color="#fff" />
                      </LikeButton>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
          <ButtonWrap>
            <SignButton onClick={() => navigate('/community')} name="목록" />
            <SignButton name="글쓰기" onClick={onClickWrite} />
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

const Table = styled.table`
  width: 95%;
  border: none;
  border-top: 1px solid #eeeeee;
  color: #c1c1c1;
  border-collapse: collapse;

  .title {
    line-height: 3rem;
    border-bottom: 1px solid #eeeeee;
    background-color: rgba(109, 114, 118, 0.3);
  }

  .title .title_contents {
    font-weight: bold;
    font-size: 25px;
    padding: 0 15px;
  }

  .head {
    height: 35px;
    font-size: 15px;
    border-bottom: 1px solid #cccccc;
  }

  .writer {
    width: 30vw;
    padding: 0 10px;
  }

  .view,
  .likes {
    width: 5vw;
  }

  p {
    height: 20px;
  }

  .title,
  .contents,
  .likeBtn {
    width: 100%;
  }

  .contents td {
    padding: 0 10px;
  }

  .likeBtn {
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;

const LikeButton = styled.button`
  width: 50px;
  height: 50px;
  background: #6d7276;
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #4b535a;
  }
`;