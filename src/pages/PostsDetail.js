import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import SignButton from '../components/UI/SignButton';
import Side from '../components/Community/Side';

const PostsDetail = () => {
  const navigate = useNavigate();

  const onClickWrite = () => {
    const id = localStorage.getItem('userId');
    if (id) {
      // navigate('/board-posts');
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
              <tr className="head">
                <td className="writer">작성자</td>
                <td className="date">시간</td>
                <td className="view">조회</td>
                <td className="likes">좋아요</td>
              </tr>
              <tr className="title">
                <td>제목</td>
              </tr>
              <tr className="contents">
                <td>내용</td>
              </tr>
              <tr className="likeBtn">
                <td>좋아요 버튼</td>
              </tr>
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
  border-top: 1px solid lightgray;
  color: #c1c1c1;
  border-collapse: collapse;

  .head {
    height: 50px;
    border-bottom: 1px solid lightgray;
  }

  .writer {
    width: 30vw;
  }

  .view,
  .likes {
    width: 5vw;
  }

  .title,
  .contents,
  .likeBtn {
    line-height: 3rem;
  }
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;
